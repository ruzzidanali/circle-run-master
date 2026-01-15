import fs from "fs";
import path from "path";
import sharp from "sharp";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const outputFolder = "../uploads";
if (!fs.existsSync(outputFolder))
  fs.mkdirSync(outputFolder, { recursive: true });

const boxesPerPage = [
  [
    { xMin: 450, xMax: 600, yMin: 628, yMax: 635 }, // No. Akaun
    { xMin: 420, xMax: 580, yMin: 618, yMax: 625 }, // No. Bil
    { xMin: 470, xMax: 610, yMin: 607, yMax: 612 }, // Tarikh
    { xMin: 410, xMax: 580, yMin: 597, yMax: 603 }, // Tempoh Bil dan Bilangan Hari
    { xMin: 510, xMax: 580, yMin: 575, yMax: 580 }, // Deposit
    { xMin: 565, xMax: 585, yMin: 198, yMax: 200 }, // Total Current Charges
    { xMin: 565, xMax: 585, yMin: 217, yMax: 218 }, // Service Tax
    { xMin: 565, xMax: 585, yMin: 238, yMax: 239 }, // Discount
    { xMin: 565, xMax: 585, yMin: 335, yMax: 336 }, // Monthly Fee
    { xMin: 65, xMax: 110, yMin: 373, yMax: 375 }, // Tunggakan
  ],
];

let baselineMaxY = null;

async function getPage1TopContentY_BySharp(pdfPath) {
  try {
    const density = 200;
    const img = sharp(pdfPath, { density, page: 0 }).grayscale();

    const { data, info } = await img
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { width, height, channels } = info;

    const threshold = 245;
    let firstInkRow = null;

    for (let y = 0; y < height; y++) {
      let hasInk = false;
      const rowStart = y * width * channels;

      for (let x = 0; x < width; x++) {
        const idx = rowStart + x * channels;
        const v = data[idx];
        if (v < threshold) {
          hasInk = true;
          break;
        }
      }

      if (hasInk) {
        firstInkRow = y;
        break;
      }
    }

    if (firstInkRow == null) return null;

    const pxPerPoint = density / 72;
    const yFromBottomPx = height - firstInkRow;
    const yPdfPoints = yFromBottomPx / pxPerPoint;

    return yPdfPoints;
  } catch (e) {
    console.warn("Sharp fallback failed", e?.message || e);
    return null;
  }
}

async function getPage1TopContentY(pdf, pdfPath) {
  const page1 = await pdf.getPage(1);
  await page1.getOperationList();
  const content = await page1.getTextContent();

  let maxY = Infinity;
  let nonEmptyCount = 0;

  for (const item of content.items) {
    const s = (item.str ?? "").trim();
    if (!s) continue;
    nonEmptyCount++;

    const y = item.transform?.[5];
    if (typeof y === "number" && y > maxY) maxY = y;
  }

  if (nonEmptyCount >= 10 && isFinite(maxY)) return maxY;

  return await getPage1TopContentY_BySharp(pdfPath);
}

function shiftBoxesVertically(allPagesBoxes, deltaY) {
  if (!deltaY) return allPagesBoxes;

  return allPagesBoxes.map((pageBoxes) =>
    pageBoxes.map((b) => ({
      ...b,
      yMin: b.yMin - deltaY,
      yMax: b.yMax - deltaY,
    }))
  );
}

function computeDeltaY(baselineTopY, currentTopY) {
  if (baselineTopY == null || currentTopY == null) return 0;

  let deltaY = baselineTopY - currentTopY;

  deltaY = Math.max(-120, Math.min(120, deltaY));

  return deltaY;
}

function shouldApplyShift(deltaY) {
  return Math.abs(deltaY) > 2;
}

