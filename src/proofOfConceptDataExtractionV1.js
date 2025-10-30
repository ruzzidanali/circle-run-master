import fs from "fs";
import path from "path";
import { getDocument } from "../node_modules/pdfjs-dist/legacy/build/pdf.mjs";

const outputFolder = "../uploads";
if (!fs.existsSync(outputFolder))
  fs.mkdirSync(outputFolder, { recursive: true });

// create output folder if missing
// if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder, { recursive: true });

// Normal 2 pages bills
const boxes_AFA_AK = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 762.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 732.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 722.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 686.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 762.68 },
    { xMin: 208, xMax: 308, yMin: 480, yMax: 500 },
    { xMin: 349, xMax: 439, yMin: 480, yMax: 500 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 420, yMax: 430 },
    // { xMin: 390, xMax: 435, yMin: 380, yMax: 390 }, // commented line kept same as original
    { xMin: 340, xMax: 380, yMin: 315, yMax: 330 },
  ],
];

const boxes_AFA_AK_DUAL = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 762.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 732.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 722.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 686.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 762.68 },
    { xMin: 208, xMax: 308, yMin: 480, yMax: 500 },
    { xMin: 349, xMax: 439, yMin: 480, yMax: 500 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 405, yMax: 415 },
    // { xMin: 390, xMax: 435, yMin: 380, yMax: 390 }, // commented line kept same as original
    { xMin: 340, xMax: 380, yMin: 300, yMax: 315 },
  ],
];

const boxes_AFADual_AK_KWTBB_BLACK = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 762.68 }, // 50, 10
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 732.68 }, // 100, 10
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 722.68 }, // 100, 10
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 686.68 }, // 100, 10
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 762.68 }, // 100, 10
    { xMin: 208, xMax: 308, yMin: 480, yMax: 500 }, // 100, 20
    { xMin: 349, xMax: 439, yMin: 480, yMax: 500 }, // 90, 20
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 }, // 20, 10
  ],
  [
    { xMin: 385, xMax: 430, yMin: 405, yMax: 415 }, // 45, 10
    { xMin: 385, xMax: 430, yMin: 389, yMax: 399 }, // 45, 10
    { xMin: 340, xMax: 380, yMin: 285, yMax: 300 }, // 40, 15
  ],
];

const boxes_AFADual_AK_KWTBB_BLUE = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 762.68 },   // 50, 10
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 732.68 },   // 100, 10
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 722.68 },   // 100, 10
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 686.68 },   // 100, 10
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 762.68 }, // 100, 10
    { xMin: 208, xMax: 308, yMin: 480, yMax: 500 },         // 100, 20
    { xMin: 349, xMax: 439, yMin: 480, yMax: 500 },         // 90, 20
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },           // 20, 10
  ],
  [
    { xMin: 385, xMax: 430, yMin: 375, yMax: 385 },         // 45, 10
    { xMin: 385, xMax: 430, yMin: 359, yMax: 369 },         // 45, 10
    { xMin: 340, xMax: 380, yMin: 255, yMax: 270 },         // 40, 15
  ],
];


//Baru
const boxes_AFADual_ST_KWTBB = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 }, // 50, 11
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 }, // 100, 11
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 }, // 100, 11
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 }, // 100, 18
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 }, // 100, 15
    { xMin: 208, xMax: 308, yMin: 480, yMax: 500 }, // 100, 20
    { xMin: 349, xMax: 439, yMin: 480, yMax: 500 }, // 90, 20
  ],
  [
    { xMin: 385, xMax: 430, yMin: 390, yMax: 400 }, // 45, 10 (KWHR)
    { xMin: 385, xMax: 430, yMin: 375, yMax: 385 }, // 45, 10 (Service Tax)
    { xMin: 385, xMax: 430, yMin: 360, yMax: 370 }, // 45, 10 (KWTBB)
    { xMin: 340, xMax: 380, yMin: 253, yMax: 268 }, // 40, 15 (Penggunaan)
  ],
];

