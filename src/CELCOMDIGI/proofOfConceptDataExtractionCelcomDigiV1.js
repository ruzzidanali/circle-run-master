import fs from "fs";
import path from "path";
import { getDocument } from "../../node_modules/pdfjs-dist/legacy/build/pdf.mjs";

const outputFolder = "../uploads";

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

// ======================================================
// Normal CelcomDigi boxes
// ======================================================

const boxesPerPage = [
  [
    { xMin: 450, xMax: 600, yMin: 628, yMax: 635 }, // ACCOUNT NO
    { xMin: 420, xMax: 580, yMin: 618, yMax: 625 }, // BILL NO
    { xMin: 470, xMax: 610, yMin: 607, yMax: 612 }, // BILL DATE
    { xMin: 410, xMax: 580, yMin: 597, yMax: 603 }, // TEMPOH BILL
    { xMin: 510, xMax: 580, yMin: 575, yMax: 580 }, // DEPOSIT
    { xMin: 565, xMax: 585, yMin: 198, yMax: 200 }, // CAJ SEMASA
    { xMin: 565, xMax: 585, yMin: 210, yMax: 211 }, // ROUNDING ADJUSTMENT
    { xMin: 565, xMax: 585, yMin: 217, yMax: 218 }, // SERVICE TAX
    { xMin: 565, xMax: 585, yMin: 238, yMax: 239 }, // DISCOUNT REBATE
    { xMin: 565, xMax: 585, yMin: 335, yMax: 336 }, // MONTHLY FEE
    { xMin: 65, xMax: 110, yMin: 373, yMax: 375 }, // TUNGGAKAN
  ],
];

// ======================================================
// Portable WiFi page 1 boxes
// ======================================================

const boxesPortableWifi = [
  [
    { xMin: 450, xMax: 600, yMin: 640, yMax: 647 }, // ACCOUNT NO
    { xMin: 420, xMax: 580, yMin: 630, yMax: 637 }, // BILL NO
    { xMin: 470, xMax: 610, yMin: 619, yMax: 626 }, // BILL DATE
    { xMin: 410, xMax: 580, yMin: 609, yMax: 616 }, // TEMPOH BILL
    { xMin: 510, xMax: 580, yMin: 586, yMax: 592 }, // DEPOSIT
    { xMin: 565, xMax: 585, yMin: 198, yMax: 200 }, // CAJ SEMASA
    { xMin: 565, xMax: 585, yMin: 210, yMax: 211 }, // ROUNDING ADJUSTMENT
    { xMin: 565, xMax: 585, yMin: 217, yMax: 218 }, // SERVICE TAX
    { xMin: 565, xMax: 585, yMin: 238, yMax: 239 }, // DISCOUNT REBATE
    { xMin: 565, xMax: 585, yMin: 335, yMax: 336 }, // MONTHLY FEE
    { xMin: 65, xMax: 110, yMin: 373, yMax: 375 }, // TUNGGAKAN
  ],
];

// ======================================================
// Helpers
// ======================================================

