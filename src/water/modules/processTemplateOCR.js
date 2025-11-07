// modules/processTemplateOCR.js
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { createWorker } from "tesseract.js";
import {
  parseJohorFields,
  parseKedahFields,
  parseNegeriSembilanFields,
  standardizeOutput,
} from "./regionParsers.js";

const debugDir = path.join(process.cwd(), "debug_text");
const cropsDir = path.join(debugDir, "crops");
if (!fs.existsSync(debugDir)) fs.mkdirSync(debugDir, { recursive: true });
if (!fs.existsSync(cropsDir)) fs.mkdirSync(cropsDir, { recursive: true });

// 📏 Reference PDF design size
const designWidth = 2481;
const designHeight = 3509;

/* --------------------------------------------------
   📚 Utility Functions
-------------------------------------------------- */
const cleanNumeric = (v) =>
  !v
    ? "0.00"
    : v
        .replace(/rm\s*/gi, "")
        .replace(/[^\d.,-]/g, "")
        .replace(",", ".")
        .trim();

const cleanAddress = (t) => {
  if (!t) return "";
  let lines = t
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);
  const stopWords = ["selangor", "kuala lumpur", "putrajaya", "labuan"];
  const idx = lines.findLastIndex((l) =>
    stopWords.some((c) => l.toLowerCase().includes(c))
  );
  if (idx !== -1) lines = lines.slice(0, idx + 1);
  return lines.join("\n");
};

const countAddressLines = (t) =>
  !t
    ? 6
    : t
        .split(/\n+/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0).length;

const normalizeDate = (d) => {
  if (!d) return null;
  const m = d.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
  if (!m) return null;
  const [, dd, mm, yy] = m;
  const yyyy = yy.length === 2 ? "20" + yy : yy;
  return `${dd.padStart(2, "0")}/${mm.padStart(2, "0")}/${yyyy}`;
};