const boxes_Insentif_ST_AFA_KWTBB = [
  [
    { xMin: 250, xMax: 300, yMin: 754.68, yMax: 764.68 },
    { xMin: 250, xMax: 350, yMin: 724.68, yMax: 734.68 },
    { xMin: 250, xMax: 350, yMin: 714.68, yMax: 724.68 },
    { xMin: 250, xMax: 350, yMin: 678.68, yMax: 688.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 754.68, yMax: 764.68 },
    { xMin: 208, xMax: 308, yMin: 480, yMax: 500 },
    { xMin: 349, xMax: 439, yMin: 480, yMax: 500 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 382, yMax: 394 },
    { xMin: 385, xMax: 430, yMin: 365, yMax: 377 },
    { xMin: 385, xMax: 430, yMin: 350, yMax: 362 },
    { xMin: 340, xMax: 380, yMin: 247, yMax: 262 },
  ],
];

const boxes_Insentif_ST = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 }, // 50, 11
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 }, // 100, 11
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 }, // 100, 11
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 }, // 100, 18
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 }, // 100, 15
    { xMin: 208, xMax: 308, yMin: 480, yMax: 500 }, // 100, 20
    { xMin: 349, xMax: 439, yMin: 480, yMax: 500 }, // 90, 20
  ],
  [
    { xMin: 385, xMax: 430, yMin: 388, yMax: 398 }, // 45, 10
    { xMin: 385, xMax: 430, yMin: 374, yMax: 384 }, // 45, 10
    // { xMin: 385, xMax: 430, yMin: 356, yMax: 366 }, // 45, 10
    { xMin: 340, xMax: 380, yMin: 267, yMax: 282 }, // 40, 15
  ],
];

const boxes_AK_KWTBB = [
  [
    // { xMin: 10, xMax: 210, yMin: 685.8, yMax: 765.8 },
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 782.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 747.68 },
    { xMin: 250, xMax: 350, yMin: 672.68, yMax: 707.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 782.68 },
    { xMin: 208, xMax: 308, yMin: 480, yMax: 525 },
    { xMin: 349, xMax: 439, yMin: 480, yMax: 525 },
    { xMin: 32, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 396, yMax: 406 },
    { xMin: 390, xMax: 435, yMin: 380, yMax: 390 },
    { xMin: 340, xMax: 430, yMin: 278, yMax: 293 },
  ],
];

const boxes_Normal = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 }, // 50, 11
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 }, // 100, 11
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 }, // 100, 11
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 }, // 100, 18
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 }, // 100, 15
    { xMin: 208, xMax: 308, yMin: 480, yMax: 500 }, // 100, 20
    { xMin: 349, xMax: 439, yMin: 480, yMax: 500 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 396, yMax: 406 },
    { xMin: 390, xMax: 435, yMin: 380, yMax: 390 },
    { xMin: 340, xMax: 430, yMin: 278, yMax: 293 },
  ],
];

const boxes_AFA_AK_KWTBB = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 480, yMax: 500 },
    { xMin: 349, xMax: 439, yMin: 480, yMax: 500 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 396, yMax: 406 },
    { xMin: 385, xMax: 430, yMin: 380, yMax: 390 },
    { xMin: 340, xMax: 380, yMin: 278, yMax: 293 },
  ],
];

const boxes_AFA_AK_KWTBB_English = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 762.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 732.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 722.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 686.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 762.68 },
    { xMin: 208, xMax: 308, yMin: 480, yMax: 500 },
    { xMin: 349, xMax: 439, yMin: 480, yMax: 500 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 390, yMax: 400 },
    { xMin: 385, xMax: 430, yMin: 375, yMax: 385 },
    { xMin: 340, xMax: 380, yMin: 270, yMax: 285 },
  ],
];