function normalizeWhitespace(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeNumericValue(value) {
  if (value === null || value === undefined) {
    return null;
  }

  const cleaned = String(value)
    .replace(/RM/gi, "")
    .replace(/,/g, "")
    .replace(/\s+/g, "")
    .trim();

  return cleaned || null;
}

function extractPortableWifiRows(page3Text) {
  const normalizedText = normalizeWhitespace(page3Text);

  /*
    Page 3 row structure:

    Mobile Number
    Credit Limit
    One Time Amount
    Monthly Amount
    Usage Amount
    Discount & Rebates
    Amount
  */

  const rowRegex =
    /\b(01\d-\d{7,8})\s+(-?[\d,]+(?:\.\d+)?)\s+(-?[\d,]+(?:\.\d+)?)\s+(-?[\d,]+(?:\.\d+)?)\s+(-?[\d,]+(?:\.\d+)?)\s+(-?[\d,]+(?:\.\d+)?)\s+(-?[\d,]+(?:\.\d+)?)/g;

  const rows = [];

  for (const match of normalizedText.matchAll(rowRegex)) {
    rows.push({
      "MOBILE NUMBER": match[1],
      "MONTHLY FEE": normalizeNumericValue(match[4]),
      "USAGE AMOUNT": normalizeNumericValue(match[5]),
      "DISCOUNT REBATE": normalizeNumericValue(match[6]),
    });
  }

  const uniqueRows = [];
  const seenMobileNumbers = new Set();

  for (const row of rows) {
    const mobileNumber = row["MOBILE NUMBER"];

    if (seenMobileNumbers.has(mobileNumber)) {
      continue;
    }

    seenMobileNumbers.add(mobileNumber);
    uniqueRows.push(row);
  }

  return uniqueRows;
}

// ======================================================
// Process a single PDF
// ======================================================

async function extractFromPdf(pdfPath) {
  const data = new Uint8Array(
    fs.readFileSync(pdfPath)
  );

  const pdf = await getDocument({
    data,
    standardFontDataUrl:
      "../node_modules/pdfjs-dist/standard_fonts/",
  }).promise;

  console.log(
    "Reading PDF data length:",
    data.length
  );

  const totalPages = pdf.numPages;

  // Store all page contents and text.
  const pageContents = [];
  const pageTexts = [];

  for (
    let pageNumber = 1;
    pageNumber <= totalPages;
    pageNumber += 1
  ) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();

    pageContents.push(content);

    pageTexts.push(
      content.items
        .map((item) => item.str)
        .join(" ")
    );
  }

  // ====================================================
  // Detect Portable WiFi bill from page 3
  // ====================================================

  const page3Text = pageTexts[2] || "";

  const hasRegisteredMobileNumber =
    /registered\s+mobile\s+number/i.test(
      page3Text
    );

  const portableWifiRows =
    hasRegisteredMobileNumber
      ? extractPortableWifiRows(page3Text)
      : [];

  const hasMultipleRegisteredMobileNumbers =
    hasRegisteredMobileNumber &&
    portableWifiRows.length > 1;

  // ====================================================
  // Select page 1 template
  // ====================================================

  let selectedBoxes = boxesPerPage;
  let conditionUsed = "Default (Normal)";

  if (hasMultipleRegisteredMobileNumbers) {
    selectedBoxes = boxesPortableWifi;

    conditionUsed =
      "Portable WiFi - Multiple Registered Mobile Numbers";
  }

  console.log(
    `Detected condition: ${conditionUsed}`
  );

  if (hasMultipleRegisteredMobileNumbers) {
    console.log(
      `Registered mobile numbers: ${portableWifiRows.length}`
    );
  }

  // ====================================================
  // Extract text inside selected boxes
  // ====================================================

  const results = [];

  for (
    let pageIndex = 0;
    pageIndex < totalPages;
    pageIndex += 1
  ) {
    const content = pageContents[pageIndex];

    const boxes =
      selectedBoxes[pageIndex] || [];

    boxes.forEach((box, boxIndex) => {
      const hits = [];

      const toleranceY = 3;
      const toleranceX = 150;

      for (const item of content.items) {
        const x = item.transform[4];
        const y = item.transform[5];
        const itemText = item.str.trim();

        if (!itemText) {
          continue;
        }

        if (
          y >= box.yMin - toleranceY &&
          y <= box.yMax + toleranceY &&
          x >= box.xMin - 50 &&
          x <= box.xMax + toleranceX
        ) {
          hits.push({
            x,
            y,
            text: itemText,
          });
        }
      }

      if (hits.length > 0) {
        hits.sort((a, b) => a.x - b.x);

        let combinedText = hits
          .map((hit) => hit.text)
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();

        const hariMatch =
          combinedText.match(
            /\((\d+)\s*(?:Hari|Days?)\)/i
          );

        if (hariMatch) {
          combinedText = hariMatch[1];
        }

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

  // ====================================================
  // Field mapping
  // ====================================================

  const boxNameMap = {
    "1_1": "ACCOUNT NO",
    "1_2": "BILL NO",
    "1_3": "BILL DATE",
    "1_4": "TEMPOH BILL",
    "1_5": "DEPOSIT",
    "1_6": "CAJ SEMASA",
    "1_7": "ROUNDING ADJUSTMENT",
    "1_8": "SERVICE TAX",
    "1_9": "DISCOUNT REBATE",
    "1_10": "MONTHLY FEE",
    "1_11": "TUNGGAKAN",
  };

  // ====================================================
  // Aggregate normal page 1 results
  // ====================================================

  const boxMap = {};

  selectedBoxes.forEach(
    (boxesOnPage, pageIndex) => {
      boxesOnPage.forEach(
        (box, boxIndex) => {
          const key =
            `${pageIndex + 1}_${boxIndex + 1}`;

          const variable =
            boxNameMap[key] ||
            `BOX_${key}`;

          const match =
            results.find(
              (result) =>
                `${result.page}_${result.box}` ===
                key
            ) || {};

          boxMap[variable] =
            match.text ?? null;
        }
      );
    }
  );

  // ====================================================
  // Calculate Bilangan Hari
  // ====================================================

  if (boxMap["TEMPOH BILL"]) {
    const tempoh =
      boxMap["TEMPOH BILL"].trim();

    const match = tempoh.match(
      /(\d{2}[\/-]\d{2}[\/-]\d{4})\s*-\s*(\d{2}[\/-]\d{2}[\/-]\d{4})/
    );

    if (match) {
      const [
        ,
        startString,
        endString,
      ] = match;

      const [d1, m1, y1] =
        startString
          .split(/[\/-]/)
          .map(Number);

      const [d2, m2, y2] =
        endString
          .split(/[\/-]/)
          .map(Number);

      const difference =
        new Date(
          y2,
          m2 - 1,
          d2
        ) -
        new Date(
          y1,
          m1 - 1,
          d1
        );

      const differenceDays =
        Math.round(
          difference /
            (1000 * 60 * 60 * 24)
        );

      boxMap["BILANGAN HARI"] =
        differenceDays.toString();
    }
  }

  // ====================================================
  // Portable WiFi multi-row output
  // ====================================================

  let outputJson;

  if (hasMultipleRegisteredMobileNumbers) {
    const rows = portableWifiRows.map(
      (mobileRow, index) => {
        const isFirstRow =
          index === 0;

        return {
          "ACCOUNT NO":
            boxMap["ACCOUNT NO"],

          "BILL NO":
            boxMap["BILL NO"],

          "BILL DATE":
            boxMap["BILL DATE"],

          "TEMPOH BILL":
            boxMap["TEMPOH BILL"],

          "DEPOSIT":
            isFirstRow
              ? boxMap["DEPOSIT"]
              : null,

          "CAJ SEMASA":
            isFirstRow
              ? boxMap["CAJ SEMASA"]
              : null,

          "ROUNDING ADJUSTMENT":
            isFirstRow
              ? boxMap[
                  "ROUNDING ADJUSTMENT"
                ]
              : null,

          "SERVICE TAX":
            isFirstRow
              ? boxMap["SERVICE TAX"]
              : null,

          // Page 3
          "DISCOUNT REBATE":
            mobileRow[
              "DISCOUNT REBATE"
            ],

          // Page 3
          "MONTHLY FEE":
            mobileRow["MONTHLY FEE"],

          "TUNGGAKAN":
            isFirstRow
              ? boxMap["TUNGGAKAN"]
              : null,

          "MOBILE NUMBER":
            mobileRow[
              "MOBILE NUMBER"
            ],

          // Page 3
          "USAGE AMOUNT":
            mobileRow[
              "USAGE AMOUNT"
            ],

          "BILANGAN HARI":
            boxMap["BILANGAN HARI"],
        };
      }
    );

    outputJson = {
      file: path.basename(pdfPath),
      conditionUsed,
      mobileNumberCount: rows.length,
      rows,
    };
  } else {
    outputJson = {
      file: path.basename(pdfPath),
      conditionUsed,
      boxes: boxMap,
    };
  }

  // ====================================================
  // Save one JSON per PDF
  // ====================================================

  const outputFile = path.join(
    outputFolder,
    path
      .basename(pdfPath)
      .replace(
        /\.pdf$/i,
        "_output.json"
      )
  );

  fs.writeFileSync(
    outputFile,
    JSON.stringify(
      outputJson,
      null,
      2
    )
  );

  console.log(
    `✅ Processed ${path.basename(
      pdfPath
    )} → ${conditionUsed}`
  );

  return outputJson;
}

// ======================================================
// Live API file runner
// ======================================================

async function processAllPdfs(files) {
  if (
    !files ||
    !Array.isArray(files) ||
    files.length === 0
  ) {
    throw new Error(
      "No files received in request."
    );
  }

  console.log(
    "processed all pdf function called"
  );

  const allResults = [];

  for (const file of files) {
    let { name, data } = file;

    if (!data) {
      continue;
    }

    name =
      name ||
      `upload_${Date.now()}.pdf`;

    const pdfPath = path.join(
      outputFolder,
      name
    );

    let buffer;

    if (Buffer.isBuffer(data)) {
      buffer = data;
    } else if (
      typeof data === "string"
    ) {
      buffer = Buffer.from(
        data,
        "base64"
      );
    } else {
      throw new Error(
        "Invalid file data format — must be Buffer or base64 string."
      );
    }

    fs.writeFileSync(
      pdfPath,
      buffer
    );

    console.log(
      "Saved PDF:",
      pdfPath,
      "Size:",
      fs.statSync(pdfPath).size
    );

    try {
      const result =
        await extractFromPdf(
          pdfPath
        );

      allResults.push(
        result
      );
    } catch (err) {
      console.error(
        "❌ extractFromPdf failed for",
        pdfPath,
        "=>",
        err
      );

      allResults.push({
        file: name,
        error: err.message,
      });
    }
  }

  const summaryFile = path.join(
    outputFolder,
    "summary_all.json"
  );

  fs.writeFileSync(
    summaryFile,
    JSON.stringify(
      allResults,
      null,
      2
    )
  );

  return {
    processed:
      allResults.length,

    results:
      allResults,
  };
}

export default processAllPdfs;