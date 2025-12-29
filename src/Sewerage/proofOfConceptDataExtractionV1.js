import fs from "fs";
import path from "path";
import { getDocument } from "../../node_modules/pdfjs-dist/legacy/build/pdf.mjs";

const outputFolder = "../uploads";
if (!fs.existsSync(outputFolder))
  fs.mkdirSync(outputFolder, { recursive: true });

// =============================
// ✅ NORMAL (AGAJAH) BOXES
// =============================
const boxesPerPage = [
  [
    { xMin: 385, xMax: 485, yMin: 810, yMax: 820 },
    { xMin: 385, xMax: 485, yMin: 800, yMax: 810 },
    { xMin: 460, xMax: 530, yMin: 783, yMax: 793 },
    { xMin: 365, xMax: 410, yMin: 410, yMax: 420 },
    { xMin: 370, xMax: 415, yMin: 455, yMax: 475 },
    { xMin: 45, xMax: 125, yMin: 542, yMax: 569 },
    { xMin: 160, xMax: 210, yMin: 210, yMax: 232 },
    { xMin: 315, xMax: 360, yMin: 448, yMax: 468 },
  ],
];

// =============================
// ✅ WITHOUT "CETAKAN DALAM TALIAN" (BAZAR8) BOXES
// Fill your real BAZAR8 coords here (PAGE 1 only)
// =============================
const withoutCetakan = [
  [
    { xMin: 375, xMax: 475, yMin: 735, yMax: 745 },
    { xMin: 375, xMax: 475, yMin: 725, yMax: 735 },
    { xMin: 435, xMax: 505, yMin: 702, yMax: 712 },
    { xMin: 365, xMax: 410, yMin: 352, yMax: 362 },
    { xMin: 370, xMax: 415, yMin: 385, yMax: 405 },
    { xMin: 60, xMax: 140, yMin: 492, yMax: 512 },
    { xMin: 160, xMax: 210, yMin: 140, yMax: 167 },
    { xMin: 315, xMax: 360, yMin: 380, yMax: 400 },
  ],
];

const CETAKAN_TEXT = "cetakan dalam talian";

// ============================================
// 🔍 Process a single PDF
// ============================================
async function extractFromPdf(pdfPath) {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const pdf = await getDocument({
    data,
    standardFontDataUrl: "../node_modules/pdfjs-dist/standard_fonts/",
  }).promise;

  console.log("Reading PDF data length:", data.length);
  const totalPages = pdf.numPages;

  // --- Extract text for detection flags ---
  let text = "";
  for (let i = 1; i <= totalPages; i++) {
    const page = await pdf.getPage(i);
    await page.getOperatorList(); // ✅ important for some PDFs
    const content = await page.getTextContent();

    text +=
      " " +
      content.items
        .map((it) => it.str)
        .join(" ")
        .toLowerCase();
  }

  text = text.replace(/\s+/g, " ").trim();

  const isWithoutCetakan = !text.includes(CETAKAN_TEXT);

  // ===== DEFAULT =====
  let selectedBoxes = boxesPerPage;
  let conditionUsed = "Default (Normal)";

  // ✅ ONLY 2 CONDITIONS (NORMAL vs WITHOUT CETAKAN)
  switch (true) {
    case isWithoutCetakan:
      selectedBoxes = withoutCetakan;
      conditionUsed = 'WITHOUT "CETAKAN DALAM TALIAN" (BAZAR8)';
      break;

    default:
      selectedBoxes = boxesPerPage;
      conditionUsed = 'WITH "CETAKAN DALAM TALIAN" (AGAJAH / Normal)';
      break;
  }

  // --- Extract text inside boxes ---
  const results = [];

  for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
    const page = await pdf.getPage(pageIndex + 1);
    await page.getOperatorList(); // ✅ important for some PDFs
    const content = await page.getTextContent();
    const boxes = selectedBoxes[pageIndex] || [];

    boxes.forEach((box, boxIndex) => {
      const hits = [];

      for (const item of content.items) {
        const x = item.transform[4];
        const y = item.transform[5];

        // ✅ normalize + skip empty items (prevents "" / " " outputs)
        const itemText = (item.str ?? "").replace(/\s+/g, " ").trim();
        if (!itemText) continue;

        if (x >= box.xMin && x <= box.xMax && y >= box.yMin && y <= box.yMax) {
          // ✅ MUST store as "text" because join uses h.text
          hits.push({ x, y, text: itemText });
        }
      }

      if (hits.length > 0) {
        let combinedText = hits.map((h) => h.text).join(" ");

        // Extract "(30 Hari)" or "(31 days)" etc.
        const hariMatch = combinedText.match(/\((\d+)\s*(?:Hari|Days?)\)/i);
        if (hariMatch) {
          combinedText = hariMatch[1];
        }

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

  // Normalize BOX_ prefix from results
  results.forEach((r) => {
    if (/^BOX_/.test(r.box)) {
      r.box = r.box.replace(/^BOX_/, "");
    }
  });

  // --- Base mapping for all conditions ---
  const boxNameMap = {
    "1_1": "NO BIL",
    "1_2": "TARIKH BIL",
    "1_3": "NOMBOR AKAUN",
    "1_4": "JUMLAH BIL",
    "1_5": "CAJ SEMASA",
    "1_6": "BAKI TERDAHULU",
    "1_7": "JUMLAH SELEPAS PENGGENAPAN",
    "1_8": "PELARASAN",
  };

  // --- Aggregate results into structured variable names ---
  const boxMap = {};
  selectedBoxes.forEach((boxesOnPage, pageIndex) => {
    boxesOnPage.forEach((b, boxIndex) => {
      const key = `${pageIndex + 1}_${boxIndex + 1}`;
      const variable = boxNameMap[key] || `BOX_${key}`;

      const match =
        results.find(
          (r) =>
            `${r.page}_${r.box}` === key ||
            `BOX_${r.page}_${r.box}` === `BOX_${key}`
        ) || {};

      // ✅ don't keep whitespace-only strings
      const val = typeof match.text === "string" ? match.text.trim() : null;
      boxMap[variable] = val ? val : null;
    });
  });

  // --- Final JSON structure for this file ---
  const outputJson = {
    file: path.basename(pdfPath),
    conditionUsed,
    boxes: boxMap,
  };

  // --- Save one JSON per PDF ---
  const outputFile = path.join(
    outputFolder,
    path.basename(pdfPath).replace(/\.pdf$/i, "_output.json")
  );
  fs.writeFileSync(outputFile, JSON.stringify(outputJson, null, 2));

  console.log(`✅ Processed ${path.basename(pdfPath)} → ${conditionUsed}`);
  return outputJson;
}

// ============================================
// 🚀 Main Folder Runner
// ============================================
async function processAllPdfsSewerage(files) {
  if (!files || !Array.isArray(files) || files.length === 0) {
    throw new Error("No files received in request.");
  }

  const allResults = [];

  for (const file of files) {
    let { name, data } = file;
    if (!data) continue;

    name = name || `upload_${Date.now()}.pdf`;
    const pdfPath = path.join(outputFolder, name);

    let buffer;
    if (Buffer.isBuffer(data)) {
      buffer = data;
    } else if (typeof data === "string") {
      buffer = Buffer.from(data, "base64");
    } else {
      throw new Error(
        "Invalid file data format — must be Buffer or base64 string."
      );
    }

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

export default processAllPdfsSewerage;