const boxes_Cagaran_ST_Insentif = [
  [
    { xMin: 250, xMax: 300, yMin: 754.68, yMax: 764.68 },
    { xMin: 250, xMax: 350, yMin: 724.68, yMax: 734.68 },
    { xMin: 250, xMax: 350, yMin: 714.68, yMax: 724.68 },
    { xMin: 250, xMax: 350, yMin: 678.68, yMax: 688.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 754.68, yMax: 764.68 },
    { xMin: 208, xMax: 308, yMin: 482, yMax: 502 },
    { xMin: 349, xMax: 439, yMin: 482, yMax: 502 },
  ],
  [
    { xMin: 384, xMax: 429, yMin: 405, yMax: 415 },
    { xMin: 384, xMax: 429, yMin: 390, yMax: 400 },
    { xMin: 384, xMax: 429, yMin: 375, yMax: 385 },
    { xMin: 340, xMax: 380, yMin: 270, yMax: 285 },
  ],
];

const boxes_Cagaran_KWTBB_AK = [
  [
    { xMin: 250, xMax: 300, yMin: 754.68, yMax: 764.68 },
    { xMin: 250, xMax: 350, yMin: 724.68, yMax: 734.68 },
    { xMin: 250, xMax: 350, yMin: 714.68, yMax: 724.68 },
    { xMin: 250, xMax: 350, yMin: 678.68, yMax: 688.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 754.68, yMax: 764.68 },
    { xMin: 208, xMax: 308, yMin: 482, yMax: 502 },
    { xMin: 349, xMax: 439, yMin: 482, yMax: 502 },
    { xMin: 242, xMax: 262, yMin: 64, yMax: 74 },
  ],
  [
    { xMin: 384, xMax: 429, yMin: 422, yMax: 432 },
    { xMin: 384, xMax: 429, yMin: 407, yMax: 417 },
    { xMin: 340, xMax: 380, yMin: 285, yMax: 300 },
  ],
];

const boxes_Cagaran_AK = [
  [
    { xMin: 250, xMax: 300, yMin: 754.68, yMax: 764.68 },
    { xMin: 250, xMax: 350, yMin: 724.68, yMax: 734.68 },
    { xMin: 250, xMax: 350, yMin: 714.68, yMax: 724.68 },
    { xMin: 250, xMax: 350, yMin: 678.68, yMax: 688.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 754.68, yMax: 764.68 },
    { xMin: 208, xMax: 308, yMin: 482, yMax: 502 },
    { xMin: 349, xMax: 439, yMin: 482, yMax: 502 },
    { xMin: 242, xMax: 262, yMin: 64, yMax: 74 },
  ],
  [
    { xMin: 384, xMax: 429, yMin: 422, yMax: 432 },
    // { xMin: 384, xMax: 429, yMin: 407, yMax: 417 },
    // { xMin: 384, xMax: 429, yMin: 380, yMax: 390 },
    { xMin: 340, xMax: 380, yMin: 300, yMax: 315 },
  ],
];

// 3 pages bill
const boxes_Notis_AFADual_KWTBB = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 }, // 50, 11
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 }, // 100, 11
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 }, // 100, 11
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 }, // 100, 18
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 }, // 100, 15
    { xMin: 208, xMax: 308, yMin: 480, yMax: 500 }, // 100, 20
    { xMin: 349, xMax: 439, yMin: 480, yMax: 500 }, // 90, 20
  ],
  [
    { xMin: 385, xMax: 430, yMin: 388, yMax: 398 }, // 45, 10
    { xMin: 385, xMax: 430, yMin: 374, yMax: 384 }, // 45, 10
  ],
  [
    { xMin: 340, xMax: 380, yMin: 558, yMax: 573 }, // 40, 15
  ],
];

const boxes_Notis_AFADual_Insentif_KWTBB = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 }, // 50, 11
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 }, // 100, 11
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 }, // 100, 11
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 }, // 100, 18
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 }, // 100, 15
    { xMin: 208, xMax: 308, yMin: 480, yMax: 500 }, // 100, 20
    { xMin: 349, xMax: 439, yMin: 480, yMax: 500 }, // 90, 20
  ],
  [
    { xMin: 385, xMax: 430, yMin: 374, yMax: 384 }, // 45, 10
    { xMin: 385, xMax: 430, yMin: 358, yMax: 368 }, // 45, 10
  ],
  [
    { xMin: 340, xMax: 380, yMin: 558, yMax: 573 }, // 40, 15
  ],
];