async function extractFromPdf(pdfPath) {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const pdf = await getDocument({
    data,
    standardFontDataUrl: "../node_modules/pdfjs-dist/standard_fonts/",
  }).promise;

  const totalPages = pdf.numPages;

  const currentTopY = await getPage1TopContentY(pdf, pdfPath);
  console.log(
    "DEBUG currentTopY =",
    currentTopY,
    "file =",
    path.basename(pdfPath)
  );

  if (baselineMaxY == null && currentTopY != null) {
    baselineMaxY = currentTopY;
    console.log("Baseline set from first good file:", baselineMaxY);
  }

  const deltaY = computeDeltaY(baselineMaxY, currentTopY);
  const applyShift = shouldApplyShift(deltaY);
  const apppliedDeltaY = applyShift ? deltaY : 0;

  const conditionUsed =
    baselineMaxY == null
      ? "No baseline (cannot auto-align)"
      : applyShift
        ? `Auto-aligned (deltaY=${appliedDeltaY.toFixed(2)})`
        : "Aligned (no shift)";

  const selectedBoxes = shiftBoxesVertically(boxesPerPage, appliedDeltaY);

  const results = [];

  for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
    const page = await pdf.getPage(pageIndex + 1);
    await page.getOperatorList();
    const content = await page.getTextContent();
    const boxes = selectedBoxes[pageIndex] || [];

    boxes.forEach((box, boxIndex) => {
      const hits = [];
      const toleranceY = 3;
      const toleranceX = 150;

      for (const item of content.items) {
        const x = item.transform[4];
        const y = item.transform[5];
        const itemText = (item.str ?? "").trim();
        if (!itemText) continue;

        if (
          y >= box.yMin - toleranceY &&
          y >= box.yMax + toleranceY &&
          x >= box.xMin - 50 &&
          x <= box.xMax + toleranceX
        ) {
          hits.push({ x, y, text: itemText });
        }
      }

      if (hits.length > 0) {
        hits.sort((a, b) => a.x - b.x);
        let combinedText = hits
          .map((h) => h.text)
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();

        const hariMatch = combinedText.match(/\((\d+)\s*(?:Hari|Days?)\)/i);
        if (hariMatch) combinedText = hariMatch[1];

        combinedText = combinedText
          .replace(/^[A-Za-z\s:]+:?/i, "")
          .replace(/^RM\s*/i, "")
          .trim();

        results.push({
          file: path.basename(pdfPath),
          page: pageIndex + 1,
          box: boxIndex + 1,
          text: combinedText,
          conditionUsed,
        });
      }
    });
  }

  const boxNameMap = {
    "1_1": "ACCOUNT NO",
    "1_2": "BILL NO",
    "1_3": "BILL DATE",
    "1_4": "TEMPOH BILL",
    "1_5": "DEPOSIT",
    "1_6": "CAJ SEMASA",
    "1_7": "SERVICE TAX",
    "1_8": "DISCOUNT REBATE",
    "1_9": "MONTHLY FEE",
    "1_10": "TUNGGAKAN",
  };

  const boxMap = {};
  selectedBoxes.forEach((boxesOnPage, pageIndex) => {
    boxesOnPage.forEach((_, boxIndex) => {
      const key = `${pageIndex + 1}_${boxIndex + 1}`;
      const variable = boxNameMap[key] || `BOX_${key}`;
      const match = results.find((r) => `${r.page}_${r.box}` === key) || {};
      boxMap[variable] = match.text ?? null;
    });
  });

  if (boxMap["TEMPOH BILL"]) {
    const tempoh = boxMap["TEMPOH BILL"].trim();
    const match = tempoh.match(
      /(\d{2}[\/-]\d{2}[\/-]\d{4})\s*-\s*(\d{2}[\/-]\d{2}[\/-]\d{4})/
    );
    if (match) {
      const [, startStr, endStr] = match;
      const [d1, m1, y1] = startStr.split(/[\/-]/).map(Number);
      const [d2, m2, y2] = endStr.split(/[\/-]/).map(Number);
      const diffMs = new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1);
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
      boxMap["BILANGAN HARI"] = diffDays.toString();
    }
  }

  const outputJson = {
    file: path.basename(pdfPath),
    conditionUsed,
    debug: { baselineTopY: baselineMaxY, currentTopY, deltaY, appliedDeltaY },
    boxes: boxMap,
  };

  const outputFile = path.join(
    outputFolder,
    path.basename(pdfPath).replace(/\.pdf$/i, "_output.json")
  );
  fs.writeFileSync(outputFile, JSON.stringify(outputJson, null, 2));

  console.log(`Processed ${path.basename(pdfPath)} -> ${conditionUsed}`);
  return outputJson;
}

// ============================================
// 🚀 Main Runner (process uploaded files)
// ============================================
async function processAllPdfs(files) {
  if (!files || !Array.isArray(files) || files.length === 0) {
    throw new Error("No files received in request.");
  }

  console.log("processAllPdfs called");
  const allResults = [];

  for (const file of files) {
    let { name, data } = file;
    if (!data) continue;

    name = name || `upload_${Date.now()}.pdf`;
    const pdfPath = path.join(outputFolder, name);

    let buffer;
    if (Buffer.isBuffer(data)) buffer = data;
    else if (typeof data === "string") buffer = Buffer.from(data, "base64");
    else
      throw new Error("Invalid file data format — must be Buffer or base64.");

    fs.writeFileSync(pdfPath, buffer);
    console.log("Saved PDF:", pdfPath, "Size:", fs.statSync(pdfPath).size);

    try {
      const result = await extractFromPdf(pdfPath);
      allResults.push(result);
    } catch (err) {
      console.error("❌ extractFromPdf failed for", pdfPath, "=>", err);
      allResults.push({ file: name, error: err.message });
    }
  }

  const summaryFile = path.join(outputFolder, "summary_all.json");
  fs.writeFileSync(summaryFile, JSON.stringify(allResults, null, 2));

  return { processed: allResults.length, results: allResults };
}

export default processAllPdfs;