/* --------------------------------------------------
   ✂️ processTemplateOCR()
-------------------------------------------------- */
export async function processTemplateOCR(
  imagePath,
  template,
  fileName,
  region
) {
  console.log(`🧩 OCR process start for ${region}`);
  const meta = await sharp(imagePath).metadata();
  const scaleX = meta.width / designWidth;
  const scaleY = meta.height / designHeight;
  const results = {};

  // 🧠 Create shared OCR worker
  const worker = await createWorker("eng");

  // 📬 Address first
  let addressText = "";
  if (template["Address"]) {
    const b = template["Address"];
    const cropRect = {
      left: Math.round(b.x * scaleX),
      top: Math.round(b.y * scaleY),
      width: Math.round(b.w * scaleX),
      height: Math.round(b.h * scaleY),
    };
    const addrCrop = path.join(cropsDir, "Address.png");

    // 🧠 Step 1: Preprocess + extract
    await sharp(imagePath)
      .extract(cropRect)
      .grayscale()
      .normalize()
      .linear(1.1, 0)
      .sharpen()
      .toFile(addrCrop);

    const r = await worker.recognize(addrCrop);
    let rawText = r.data.text.trim();

    // 🧠 Step 2: Retry if <6 lines (may have missed last line)
    const lineCount = countAddressLines(rawText);
    if (lineCount < 6) {
      const retryRect = {
        ...cropRect,
        height: Math.min(
          meta.height - cropRect.top,
          cropRect.height + Math.round(100 * scaleY)
        ),
      };
      const addrCropRetry = path.join(cropsDir, "Address_retry.png");
      await sharp(imagePath)
        .extract(retryRect)
        .grayscale()
        .normalize()
        .linear(1.1, 0)
        .sharpen()
        .toFile(addrCropRetry);

      const r2 = await worker.recognize(addrCropRetry);
      const retryText = r2.data.text.trim();

      // 🧩 Keep retry only if better (more lines & valid stop word)
      const cleanRaw = cleanAddress(rawText);
      const cleanRetry = cleanAddress(retryText);
      const stopRegion = /selangor|kuala lumpur|putrajaya|labuan/i;
      if (
        countAddressLines(cleanRetry) > countAddressLines(cleanRaw) &&
        stopRegion.test(cleanRetry)
      ) {
        rawText = retryText;
        console.log("🔁 Using taller retry crop for more complete address.");
      }
    }

    // 🧠 Step 3: Final clean
    addressText = cleanAddress(rawText);
    results["Address"] = addressText;
    console.log("📜 Final Address OCR lines:", addressText.split(/\n+/));
  }

  const offsetY = -(6 - countAddressLines(addressText)) * 50;

  const moveKeys = [
    "No. Meter",
    "Bilangan Hari - Start",
    "Bilangan Hari - End",
    "Baki Terdahulu",
    "Bil Semasa",
    "Jumlah Perlu Dibayar",
    "Penggunaan (m3)",
  ];

  // 🔲 Parallel OCR for all fields
  const fieldEntries = Object.entries(template).filter(
    ([k]) => k !== "Address"
  );

  await Promise.all(
    fieldEntries.map(async ([key, box]) => {
      try {
        const applyOffset = moveKeys.includes(key) ? offsetY : 0;
        const rect = {
          left: Math.round(box.x * scaleX),
          top: Math.round((box.y + applyOffset) * scaleY),
          width: Math.round(box.w * scaleX),
          height: Math.round(box.h * scaleY),
        };

        const cropPath = path.join(cropsDir, `${key.replace(/\s+/g, "_")}.png`);
        await sharp(imagePath).extract(rect).toFile(cropPath);
        const ocrRes = await worker.recognize(cropPath);
        let text = ocrRes.data.text.trim();
        if (
          [
            "Bil Semasa",
            "Jumlah Perlu Dibayar",
            "Baki Terdahulu",
            "Cagaran",
            "Penggunaan (m3)",
          ].includes(key)
        )
          text = cleanNumeric(text);
        results[key] = text;
        console.log(`📄 OCR ${key}: "${text}"`);
      } catch (err) {
        console.warn(`⚠️ OCR failed for ${key}: ${err.message}`);
        results[key] = "";
      }
    })
  );

  await worker.terminate();

  // 🧮 Compute Tempoh Bil / Bilangan Hari
  const start =
    normalizeDate(results["Bilangan Hari - Start"]) ||
    normalizeDate(results["Bilangan_Hari_-_Start"]);
  const end =
    normalizeDate(results["Bilangan Hari - End"]) ||
    normalizeDate(results["Bilangan_Hari_-_End"]);

  let bilDays = null,
    tempohBil = null;

  if (start && end) {
    const d1 = new Date(start.split("/").reverse().join("-"));
    const d2 = new Date(end.split("/").reverse().join("-"));
    bilDays = Math.abs(Math.round((d2 - d1) / 86400000)).toString();
    tempohBil = `${start} - ${end}`;
    console.log(`✅ Computed Tempoh Bil: ${tempohBil} (${bilDays} days)`);
  } else {
    console.warn("⚠️ Missing start/end date:", { start, end });
  }

  delete results["Bilangan Hari - Start"];
  delete results["Bilangan Hari - End"];

  // 🧾 Combine final output
  let final = {
    "File Name": fileName,
    Region: region,
    ...results,
    ...(tempohBil ? { "Tempoh Bil": tempohBil } : {}),
    ...(bilDays ? { "Bilangan Hari": bilDays } : {}),
  };

  // 📊 Region-specific post-processing
  const reg = region.toLowerCase();
  if (reg.includes("johor")) {
    final = parseJohorFields(results);
    final.Region = "Johor";
  } else if (reg.includes("kedah")) {
    final = parseKedahFields(results, fileName);
    if (tempohBil) final["Tempoh Bil"] = tempohBil;
    if (bilDays) final["Bilangan Hari"] = bilDays;
  } else if (reg.includes("negeri")) {
    final = {
      ...parseNegeriSembilanFields(results),
      "File Name": fileName,
      Region: "Negeri-Sembilan",
    };
  }

  if (region.toLowerCase().includes("selangor") && final["No. Akaun"]) {
    final["No. Akaun"] = final["No. Akaun"]
      .replace(/\(.*?\)/g, "")
      .replace(/\bBaharu\b/gi, "")
      .replace(/\s+/g, "")
      .trim();
  }

  if (final["No. Meter"]) {
    let meter = final["No. Meter"]
      .replace(/\s+/g, "")
      .replace(/[^A-Za-z0-9]/g, "")
      .trim();
    meter = meter
      .replace(/^AlI?s/i, "AIS")
      .replace(/^A1S/i, "AIS")
      .replace(/^AIS/i, "AIS");
    if (!meter.startsWith("AIS")) {
      meter = "AIS" + meter.replace(/^A+|^I+|^S+/i, "");
    }

    final["No. Meter"] = meter;
  }

  // 🧾 Standardize keys & fill defaults
  const standardized = standardizeOutput(final);
  return standardized;
}