const boxes_Notis_AFADual_Insentif_KWTBB_Surcaj = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 }, // 50, 11
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 }, // 100, 11
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 }, // 100, 11
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 }, // 100, 18
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 }, // 100, 15
    { xMin: 208, xMax: 308, yMin: 480, yMax: 500 }, // 100, 20
    { xMin: 349, xMax: 439, yMin: 480, yMax: 500 }, // 90, 20
  ],
  [
    { xMin: 385, xMax: 430, yMin: 374, yMax: 384 }, // 45, 10
    { xMin: 385, xMax: 430, yMin: 358, yMax: 368 }, // 45, 10
    { xMin: 385, xMax: 430, yMin: 343, yMax: 353 }, // 45, 10
  ],
  [
    { xMin: 340, xMax: 380, yMin: 558, yMax: 573 }, // 40, 15
  ],
];

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
  const allPageContents = [];
  for (let i = 1; i <= totalPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    allPageContents.push(content);
    text +=
      " " +
      content.items
        .map((i) => i.str)
        .join(" ")
        .toLowerCase();
  }

  text = text
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .replace(/[\u00A0\u1680\u180E\u2000-\u200D\u202F\u205F\u3000]/g, "")
    .replace(
      /sur[\s\u00A0\u2000-\u3000-]*caj[\s\u00A0\u2000-\u3000-]*angkadar[\s\u00A0\u2000-\u3000-]*kuasa/gi,
      "surcajangkadarkuasa"
    )
    .replace(
      /surcharge[\s\u00A0\u2000-\u3000-]*power[\s\u00A0\u2000-\u3000-]*factor/gi,
      "surcajangkadarkuasa"
    )
    .replace(/angkadar[\s\u00A0\u2000-\u3000-]*kuasa/gi, "angkadarkuasa")
    .replace(/power[\s\u00A0\u2000-\u3000-]*factor/gi, "powerfactor")
    .replace(/service[\s\u00A0\u2000-\u3000-]*tax/gi, "servicetax")
    .replace(
      /efficient[\s\u00A0\u2000-\u3000-]*energy[\s\u00A0\u2000-\u3000-]*incentive/gi,
      "insentifcekaptenaga"
    )
    .replace(/diliputi[\s\u00A0\u2000-\u3000-]*cagaran/gi, "diliputicagaran")
    .replace(
      /(kumpulan[\s\u00A0\u2000-\u3000-]*wang[\s\u00A0\u2000-\u3000-]*tenaga[\s\u00A0\u2000-\u3000-]*boleh[\s\u00A0\u2000-\u3000-]*baharu|kwtbb|re[\s\u00A0\u2000-\u3000-]*fund|renewable[\s\u00A0\u2000-\u3000-]*energy[\s\u00A0\u2000-\u3000-]*fund)/gi,
      "kwtbb"
    )
    // Dual-tarif merging
    .replace(
      /jumlah[\s\u00A0\u2000-\u3000\-]*\(?a\)?[\s:]*tarif[\s\u00A0\u2000-\u3000\-]*lama/gi,
      "jumlahA_tariflama"
    )
    .replace(
      /jumlah[\s\u00A0\u2000-\u3000\-]*\(?b\)?[\s:]*tarif[\s\u00A0\u2000-\u3000\-]*baharu/gi,
      "jumlahB_tarifbaharu"
    )
    // .replace(
    //   /caj[\s\u00A0\u2000-\u3000\-]*semasa[\s\u00A0\u2000-\u3000\-]*\(?a\+b\)?[\s:;,.]*/gi,
    //   "cajsemasajumlah"
    // )
    // Fallbacks
    .replace(/jumlah[\s\u00A0\u2000-\u3000\-]*\(?a\)?[\s:;,.]*/gi, "jumlahA")
    .replace(/jumlah[\s\u00A0\u2000-\u3000\-]*\(?b\)?[\s:;,.]*/gi, "jumlahB")
    .replace(
      /sur[\s\u00A0\u2000-\u3000\-]*caj[\s\u00A0\u2000-\u3000\-]*lewat[\s\u00A0\u2000-\u3000\-]*bayar/gi,
      "surcajlewatbayar"
    )
    .replace(
      /notis[\s\u00A0\u2000-\u3000-]*pemotongan[\s\u00A0\u2000-\u3000-]*bekalan[\s\u00A0\u2000-\u3000-]*elektrik/gi,
      "notispemotongan"
    );

  // ==========================================================
  // 🔍 Detect AFA kWh values (Blue = >0 kWh, Black = 0 kWh)
  // ==========================================================
  const afaBlocks = [...text.matchAll(/afa\s*\(\s*([\d,\.]+)\s*kwh/gi)];
  let hasAFABlue = false;
  let hasAFABlack = false;

  console.log("🔍 AFA text matches found:");
  afaBlocks.forEach((m, i) => {
    const val = parseFloat(m[1].replace(/,/g, ""));
    console.log(`  #${i + 1} → "${m[0]}" → raw: "${m[1]}" → parsed: ${val}`);
  });

  for (const match of afaBlocks) {
    const kwhValue = parseFloat(match[1].replace(/,/g, ""));
    if (!isNaN(kwhValue)) {
      if (kwhValue > 0) {
        hasAFABlue = true;
      } else {
        hasAFABlack = true;
      }
    }
  }

  if (!hasAFABlue && !hasAFABlack && /afa\s*\(/i.test(text)) {
    hasAFABlack = true;
  }

  const hasMultipleAFA = afaBlocks.length >= 2;

  console.log("✅ AFA Detection Summary →", {
    hasAFABlue,
    hasAFABlack,
    hasMultipleAFA,
  });

  // ==========================================================
  // 🧠 Detection Flags
  // ==========================================================
  const hasAngkadar = /\bangkadarkuasa\b/.test(text);
  const hasPowerFactor = /\bpowerfactor\b/.test(text);
  const hasSurcaj = /\bsurcajangkadarkuasa\b/.test(text);
  const hasServiceTax = /\bservicetax\b/.test(text);
  const hasKWTBB = /\bkwtbb\b/.test(text);
  const afaMatches = [
    ...text.matchAll(/a[\s\u00A0\u2000-\u3000-]*f[\s\u00A0\u2000-\u3000-]*a/gi),
  ];
  const hasAFA =
    afaMatches.length > 0 &&
    /a[\s\u00A0\u2000-\u3000-]*f[\s\u00A0\u2000-\u3000-]*a[\s\S]{0,40}(mulai|from)/gi.test(
      text
    );
  const hasInsentif =
    /\binsentif[\s\S]{0,10}cekap[\s\S]{0,10}tenaga\b/.test(text) ||
    /\befficient[\s\S]{0,10}energy[\s\S]{0,10}incentive\b/.test(text);
  const hasCagaran = /\bdiliputicagaran\b/.test(text);
  const hasJumlahA = /\bjumlahA(?:_tariflama)?\b/.test(text);
  const hasJumlahB = /\bjumlahB(?:_tarifbaharu)?\b/.test(text);
  const hasSurcajLewatBayar = /\bsurcajlewatbayar\b/.test(text);
  const hasNotisPemotongan = /\bnotispemotongan\b/.test(text);

  // ==========================================================
  // 📦 Select boxes based on condition flags
  // ==========================================================
  let selectedBoxes = [];
  let conditionUsed = "";

  switch (true) {
    // ======================================================
    // ⚡️ AFA + ANGKADAR KUASA + KWTBB  (Main Malay Layouts)
    // ======================================================
    case hasKWTBB && hasAngkadar:
      if (hasMultipleAFA) {
        // 🔹 Dual AFA (2 AFA)
        if (hasAFABlue) {
          selectedBoxes = boxes_AFADual_AK_KWTBB_BLUE;
          conditionUsed = "2 AFA + Angkadar Kuasa + KWTBB (Blue)";
        } else if (hasAFABlack) {
          selectedBoxes = boxes_AFADual_AK_KWTBB_BLACK;
          conditionUsed = "2 AFA + Angkadar Kuasa + KWTBB (Black)";
        } else {
          selectedBoxes = boxes_AFA_AK_KWTBB;
          conditionUsed = "2 AFA + Angkadar Kuasa + KWTBB";
        }
      } else {
        // 🔸 Single AFA (1 AFA)
        if (hasAFABlue) {
          selectedBoxes = boxes_AFA_AK_KWTBB;
          conditionUsed = "AFA + Angkadar Kuasa + KWTBB (Blue)";
        } else if (hasAFABlack) {
          selectedBoxes = boxes_AFA_AK_KWTBB;
          conditionUsed = "AFA + Angkadar Kuasa + KWTBB (Black)";
        } else {
          selectedBoxes = boxes_AFA_AK_KWTBB;
          conditionUsed = "AFA + Angkadar Kuasa + KWTBB";
        }
      }
      break;

    // ======================================================
    // ⚡️ AFA + POWER FACTOR + KWTBB  (English Layouts)
    // ======================================================
    case hasKWTBB && hasPowerFactor:
      if (hasMultipleAFA) {
        // 🔹 Dual AFA (2 AFA)
        if (hasAFABlue) {
          selectedBoxes = boxes_AFADual_AK_KWTBB_BLUE;
          conditionUsed = "2 AFA + Power Factor + KWTBB (Blue - English)";
        } else if (hasAFABlack) {
          selectedBoxes = boxes_AFADual_AK_KWTBB_BLACK;
          conditionUsed = "2 AFA + Power Factor + KWTBB (Black - English)";
        } else {
          selectedBoxes = boxes_AFA_AK_KWTBB;
          conditionUsed = "2 AFA + Power Factor + KWTBB (English)";
        }
      } else {
        // 🔸 Single AFA (1 AFA)
        if (hasAFABlue) {
          selectedBoxes = boxes_AFA_AK_KWTBB;
          conditionUsed = "AFA + Power Factor + KWTBB (Blue - English)";
        } else if (hasAFABlack) {
          selectedBoxes = boxes_AFA_AK_KWTBB;
          conditionUsed = "AFA + Power Factor + KWTBB (Black - English)";
        } else {
          selectedBoxes = boxes_AFA_AK_KWTBB;
          conditionUsed = "AFA + Power Factor + KWTBB (English)";
        }
      }
      break;

    // ======================================================
    // ⚡️ DUAL TARIF CASES
    // ======================================================
    case hasAngkadar && hasKWTBB && hasJumlahA && hasJumlahB:
      selectedBoxes = boxes_AK_KWTBB_2TARIF;
      conditionUsed = "Dual Tarif (Jumlah A + Jumlah B + Caj Semasa A+B)";
      break;

    // ======================================================
    // ⚡️ SERVICE TAX / INSENTIF / CAGARAN
    // ======================================================
    case hasAFA && hasInsentif && hasServiceTax && hasKWTBB:
      selectedBoxes = boxes_Insentif_ST_AFA_KWTBB;
      conditionUsed = "AFA + Service Tax + Insentif + KWTBB";
      break;

    case hasInsentif && hasCagaran && hasServiceTax:
      selectedBoxes = boxes_Cagaran_ST_Insentif;
      conditionUsed = "Insentif + Service Tax + Cagaran";
      break;

    case hasMultipleAFA && hasServiceTax && hasKWTBB:
      selectedBoxes = boxes_AFADual_ST_KWTBB;
      conditionUsed = "AFA Dual + Service Tax + KWTBB";
      break;

    case hasInsentif && hasServiceTax:
      selectedBoxes = boxes_Insentif_ST;
      conditionUsed = "Insentif + Service Tax";
      break;

    // ======================================================
    // ⚡️ NOTIS PEMOTONGAN (Disconnection Notice)
    // ======================================================
    case hasNotisPemotongan:
      if (hasMultipleAFA && hasInsentif && hasKWTBB && hasSurcajLewatBayar) {
        selectedBoxes = boxes_Notis_AFADual_Insentif_KWTBB_Surcaj;
        conditionUsed = "Notis + AFA Dual + Insentif + KWTBB + Surcaj";
      } else if (hasMultipleAFA && hasInsentif && hasKWTBB) {
        selectedBoxes = boxes_Notis_AFADual_Insentif_KWTBB;
        conditionUsed = "Notis + AFA Dual + Insentif + KWTBB";
      } else if (hasMultipleAFA && hasKWTBB) {
        selectedBoxes = boxes_Notis_AFADual_KWTBB;
        conditionUsed = "Notis + AFA Dual + KWTBB";
      } else {
        selectedBoxes = boxes_Normal;
        conditionUsed = "Notis (Default)";
      }
      break;

    // ======================================================
    // ⚡️ OTHER GENERIC FALLBACKS
    // ======================================================
    case hasCagaran && hasKWTBB && hasAngkadar:
      selectedBoxes = boxes_Cagaran_KWTBB_AK;
      conditionUsed = "Cagaran + KWTBB + Angkadar Kuasa";
      break;

    case hasCagaran && hasAngkadar:
      selectedBoxes = boxes_Cagaran_AK;
      conditionUsed = "Cagaran + Angkadar Kuasa";
      break;

    case hasAFA && hasAngkadar:
      if (hasMultipleAFA) {
        selectedBoxes = boxes_AFA_AK_DUAL;
        conditionUsed = "AFA + Angkadar Kuasa (Dual AFA)";
      } else {
        selectedBoxes = boxes_AFA_AK;
        conditionUsed = "AFA + Angkadar Kuasa";
      }
      break;

    // ======================================================
    // 🧱 DEFAULT CASE
    // ======================================================
    default:
      selectedBoxes = boxes_Normal;
      conditionUsed = "Default (Normal)";
      break;
  }

  // --- Extract text inside boxes ---
  const results = [];

  for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
    const page = await pdf.getPage(pageIndex + 1);
    const content = await page.getTextContent();
    const boxes = selectedBoxes[pageIndex] || [];

    boxes.forEach((box, boxIndex) => {
      const hits = [];

      for (const item of content.items) {
        const x = item.transform[4];
        const y = item.transform[5];
        const text = item.str.trim();

        if (x >= box.xMin && x <= box.xMax && y >= box.yMin && y <= box.yMax) {
          hits.push({ x, y, text });
        }
      }

      if (hits.length > 0) {
        let combinedText = hits.map((h) => h.text).join(" ");

        // Extract "(30 Hari)" or "(31 days)" etc.
        const hariMatch = combinedText.match(/\((\d+)\s*(?:Hari|Days?)\)/i);
        if (hariMatch) {
          // Option 1: Replace full text with just the number
          combinedText = hariMatch[1];

          // Option 2 (if you prefer to *append* a separate key later)
          // result["Bilangan Hari"] = hariMatch[1];
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
  let boxNameMap = {
    "1_1": "TARIKH BIL",
    "1_2": "TEMPOH BIL",
    "1_3": "BILANGAN HARI",
    "1_4": "NO INVOIS",
    "1_5": "NO AKAUN",
    "1_6": "BAKI TERDAHULU",
    "1_7": "CAJ SEMASA",
    "1_8": "ANGKADAR KUASA",
    "2_1": "KWHR",
    "2_2": "KWTBB",
    "2_3": "PENGGUNAAN",
  };

  if (conditionUsed === "Notis + AFA Dual + Insentif + KWTBB + Surcaj") {
    boxNameMap = {
      ...boxNameMap,
      "2_1": "KWHR",
      "2_2": "KWTBB",
      "2_3": "SURCAJ",
      "3_1": "PENGGUNAAN",
    };
  }

  if (conditionUsed === "Notis + AFA Dual + Insentif + KWTBB") {
    boxNameMap = {
      ...boxNameMap,
      "2_1": "KWHR",
      "2_2": "KWTBB",
      "3_1": "PENGGUNAAN",
    };
  }

  if (conditionUsed === "Notis + AFA Dual + KWTBB") {
    boxNameMap = {
      ...boxNameMap,
      "2_1": "KWHR",
      "2_2": "KWTBB",
      "3_1": "PENGGUNAAN",
    };
  }

  if (conditionUsed === "Insentif + Service Tax") {
    boxNameMap = {
      ...boxNameMap,
      "2_1": "KWHR",
      "2_2": "SERVICE TAX",
      "2_3": "PENGGUNAAN",
    };
  }

  if (conditionUsed === "AFA Dual + Service Tax + KWTBB") {
    boxNameMap = {
      ...boxNameMap,
      "2_1": "KWHR",
      "2_2": "SERVICE TAX",
      "2_3": "KWTBB",
      "2_4": "PENGGUNAAN",
    };
  }

  // --- Apply special mapping for specific condition ---
  if (conditionUsed === "Insentif + Service Tax + Cagaran") {
    boxNameMap = {
      ...boxNameMap, // keep all existing mappings
      "2_1": "KWHR",
      "2_2": "SERVICE TAX",
      "2_3": "CAGARAN",
      "2_4": "PENGGUNAAN",
    };
  }

  if (conditionUsed === "AFA + Service Tax + Insentif + KWTBB") {
    boxNameMap = {
      ...boxNameMap, // keep all existing mappings
      "2_1": "KWHR",
      "2_2": "SERVICE TAX",
      "2_3": "KWTBB",
      "2_4": "PENGGUNAAN",
    };
  }

  if (
    conditionUsed === "AFA + Angkadar Kuasa" ||
    conditionUsed === "AFA + Angkadar Kuasa (Dual AFA)"
  ) {
    boxNameMap = {
      ...boxNameMap, // keep all existing mappings
      "2_1": "KWHR",
      "2_2": "PENGGUNAAN",
    };
  }

  if (conditionUsed === "Dual Tarif (Jumlah A + Jumlah B + Caj Semasa A+B)") {
    boxNameMap = {
      ...boxNameMap,
      "3_1": "KWHR",
      "3_2": "KWTBB",
      "3_3": "PENGGUNAAN",
    };
  }

  // --- Aggregate results into structured variable names ---
  const boxMap = {};
  selectedBoxes.forEach((boxesOnPage, pageIndex) => {
    boxesOnPage.forEach((b, boxIndex) => {
      const key = `${pageIndex + 1}_${boxIndex + 1}`;
      const variable = boxNameMap[key] || `BOX_${key}`;

      // 🔧 normalize lookup
      const match =
        results.find(
          (r) =>
            `${r.page}_${r.box}` === key ||
            `BOX_${r.page}_${r.box}` === `BOX_${key}`
        ) || {};

      boxMap[variable] = match.text ?? null;
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

async function processAllPdfs(files) {
  if (!files || !Array.isArray(files) || files.length === 0) {
    throw new Error("No files received in request.");
  }
  console.log("processed all pdf function called");

  const allResults = [];

  for (const file of files) {
    let { name, data } = file;
    if (!data) continue;

    // fallback name if none provided
    name = name || `upload_${Date.now()}.pdf`;

    const pdfPath = path.join(outputFolder, name);

    let buffer;
    if (Buffer.isBuffer(data)) {
      buffer = data; // already binary
    } else if (typeof data === "string") {
      buffer = Buffer.from(data, "base64"); // convert base64 to binary
    } else {
      throw new Error(
        "Invalid file data format — must be Buffer or base64 string."
      );
    }

    fs.writeFileSync(pdfPath, buffer);
    console.log("Saved PDF:", pdfPath, "Size:", fs.statSync(pdfPath).size);

    // Process this PDF safely
    console.log(files + " files before sending it in");
    try {
      const result = await extractFromPdf(pdfPath);
      console.log("files after sending it awaiting extract from pdf");
      allResults.push(result);
    } catch (err) {
      console.error("❌ extractFromPdf failed for", pdfPath, "=>", err);
      allResults.push({ file: name, error: err.message });
    }
  }

  // Optionally save summary for debugging
  console.log("before summary file");
  const summaryFile = path.join(outputFolder, "summary_all.json");
  fs.writeFileSync(summaryFile, JSON.stringify(allResults, null, 2));

  return { processed: allResults.length, results: allResults };
}

export default processAllPdfs;
