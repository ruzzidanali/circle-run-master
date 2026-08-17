import fs from "fs";
import path from "path";
import { getDocument } from "../node_modules/pdfjs-dist/legacy/build/pdf.mjs";

const outputFolder = "../uploads";
if (!fs.existsSync(outputFolder))
  fs.mkdirSync(outputFolder, { recursive: true });

// create output folder if missing
// if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder, { recursive: true });

const boxes_AFA_AK = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 762.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 732.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 722.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 686.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 762.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
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
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 405, yMax: 415 },
    // { xMin: 390, xMax: 435, yMin: 380, yMax: 390 }, // commented line kept same as original
    { xMin: 340, xMax: 380, yMin: 300, yMax: 315 },
  ],
];

// ============================================
// 2AFA + AK + KWTBB Boxes
// ============================================

const boxes_AFADual_AK_KWTBB_BLACK = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 762.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 732.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 722.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 686.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 762.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 405, yMax: 415 },
    { xMin: 385, xMax: 430, yMin: 389, yMax: 399 },
    { xMin: 340, xMax: 380, yMin: 285, yMax: 300 },
  ],
];

const boxes_AFADual_AK_KWTBB_BLACK_English = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 762.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 732.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 722.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 686.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 762.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 390, yMax: 400 },
    { xMin: 385, xMax: 430, yMin: 374, yMax: 384 },
    { xMin: 340, xMax: 380, yMin: 270, yMax: 285 },
  ],
];

const boxes_AFADual_AK_KWTBB_BLUE = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 389, yMax: 399 },
    { xMin: 385, xMax: 430, yMin: 373, yMax: 383 },
    { xMin: 340, xMax: 380, yMin: 270, yMax: 285 },
  ],
];

const boxes_AFADual_AK_KWTBB_BLUE_English = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 762.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 732.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 722.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 686.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 762.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 375, yMax: 385 },
    { xMin: 385, xMax: 430, yMin: 359, yMax: 369 },
    { xMin: 340, xMax: 380, yMin: 255, yMax: 270 },
  ],
];

const boxes_AFADual_AK_KWTBB_BLUE_PG = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 389, yMax: 399 },
    { xMin: 385, xMax: 430, yMin: 373, yMax: 383 },
    { xMin: 340, xMax: 380, yMin: 253, yMax: 285 },
  ],
];

const boxes_AFADual_AK_KWTBB_BLUE_JumlahAnggaranBil = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 350, yMax: 360 },
    { xMin: 385, xMax: 430, yMin: 335, yMax: 345 },
    { xMin: 340, xMax: 380, yMin: 230, yMax: 245 },
  ],
];

const boxes_AFADual_AK_KWTBB_BLUE_Insentif_PG = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 373, yMax: 383 },
    { xMin: 385, xMax: 430, yMin: 358, yMax: 368 },
    { xMin: 340, xMax: 380, yMin: 237, yMax: 252 },
  ],
];

const boxes_AFADual_AK_KWTBB_BLUE_PG_Surcaj = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 373, yMax: 383 },
    { xMin: 385, xMax: 430, yMin: 358, yMax: 368 },
    { xMin: 340, xMax: 380, yMin: 237, yMax: 252 },
  ],
];

const boxes_AFADual_AK_KWTBB_BLUE_Prorata = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 366, yMax: 376 },
    { xMin: 385, xMax: 430, yMin: 351, yMax: 361 },
    { xMin: 340, xMax: 380, yMin: 246, yMax: 261 },
  ],
];

const boxes_AFADual_AK_KWTBB_BLUE_JumlahAnggaranBil_PG_Prorata = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 335, yMax: 345 },
    { xMin: 385, xMax: 430, yMin: 320, yMax: 330 },
    { xMin: 340, xMax: 380, yMin: 200, yMax: 215 },
  ],
];

const boxes_AFADual_AK_KWTBB_BLUE_PUNCAK_MAKSIMA = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 327, yMax: 337 },
    { xMin: 385, xMax: 430, yMin: 312, yMax: 322 },
    { xMin: 385, xMax: 425, yMin: 578, yMax: 588 },
  ],
];

const boxes_AFADual_AK_KWTBB_BLUE_PUNCAK = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 342, yMax: 352 },
    { xMin: 385, xMax: 430, yMin: 327, yMax: 347 },
    { xMin: 385, xMax: 425, yMin: 578, yMax: 588 },
  ],
];

const boxes_AFADual_AK_KWTBB_BLUE_S = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 373, yMax: 383 },
    { xMin: 385, xMax: 430, yMin: 358, yMax: 368 },
    { xMin: 340, xMax: 380, yMin: 253, yMax: 268 },
  ],
];

const boxes_AFADual_AK_KWTBB_Blue_Surcaj = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 388, yMax: 398 },
    { xMin: 385, xMax: 430, yMin: 373, yMax: 383 },
    { xMin: 340, xMax: 380, yMin: 252, yMax: 267 },
  ],
];

const boxes_AFADual_AK_KWTBB_BLUE_Insentif = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 373, yMax: 383 },
    { xMin: 385, xMax: 430, yMin: 358, yMax: 368 },
    { xMin: 340, xMax: 380, yMin: 252, yMax: 267 },
  ],
];

const boxes_AFADual_AK_KWTBB_Insentif_Surcaj = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 373, yMax: 383 },
    { xMin: 385, xMax: 430, yMin: 358, yMax: 368 },
    { xMin: 340, xMax: 380, yMin: 236, yMax: 251 },
  ],
];

const boxes_AFADual_AK_KWTBB_Insentif_Surcaj_English = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 352, yMax: 362 },
    { xMin: 385, xMax: 430, yMin: 336, yMax: 346 },
    { xMin: 340, xMax: 380, yMin: 216, yMax: 231 },
  ],
];

const boxes_AFADual_AK_KWTBB_Insentif_Blue_English = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 352, yMax: 362 },
    { xMin: 385, xMax: 430, yMin: 336, yMax: 346 },
    { xMin: 340, xMax: 380, yMin: 230, yMax: 245 },
  ],
];

const boxes_AFA_AK__KWTBB_BLUE_PUNCAK_Insentif = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 334, yMax: 344 },
    { xMin: 385, xMax: 430, yMin: 318, yMax: 328 },
    { xMin: 385, xMax: 425, yMin: 578, yMax: 588 },
  ],
];

const boxes_AFA_AK_KWTBB_BLUE_PUNCAK_Insentif_S = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 319, yMax: 329 },
    { xMin: 385, xMax: 430, yMin: 304, yMax: 314 },
    { xMin: 385, xMax: 430, yMin: 346, yMax: 356 },
    { xMin: 385, xMax: 425, yMin: 578, yMax: 588 },
  ],
];

const boxes_AFADual_ST_KWTBB = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 390, yMax: 400 },
    { xMin: 385, xMax: 430, yMin: 375, yMax: 385 },
    { xMin: 385, xMax: 430, yMin: 358, yMax: 371 },
    { xMin: 340, xMax: 380, yMin: 253, yMax: 268 },
  ],
];

const boxes_Insentif_ST = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 388, yMax: 398 },
    { xMin: 385, xMax: 430, yMin: 374, yMax: 384 },
    // { xMin: 385, xMax: 430, yMin: 356, yMax: 366 },
    { xMin: 340, xMax: 380, yMin: 267, yMax: 282 },
  ],
];

const boxes_Insentif_ST_AFA_KWTBB = [
  [
    { xMin: 250, xMax: 300, yMin: 754.68, yMax: 764.68 },
    { xMin: 250, xMax: 350, yMin: 724.68, yMax: 734.68 },
    { xMin: 250, xMax: 350, yMin: 714.68, yMax: 724.68 },
    { xMin: 250, xMax: 350, yMin: 678.68, yMax: 688.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 754.68, yMax: 764.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 382, yMax: 394 },
    { xMin: 385, xMax: 430, yMin: 365, yMax: 377 },
    { xMin: 385, xMax: 430, yMin: 350, yMax: 362 },
    { xMin: 340, xMax: 380, yMin: 247, yMax: 262 },
  ],
];

const boxes_Insentif_ST_2AFA_KWTBB = [
  [
    { xMin: 250, xMax: 300, yMin: 754.68, yMax: 764.68 },
    { xMin: 250, xMax: 350, yMin: 724.68, yMax: 734.68 },
    { xMin: 250, xMax: 350, yMin: 714.68, yMax: 724.68 },
    { xMin: 250, xMax: 350, yMin: 678.68, yMax: 688.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 754.68, yMax: 764.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 375, yMax: 387 },
    { xMin: 385, xMax: 430, yMin: 358, yMax: 370 },
    { xMin: 385, xMax: 430, yMin: 343, yMax: 355 },
    { xMin: 340, xMax: 380, yMin: 232, yMax: 247 },
  ],
];

const boxes_Insentif_ST_AFA_KWTBB_S = [
  [
    { xMin: 250, xMax: 300, yMin: 754.68, yMax: 764.68 },
    { xMin: 250, xMax: 350, yMin: 724.68, yMax: 734.68 },
    { xMin: 250, xMax: 350, yMin: 714.68, yMax: 724.68 },
    { xMin: 250, xMax: 350, yMin: 678.68, yMax: 688.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 754.68, yMax: 764.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 387, yMax: 399 },
    { xMin: 385, xMax: 430, yMin: 372, yMax: 384 },
    { xMin: 385, xMax: 430, yMin: 358, yMax: 370 },
    { xMin: 385, xMax: 430, yMin: 340, yMax: 352 },
    { xMin: 340, xMax: 380, yMin: 237, yMax: 252 },
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

// ============================================
// AFA + AK + KWTBB Boxes
// ============================================

const boxes_AFA_AK_KWTBB = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
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
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 390, yMax: 400 },
    { xMin: 385, xMax: 430, yMin: 375, yMax: 385 },
    { xMin: 340, xMax: 380, yMin: 270, yMax: 285 },
  ],
];

const boxes_AFA_AK_KWTBB_BLUE = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 412, yMax: 422 },
    { xMin: 385, xMax: 430, yMin: 397, yMax: 407 },
    { xMin: 340, xMax: 380, yMin: 290, yMax: 305 },
  ],
];

const boxes_AFA_AK_KWTBB_BLUE_S = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 397, yMax: 407 },
    { xMin: 385, xMax: 430, yMin: 381, yMax: 391 },
    { xMin: 385, xMax: 430, yMin: 424, yMax: 434 },
    { xMin: 340, xMax: 380, yMin: 274, yMax: 289 },
  ],
];

const boxes_AFA_AK_KWTBB_BLUE_English = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 412, yMax: 422 },
    { xMin: 385, xMax: 430, yMin: 397, yMax: 407 },
    { xMin: 340, xMax: 380, yMin: 290, yMax: 305 },
  ],
];

const boxes_AFA_AK_KWTBB_BLUE_PUNCAK_MAKSIMA = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 350, yMax: 360 },
    { xMin: 385, xMax: 430, yMin: 335, yMax: 345 },
    { xMin: 385, xMax: 425, yMin: 545, yMax: 560 },
  ],
];

const boxes_AFA_AK_KWTBB_BLUE_PUNCAK = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 373, yMax: 383 },
    { xMin: 385, xMax: 430, yMin: 357, yMax: 367 },
    { xMin: 385, xMax: 425, yMin: 545, yMax: 560 },
  ],
];

const boxes_AFA_AK_KWTBB_BLUE_PUNCAK_SURCAJ = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 335, yMax: 345 },
    { xMin: 385, xMax: 430, yMin: 320, yMax: 330 },
    { xMin: 385, xMax: 430, yMin: 360, yMax: 375 },
    { xMin: 385, xMax: 425, yMin: 545, yMax: 560 },
  ],
];

const boxes_AFA_AK_KWTBB_BLUE_Insentif = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 397, yMax: 407 },
    { xMin: 385, xMax: 430, yMin: 381, yMax: 391 },
    { xMin: 340, xMax: 380, yMin: 277, yMax: 292 },
  ],
];

const boxes_AFA_AK_KWTBB_BLACK = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 412, yMax: 422 },
    { xMin: 385, xMax: 430, yMin: 397, yMax: 407 },
    { xMin: 340, xMax: 380, yMin: 290, yMax: 305 },
  ],
];

const boxes_AFA_AK_KWTBB_BLACK_PUNCAK_MAKSIMA = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 350, yMax: 360 },
    { xMin: 385, xMax: 430, yMin: 335, yMax: 345 },
    { xMin: 385, xMax: 425, yMin: 545, yMax: 560 },
  ],
];

const boxes_AFA_AK_KWTBB_BLACK_PUNCAK = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 373, yMax: 383 },
    { xMin: 385, xMax: 430, yMin: 357, yMax: 367 },
    { xMin: 385, xMax: 425, yMin: 545, yMax: 560 },
  ],
];

const boxes_AFA_AK_KWTBB_BLACK_English = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 412, yMax: 422 },
    { xMin: 385, xMax: 430, yMin: 397, yMax: 407 },
    { xMin: 340, xMax: 380, yMin: 290, yMax: 305 },
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

// ============================================
// Notis boxes
// ============================================

const boxes_Notis_AFADual_KWTBB = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 388, yMax: 398 },
    { xMin: 385, xMax: 430, yMin: 374, yMax: 384 },
  ],
  [{ xMin: 340, xMax: 380, yMin: 558, yMax: 573 }],
];

const boxes_Notis_AFADual_Insentif_KWTBB = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 374, yMax: 384 },
    { xMin: 385, xMax: 430, yMin: 358, yMax: 368 },
  ],
  [{ xMin: 340, xMax: 380, yMin: 558, yMax: 573 }],
];

const boxes_Notis_AFADual_Insentif_KWTBB_Surcaj = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 374, yMax: 384 },
    { xMin: 385, xMax: 430, yMin: 358, yMax: 368 },
    { xMin: 385, xMax: 430, yMin: 343, yMax: 353 },
  ],
  [{ xMin: 340, xMax: 380, yMin: 558, yMax: 573 }],
];

// ============================================
// New 12 Template Boxes
// ============================================

// Malay

const boxes_2AFABlack_AK_KWTBB_PenggunaanPuncak_Maksima = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 340, yMax: 350 },
    { xMin: 385, xMax: 430, yMin: 325, yMax: 335 },
    { xMin: 385, xMax: 425, yMin: 578, yMax: 588 },
  ],
];

const boxes_2AFABlack_2Line_AK_KWTBB_PenggunaanPuncak_Maksima = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 327, yMax: 337 },
    { xMin: 385, xMax: 430, yMin: 312, yMax: 322 },
    { xMin: 385, xMax: 425, yMin: 578, yMax: 588 },
  ],
];

const boxes_2AFABlack_1Line_2Line_AK_KWTBB_PenggunaanPuncak_Maksima = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 335, yMax: 345 },
    { xMin: 385, xMax: 430, yMin: 320, yMax: 330 },
    { xMin: 385, xMax: 425, yMin: 578, yMax: 588 },
  ],
];

const boxes_2AFABlack_ServiceTax_Insentif_KWTBB = [
  [
    { xMin: 250, xMax: 300, yMin: 754.68, yMax: 764.68 },
    { xMin: 250, xMax: 350, yMin: 724.68, yMax: 734.68 },
    { xMin: 250, xMax: 350, yMin: 714.68, yMax: 724.68 },
    { xMin: 250, xMax: 350, yMin: 678.68, yMax: 688.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 754.68, yMax: 764.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 385, yMax: 397 },
    { xMin: 385, xMax: 430, yMin: 368, yMax: 380 },
    { xMin: 385, xMax: 430, yMin: 353, yMax: 365 },
    { xMin: 340, xMax: 380, yMin: 245, yMax: 260 },
  ],
];

const boxes_2AFABlack_AK_KWTBB = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 398, yMax: 408 },
    { xMin: 385, xMax: 430, yMin: 383, yMax: 393 },
    { xMin: 340, xMax: 380, yMin: 271, yMax: 285 },
  ],
];

const boxes_2AFABlack_1Line_2Line_AK_KWTBB = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 400, yMax: 410 },
    { xMin: 385, xMax: 430, yMin: 385, yMax: 395 },
    { xMin: 340, xMax: 380, yMin: 275, yMax: 290 },
  ],
];

const boxes_2AFABlack_AK_KWTBB_Insentif = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 388, yMax: 398 },
    { xMin: 385, xMax: 430, yMin: 371, yMax: 381 },
    { xMin: 340, xMax: 380, yMin: 262, yMax: 277 },
  ],
];

const boxes_2AFABlack_2Line_1Line_AK_KWTBB_PenggunaanPuncak_Maksima = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 328, yMax: 338 },
    { xMin: 385, xMax: 430, yMin: 313, yMax: 323 },
    { xMin: 385, xMax: 425, yMin: 570, yMax: 580 },
  ],
];

// New 17/8/2026
const boxes_2AFABlack_2Line_1Line_AK_KWTBB = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 460, yMax: 480 },
    { xMin: 349, xMax: 439, yMin: 460, yMax: 480 },
    { xMin: 480, xMax: 570, yMin: 460, yMax: 480 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 385, yMax: 395 },
    { xMin: 385, xMax: 430, yMin: 370, yMax: 380 },
    { xMin: 385, xMax: 430, yMin: 570, yMax: 580 },
  ],
];

const boxes_1AFABlack_2Line_AK_KWTBB_PenggunaanPuncak_Maksima = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 460, yMax: 480 },
    { xMin: 349, xMax: 439, yMin: 460, yMax: 480 },
    { xMin: 480, xMax: 570, yMin: 460, yMax: 480 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 340, yMax: 350 },
    { xMin: 385, xMax: 430, yMin: 325, yMax: 335 },
    { xMin: 385, xMax: 430, yMin: 565, yMax: 585 },
  ],
];

const boxes_2AFABlack_KWTBB_CukaiPerkhidmatan = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 470, yMax: 490 },
    { xMin: 349, xMax: 439, yMin: 470, yMax: 490 },
    { xMin: 480, xMax: 570, yMin: 470, yMax: 490 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 395, yMax: 410 },
    { xMin: 385, xMax: 430, yMin: 380, yMax: 395 },
    { xMin: 385, xMax: 430, yMin: 365, yMax: 380 },
    { xMin: 385, xMax: 430, yMin: 570, yMax: 585 },
  ],
];

// English

const boxes_2AFABlack_PowerFactor_Incentive_2Line_KWTBB = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 763.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 733.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 723.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 694.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 767.68 },
    { xMin: 208, xMax: 308, yMin: 460, yMax: 480 },
    { xMin: 349, xMax: 439, yMin: 460, yMax: 480 },
    { xMin: 480, xMax: 570, yMin: 460, yMax: 480 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 365, yMax: 375 },
    { xMin: 385, xMax: 430, yMin: 350, yMax: 360 },
    { xMin: 340, xMax: 380, yMin: 240, yMax: 255 },
  ],
];

const boxes_2AFABlack_1Line_2Line_PowerFactor_KWTBB_PeakUsage_MaxDemand = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 762.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 732.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 722.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 686.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 762.68 },
    { xMin: 208, xMax: 308, yMin: 460, yMax: 480 },
    { xMin: 349, xMax: 439, yMin: 460, yMax: 480 },
    { xMin: 480, xMax: 570, yMin: 460, yMax: 480 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 320, yMax: 330 },
    { xMin: 385, xMax: 430, yMin: 305, yMax: 315 },
    { xMin: 385, xMax: 430, yMin: 560, yMax: 575 },
  ],
];

const boxes_2AFABlack_2Line_PowerFactor_KWTBB_PeakUsage_MaxDemand = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 762.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 732.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 722.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 686.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 762.68 },
    { xMin: 208, xMax: 308, yMin: 460, yMax: 480 },
    { xMin: 349, xMax: 439, yMin: 460, yMax: 480 },
    { xMin: 480, xMax: 570, yMin: 460, yMax: 480 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 310, yMax: 320 },
    { xMin: 385, xMax: 430, yMin: 295, yMax: 305 },
    { xMin: 385, xMax: 430, yMin: 560, yMax: 575 },
  ],
];

const boxes_2AFABlack_PowerFactor_KWTBB = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 762.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 732.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 722.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 686.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 762.68 },
    { xMin: 208, xMax: 308, yMin: 460, yMax: 480 },
    { xMin: 349, xMax: 439, yMin: 460, yMax: 480 },
    { xMin: 480, xMax: 570, yMin: 460, yMax: 480 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 390, yMax: 400 },
    { xMin: 385, xMax: 430, yMin: 375, yMax: 385 },
    { xMin: 385, xMax: 430, yMin: 560, yMax: 575 },
  ],
];

const boxes_2AFABlack_PowerFactor_KWTBB_PeakUsage_MaxDemand = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 762.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 732.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 722.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 686.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 762.68 },
    { xMin: 208, xMax: 308, yMin: 460, yMax: 480 },
    { xMin: 349, xMax: 439, yMin: 460, yMax: 480 },
    { xMin: 480, xMax: 570, yMin: 460, yMax: 480 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 328, yMax: 338 },
    { xMin: 385, xMax: 430, yMin: 313, yMax: 323 },
    { xMin: 385, xMax: 430, yMin: 560, yMax: 575 },
  ],
];

// New 17/8/2026
const boxes_2AFABlack_2Line_1Line_PowerFactor_KWTBB_PeakUsage_MaxDemand = [
  [
    { xMin: 250, xMax: 300, yMin: 752.68, yMax: 762.68 },
    { xMin: 250, xMax: 350, yMin: 722.68, yMax: 732.68 },
    { xMin: 250, xMax: 350, yMin: 712.68, yMax: 722.68 },
    { xMin: 250, xMax: 350, yMin: 676.68, yMax: 686.68 },
    { xMin: 396.96, xMax: 496.96, yMin: 752.68, yMax: 762.68 },
    { xMin: 208, xMax: 308, yMin: 460, yMax: 480 },
    { xMin: 349, xMax: 439, yMin: 460, yMax: 480 },
    { xMin: 480, xMax: 570, yMin: 460, yMax: 480 },
    { xMin: 242, xMax: 262, yMin: 61, yMax: 71 },
  ],
  [
    { xMin: 385, xMax: 430, yMin: 320, yMax: 330 },
    { xMin: 385, xMax: 430, yMin: 305, yMax: 315 },
    { xMin: 385, xMax: 430, yMin: 560, yMax: 575 },
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
    useWorker: false,
  }).promise;

  console.log("Reading PDF data length:", data.length);

  const totalPages = pdf.numPages;

  // ======================================================
  // Helper: normalize general detection text
  // ======================================================
  function normalizeDetectionText(value = "") {
    return value
      .toLowerCase()
      .normalize("NFKC")
      .replace(/[\u00A0\u1680\u180E\u2000-\u200D\u202F\u205F\u3000]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // ======================================================
  // Helper: build visible PDF lines using X/Y coordinates
  // ======================================================
  function buildPdfLines(content, yTolerance = 2.5) {
    const items = content.items
      .filter((item) => item.str && item.str.trim())
      .map((item) => ({
        text: item.str.trim(),
        x: item.transform[4],
        y: item.transform[5],
      }))
      .sort((a, b) => {
        // PDF coordinates: higher Y appears above lower Y
        if (Math.abs(b.y - a.y) > yTolerance) {
          return b.y - a.y;
        }

        return a.x - b.x;
      });

    const groupedLines = [];

    for (const item of items) {
      let existingLine = groupedLines.find(
        (line) => Math.abs(line.y - item.y) <= yTolerance,
      );

      if (!existingLine) {
        existingLine = {
          y: item.y,
          items: [],
        };

        groupedLines.push(existingLine);
      }

      existingLine.items.push(item);
    }

    return groupedLines
      .map((line) => {
        line.items.sort((a, b) => a.x - b.x);

        const lineText = line.items
          .map((item) => item.text)
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();

        return {
          y: line.y,
          text: lineText,
          normalizedText: normalizeDetectionText(lineText),
          items: line.items,
        };
      })
      .sort((a, b) => b.y - a.y);
  }

  // ======================================================
  // Helper: detect AFA row line structure
  // ======================================================
  function detectAFALineStructure(lines = []) {
    const afaEntries = [];

    const afaStartRegex = /\bafa\s*\(\s*[\d,.]+\s*kwh/i;

    const effectiveWordRegex = /\b(?:mulai|from)\b/i;

    const dateRegex = /\b\d{1,2}[./-]\d{1,2}[./-]\d{2,4}\b/i;

    // Only use the left billing-description column.
    // This prevents dates from the right information panel
    // from being included in AFA detection.
    const getLeftTableText = (line) => {
      if (!line || !Array.isArray(line.items)) {
        return "";
      }

      return normalizeDetectionText(
        line.items
          .filter((item) => item.x <= 340)
          .sort((a, b) => a.x - b.x)
          .map((item) => item.text)
          .join(" "),
      );
    };

    for (let index = 0; index < lines.length; index++) {
      const currentLine = lines[index];
      const currentLeftText = getLeftTableText(currentLine);

      // Must be an actual AFA billing row.
      if (!afaStartRegex.test(currentLeftText)) {
        continue;
      }

      if (!effectiveWordRegex.test(currentLeftText)) {
        continue;
      }

      // ==================================================
      // One-line AFA
      // ==================================================
      if (dateRegex.test(currentLeftText)) {
        afaEntries.push({
          lineCount: 1,
          text: currentLeftText,
          normalizedText: currentLeftText,
          yStart: currentLine.y,
          yEnd: currentLine.y,
        });

        continue;
      }

      // ==================================================
      // Two-line AFA
      // ==================================================
      const nextLine = lines[index + 1];
      const nextLeftText = getLeftTableText(nextLine);

      if (nextLine && dateRegex.test(nextLeftText)) {
        const combinedText = normalizeDetectionText(
          `${currentLeftText} ${nextLeftText}`,
        );

        afaEntries.push({
          lineCount: 2,
          text: combinedText,
          normalizedText: combinedText,
          yStart: currentLine.y,
          yEnd: nextLine.y,
        });

        index++;
        continue;
      }

      // Sometimes PDF.js inserts another left-side line
      // between the AFA description and its date.
      const secondNextLine = lines[index + 2];
      const secondNextLeftText = getLeftTableText(secondNextLine);

      if (secondNextLine && dateRegex.test(secondNextLeftText)) {
        const combinedText = normalizeDetectionText(
          `${currentLeftText} ${nextLeftText} ${secondNextLeftText}`,
        );

        afaEntries.push({
          lineCount: 2,
          text: combinedText,
          normalizedText: combinedText,
          yStart: currentLine.y,
          yEnd: secondNextLine.y,
        });

        index += 2;
        continue;
      }

      afaEntries.push({
        lineCount: 0,
        text: currentLeftText,
        normalizedText: currentLeftText,
        yStart: currentLine.y,
        yEnd: currentLine.y,
      });
    }

    return afaEntries;
  }

  // ======================================================
  // Helper: detect Energy Efficiency Incentive line layout
  // ======================================================
  function detectIncentiveLineStructure(lines = []) {
    const incentiveEntries = [];

    const incentiveStartRegex =
      /\b(?:energy\s*efficiency\s*incentive|efficient\s*energy\s*incentive)\b/i;

    const incentiveCompleteRegex =
      /\b(?:energy\s*efficiency\s*incentive|efficient\s*energy\s*incentive)\b[\s\S]*?\/?\s*kwh\s*\)?/i;

    // Only inspect the left billing table.
    const getLeftTableText = (line) => {
      if (!line || !Array.isArray(line.items)) {
        return "";
      }

      return normalizeDetectionText(
        line.items
          .filter((item) => item.x <= 340)
          .sort((a, b) => a.x - b.x)
          .map((item) => item.text)
          .join(" "),
      );
    };

    for (let index = 0; index < lines.length; index++) {
      const currentLine = lines[index];
      const currentLeftText = getLeftTableText(currentLine);

      if (!incentiveStartRegex.test(currentLeftText)) {
        continue;
      }

      // Complete incentive description on one visual line
      if (incentiveCompleteRegex.test(currentLeftText)) {
        incentiveEntries.push({
          lineCount: 1,
          text: currentLeftText,
          normalizedText: currentLeftText,
          yStart: currentLine.y,
          yEnd: currentLine.y,
        });

        continue;
      }

      // Incentive description continues onto next line
      const nextLine = lines[index + 1];
      const nextLeftText = getLeftTableText(nextLine);

      if (nextLine) {
        const combinedText = normalizeDetectionText(
          `${currentLeftText} ${nextLeftText}`,
        );

        if (incentiveCompleteRegex.test(combinedText)) {
          incentiveEntries.push({
            lineCount: 2,
            text: combinedText,
            normalizedText: combinedText,
            yStart: currentLine.y,
            yEnd: nextLine.y,
          });

          index++;
          continue;
        }
      }

      incentiveEntries.push({
        lineCount: 0,
        text: currentLeftText,
        normalizedText: currentLeftText,
        yStart: currentLine.y,
        yEnd: currentLine.y,
      });
    }

    return incentiveEntries;
  }

  // ======================================================
  // Extract every page once
  // ======================================================
  const pageTexts = [];
  const pageLines = [];
  const allPageContents = [];

  let text = "";

  for (let i = 1; i <= totalPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    allPageContents.push(content);

    const lines = buildPdfLines(content);
    pageLines.push(lines);

    const pageText = normalizeDetectionText(
      content.items.map((item) => item.str).join(" "),
    );

    pageTexts.push(pageText);

    text += ` ${pageText}`;
  }

  // ======================================================
  // Normalize full-document detection text
  // ======================================================
  text = text
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .replace(/[\u00A0\u1680\u180E\u2000-\u200D\u202F\u205F\u3000]/g, "")
    .replace(
      /sur[\s\u00A0\u2000-\u3000-]*caj[\s\u00A0\u2000-\u3000-]*angkadar[\s\u00A0\u2000-\u3000-]*kuasa/gi,
      "surcajangkadarkuasa",
    )
    .replace(
      /surcharge[\s\u00A0\u2000-\u3000-]*power[\s\u00A0\u2000-\u3000-]*factor/gi,
      "surcajangkadarkuasa",
    )
    .replace(/angkadar[\s\u00A0\u2000-\u3000-]*kuasa/gi, "angkadarkuasa")
    .replace(/power[\s\u00A0\u2000-\u3000-]*factor/gi, "powerfactor")
    .replace(/service[\s\u00A0\u2000-\u3000-]*tax/gi, "servicetax")
    .replace(
      /(energy[\s\u00A0\u2000-\u3000-]*efficiency[\s\u00A0\u2000-\u3000-]*incentive|efficient[\s\u00A0\u2000-\u3000-]*energy[\s\u00A0\u2000-\u3000-]*incentive|insentif[\s\u00A0\u2000-\u3000-]*cekap[\s\u00A0\u2000-\u3000-]*tenaga)/gi,
      "insentifcekaptenaga",
    )
    .replace(/diliputi[\s\u00A0\u2000-\u3000-]*cagaran/gi, "diliputicagaran")
    .replace(
      /(kumpulan[\s\u00A0\u2000-\u3000-]*wang[\s\u00A0\u2000-\u3000-]*tenaga[\s\u00A0\u2000-\u3000-]*boleh[\s\u00A0\u2000-\u3000-]*baharu|kwtbb|re[\s\u00A0\u2000-\u3000-]*fund|renewable[\s\u00A0\u2000-\u3000-]*energy[\s\u00A0\u2000-\u3000-]*fund)/gi,
      "kwtbb",
    )
    .replace(
      /jumlah[\s\u00A0\u2000-\u3000\-]*\(?a\)?[\s:]*tarif[\s\u00A0\u2000-\u3000\-]*lama/gi,
      "jumlahA_tariflama",
    )
    .replace(
      /jumlah[\s\u00A0\u2000-\u3000\-]*\(?b\)?[\s:]*tarif[\s\u00A0\u2000-\u3000\-]*baharu/gi,
      "jumlahB_tarifbaharu",
    )
    .replace(/jumlah[\s\u00A0\u2000-\u3000\-]*\(?a\)?[\s:;,.]*/gi, "jumlahA")
    .replace(/jumlah[\s\u00A0\u2000-\u3000\-]*\(?b\)?[\s:;,.]*/gi, "jumlahB")
    .replace(
      /(late[\s\u00A0\u2000-\u3000-]*payment[\s\u00A0\u2000-\u3000-]*surcharge|surcaj[\s\u00A0\u2000-\u3000-]*lewat[\s\u00A0\u2000-\u3000-]*bayar)/gi,
      "surcajlewatbayar",
    )
    .replace(
      /notis[\s\u00A0\u2000-\u3000-]*pemotongan[\s\u00A0\u2000-\u3000-]*bekalan[\s\u00A0\u2000-\u3000-]*elektrik/gi,
      "notispemotongan",
    )
    .replace(
      /pelarasan[\s\u00A0\u2000-\u3000\-]*penggenapan/gi,
      "pelarasanpenggenapan",
    )
    .replace(
      /jumlah[\s\u00A0\u2000-\u3000\-]*anggaran[\s\u00A0\u2000-\u3000\-]*bil[\s\u00A0\u2000-\u3000\-]*terdahulu/gi,
      "jumlahanggaranbil",
    )

    // Important:
    // Normalize "Penggunaan Luar Puncak" before "Penggunaan Puncak"
    .replace(
      /penggunaan[\s\u00A0\u2000-\u3000\-]*luar[\s\u00A0\u2000-\u3000\-]*puncak/gi,
      "penggunaanluarpuncak",
    )
    .replace(/penggunaan[\s\u00A0\u2000-\u3000\-]*puncak/gi, "penggunaanpuncak")
    .replace(/peak[\s\u00A0\u2000-\u3000\-]*usage/gi, "peakusage")
    .replace(
      /off[\s\u00A0\u2000-\u3000\-]*peak[\s\u00A0\u2000-\u3000\-]*usage/gi,
      "offpeakusage",
    )
    .replace(/faktor[\s\u00A0\u2000-\u3000\-]*prorata/gi, "faktorprorata")
    .replace(
      /permintaan[\s\u00A0\u2000-\u3000-]*maksima/gi,
      "permintaanmaksima",
    )
    .replace(/maximum[\s\u00A0\u2000-\u3000-]*demand/gi, "maximumdemand");

  // ======================================================
  // Page 2 detection preparation
  // ======================================================
  const page2Text = normalizeDetectionText(pageTexts[1] || "");
  const page2LineObjects = pageLines[1] || [];

  // ======================================================
  // Existing page 2 detection flags
  // ======================================================
  const hasPelarasanPenggenapan_Page2 = /\bpelarasan\s*penggenapan\b/i.test(
    page2Text,
  );

  const hasJumlahAnggaranBil_Page2 =
    /\bjumlah\s*anggaran\s*bil\s*terdahulu\b/i.test(page2Text);

  // ======================================================
  // New ANGSNA page 2 detection flags
  // ======================================================
  const hasPenggunaanPuncak_Page2 = /\bpenggunaan\s*puncak\b/i.test(page2Text);

  const hasPenggunaanLuarPuncak_Page2 = /\bpenggunaan\s*luar\s*puncak\b/i.test(
    page2Text,
  );

  const hasPermintaanMaksima_Page2 = /\bpermintaan\s*maksima\b/i.test(
    page2Text,
  );

  const hasServiceTax_Page2 =
    /\bservice\s*tax\s*\(\s*8\s*%\s*\)/i.test(page2Text) ||
    /\bcukai\s*perkhidmatan\s*\(\s*8\s*%\s*\)/i.test(page2Text);

  const hasInsentifCekapTenaga_Page2 = /\binsentif\s*cekap\s*tenaga\b/i.test(
    page2Text,
  );

  const hasEnergyEfficiencyIncentive_Page2 =
    /\benergy\s*efficiency\s*incentive\b/i.test(page2Text) ||
    /\befficient\s*energy\s*incentive\b/i.test(page2Text);

  const hasKWTBB_Page2 =
    /\bkwtbb\b/i.test(page2Text) ||
    /\bre\s*fund\b/i.test(page2Text) ||
    /\brenewable\s*energy\s*fund\b/i.test(page2Text) ||
    /\bkumpulan\s*wang\s*tenaga\s*boleh\s*baharu\b/i.test(page2Text);

  // English equivalents for later templates
  const hasPeakUsage_Page2 = /\bpeak\s*usage\b/i.test(page2Text);

  const hasOffPeakUsage_Page2 = /\boff[\s-]*peak\s*usage\b/i.test(page2Text);

  const hasMaximumDemand_Page2 = /\bmaximum\s*demand\b/i.test(page2Text);

  const hasPelarasanPenggenapan = hasPelarasanPenggenapan_Page2;

  const hasJumlahAnggaranBil = hasJumlahAnggaranBil_Page2;

  const hasPermintaanMaksima = hasPermintaanMaksima_Page2;

  // ======================================================
  // Detect actual AFA charge rows on page 2
  // ======================================================
  const page2AFALineEntries = detectAFALineStructure(page2LineObjects);

  const page2AFACount = page2AFALineEntries.length;

  const hasAFAOnPage2 = page2AFACount >= 1;

  const has1AFAOnPage2 = page2AFACount === 1;

  const has2AFAOnPage2 = page2AFACount === 2;

  const hasMoreThan2AFAOnPage2 = page2AFACount > 2;

  // ======================================================
  // Detect AFA visual line types
  // ======================================================
  const hasAFA1Line = page2AFALineEntries.some(
    (entry) => entry.lineCount === 1,
  );

  const hasAFA2Line = page2AFALineEntries.some(
    (entry) => entry.lineCount === 2,
  );

  const hasUnknownAFALine = page2AFALineEntries.some(
    (entry) => entry.lineCount === 0,
  );

  const allAFAAre1Line =
    page2AFALineEntries.length > 0 &&
    page2AFALineEntries.every((entry) => entry.lineCount === 1);

  const allAFAAre2Line =
    page2AFALineEntries.length > 0 &&
    page2AFALineEntries.every((entry) => entry.lineCount === 2);

  const hasMixedAFALines = hasAFA1Line && hasAFA2Line;

  const has2AFAOneLineOnPage2 =
    has2AFAOnPage2 && allAFAAre1Line && !hasAFA2Line && !hasUnknownAFALine;

  // ======================================================
  // Detect incentive visual-line structure
  // ======================================================
  const page2IncentiveLineEntries =
    detectIncentiveLineStructure(page2LineObjects);

  const page2IncentiveCount = page2IncentiveLineEntries.length;

  const hasIncentiveOnPage2 = page2IncentiveCount >= 1;

  const hasIncentive1Line_Page2 = page2IncentiveLineEntries.some(
    (entry) => entry.lineCount === 1,
  );

  const hasIncentive2Line_Page2 = page2IncentiveLineEntries.some(
    (entry) => entry.lineCount === 2,
  );

  const hasUnknownIncentiveLine_Page2 = page2IncentiveLineEntries.some(
    (entry) => entry.lineCount === 0,
  );

  const allIncentivesAre2Line_Page2 =
    page2IncentiveLineEntries.length > 0 &&
    page2IncentiveLineEntries.every((entry) => entry.lineCount === 2);

  const firstAFAEntry = page2AFALineEntries[0] || null;
  const secondAFAEntry = page2AFALineEntries[1] || null;

  const firstAFAIs1Line = firstAFAEntry?.lineCount === 1;

  const firstAFAIs2Line = firstAFAEntry?.lineCount === 2;

  const secondAFAIs1Line = secondAFAEntry?.lineCount === 1;

  const secondAFAIs2Line = secondAFAEntry?.lineCount === 2;

  const firstAFA1LineSecondAFA2Line =
    has2AFAOnPage2 && firstAFAIs1Line && secondAFAIs2Line;

  const firstAFA2LineSecondAFA1Line =
    has2AFAOnPage2 && firstAFAIs2Line && secondAFAIs1Line;

  // ======================================================
  // Detect AFA kWh values
  //
  // Existing legacy detection:
  // Blue  = AFA kWh > 0
  // Black = AFA kWh = 0
  // ======================================================
  const afaBlocks = [...text.matchAll(/afa\s*\(\s*([\d,.]+)\s*kwh/gi)];

  let hasAFABlue = false;
  let hasAFABlack = false;

  for (const match of afaBlocks) {
    const kwhValue = parseFloat(match[1].replace(/,/g, ""));

    if (!Number.isNaN(kwhValue)) {
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

  // ======================================================
  // General document detection flags
  // ======================================================
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
    /a[\s\u00A0\u2000-\u3000-]*f[\s\u00A0\u2000-\u3000-]*a[\s\S]{0,40}(mulai|from)/i.test(
      text,
    );

  const has2AFA = afaMatches.length >= 2;

  const hasInsentif =
    /\binsentifcekaptenaga\b/.test(text) ||
    /\binsentif[\s\S]{0,10}cekap[\s\S]{0,10}tenaga\b/.test(text) ||
    /\benergy[\s\S]{0,15}efficiency[\s\S]{0,15}incentive\b/.test(text) ||
    /\befficient[\s\S]{0,15}energy[\s\S]{0,15}incentive\b/.test(text);

  const hasCagaran = /\bdiliputicagaran\b/.test(text);

  const hasJumlahA = /\bjumlahA(?:_tariflama)?\b/.test(text);

  const hasJumlahB = /\bjumlahB(?:_tarifbaharu)?\b/.test(text);

  const hasSurcajLewatBayar = /\bsurcajlewatbayar\b/.test(text);

  const hasNotisPemotongan = /\bnotispemotongan\b/.test(text);

  const hasPenggunaanPuncak =
    hasPenggunaanPuncak_Page2 || /\bpenggunaanpuncak\b/.test(text);

  const hasPenggunaanLuarPuncak =
    hasPenggunaanLuarPuncak_Page2 || /\bpenggunaanluarpuncak\b/.test(text);

  const hasPeakUsage = hasPeakUsage_Page2 || /\bpeakusage\b/.test(text);

  const hasOffPeakUsage =
    hasOffPeakUsage_Page2 || /\boffpeakusage\b/.test(text);

  const hasMaximumDemand =
    hasMaximumDemand_Page2 || /\bmaximumdemand\b/.test(text);

  const hasFaktorProrata = /\bfaktorprorata\b/.test(text);

  const hasEnergyEfficiencyIncentive = /\binsentifcekaptenaga\b/.test(text);

  const hasLatePaymentSurcharge = /\bsurcajlewatbayar\b/.test(text);

  const is2AFABlack_AK_KWTBB_PenggunaanPuncak_Maksima =
    hasAngkadar &&
    hasKWTBB &&
    hasPenggunaanPuncak_Page2 &&
    hasPenggunaanLuarPuncak_Page2 &&
    hasPermintaanMaksima_Page2 &&
    has2AFAOnPage2 &&
    allAFAAre1Line &&
    !hasAFA2Line &&
    !hasServiceTax &&
    !hasInsentif &&
    !hasPowerFactor;

  const is2AFABlack_2Line_AK_KWTBB_PenggunaanPuncak_Maksima =
    hasAngkadar &&
    hasKWTBB &&
    hasPenggunaanPuncak_Page2 &&
    hasPenggunaanLuarPuncak_Page2 &&
    hasPermintaanMaksima_Page2 &&
    has2AFAOnPage2 &&
    allAFAAre2Line &&
    hasAFA2Line &&
    !hasAFA1Line &&
    !hasMixedAFALines &&
    !hasUnknownAFALine &&
    !hasServiceTax &&
    !hasInsentif &&
    !hasPowerFactor;

  const is2AFABlack_1Line_2Line_AK_KWTBB_PenggunaanPuncak_Maksima =
    hasAngkadar &&
    hasKWTBB &&
    hasPenggunaanPuncak_Page2 &&
    hasPenggunaanLuarPuncak_Page2 &&
    hasPermintaanMaksima_Page2 &&
    has2AFAOnPage2 &&
    firstAFA1LineSecondAFA2Line &&
    hasMixedAFALines &&
    !hasUnknownAFALine &&
    !hasServiceTax &&
    !hasInsentif &&
    !hasPowerFactor;

  const is2AFABlack_ServiceTax_Insentif_KWTBB =
    has2AFAOneLineOnPage2 &&
    hasServiceTax_Page2 &&
    hasInsentifCekapTenaga_Page2 &&
    hasKWTBB_Page2 &&
    !hasAngkadar &&
    !hasPowerFactor;

  const is2AFABlack_AK_KWTBB =
    hasAngkadar &&
    hasKWTBB_Page2 &&
    has2AFAOnPage2 &&
    allAFAAre1Line &&
    !hasAFA2Line &&
    !hasUnknownAFALine &&
    !hasPenggunaanPuncak_Page2 &&
    !hasPenggunaanLuarPuncak_Page2 &&
    !hasPermintaanMaksima_Page2 &&
    !hasServiceTax_Page2 &&
    !hasInsentifCekapTenaga_Page2 &&
    !hasPowerFactor;

  const is2AFABlack_1Line_2Line_AK_KWTBB =
    hasAngkadar &&
    hasKWTBB_Page2 &&
    has2AFAOnPage2 &&
    firstAFA1LineSecondAFA2Line &&
    hasMixedAFALines &&
    !hasUnknownAFALine &&
    !hasPenggunaanPuncak_Page2 &&
    !hasPenggunaanLuarPuncak_Page2 &&
    !hasPermintaanMaksima_Page2 &&
    !hasServiceTax_Page2 &&
    !hasInsentifCekapTenaga_Page2 &&
    !hasPowerFactor;

  const is2AFABlack_AK_KWTBB_Insentif =
    hasAngkadar &&
    hasKWTBB_Page2 &&
    hasInsentifCekapTenaga_Page2 &&
    has2AFAOnPage2 &&
    allAFAAre1Line &&
    !hasAFA2Line &&
    !hasUnknownAFALine &&
    !hasServiceTax_Page2 &&
    !hasPenggunaanPuncak_Page2 &&
    !hasPenggunaanLuarPuncak_Page2 &&
    !hasPermintaanMaksima_Page2 &&
    !hasPowerFactor;

  const is2AFABlack_PowerFactor_Incentive_2Line_KWTBB =
    hasPowerFactor &&
    hasKWTBB_Page2 &&
    has2AFAOnPage2 &&
    allAFAAre1Line &&
    !hasAFA2Line &&
    !hasUnknownAFALine &&
    hasEnergyEfficiencyIncentive_Page2 &&
    hasIncentive2Line_Page2 &&
    allIncentivesAre2Line_Page2 &&
    !hasUnknownIncentiveLine_Page2 &&
    !hasPeakUsage_Page2 &&
    !hasOffPeakUsage_Page2 &&
    !hasMaximumDemand_Page2 &&
    !hasAngkadar;

  const is2AFABlack_1Line_2Line_PowerFactor_KWTBB_PeakUsage_MaxDemand =
    hasPowerFactor &&
    hasKWTBB_Page2 &&
    hasPeakUsage_Page2 &&
    hasOffPeakUsage_Page2 &&
    hasMaximumDemand_Page2 &&
    has2AFAOnPage2 &&
    firstAFA1LineSecondAFA2Line &&
    hasMixedAFALines &&
    !hasUnknownAFALine &&
    !hasEnergyEfficiencyIncentive_Page2 &&
    !hasServiceTax_Page2 &&
    !hasAngkadar;

  const is2AFABlack_2Line_PowerFactor_KWTBB_PeakUsage_MaxDemand =
    hasPowerFactor &&
    hasKWTBB_Page2 &&
    hasPeakUsage_Page2 &&
    hasOffPeakUsage_Page2 &&
    hasMaximumDemand_Page2 &&
    has2AFAOnPage2 &&
    allAFAAre2Line &&
    hasAFA2Line &&
    !hasAFA1Line &&
    !hasMixedAFALines &&
    !hasUnknownAFALine &&
    !hasEnergyEfficiencyIncentive_Page2 &&
    !hasServiceTax_Page2 &&
    !hasAngkadar;

  const is2AFABlack_PowerFactor_KWTBB =
    hasPowerFactor &&
    hasKWTBB_Page2 &&
    has2AFAOnPage2 &&
    allAFAAre1Line &&
    !hasAFA2Line &&
    !hasUnknownAFALine &&
    !hasPeakUsage_Page2 &&
    !hasOffPeakUsage_Page2 &&
    !hasMaximumDemand_Page2 &&
    !hasEnergyEfficiencyIncentive_Page2 &&
    !hasServiceTax_Page2 &&
    !hasAngkadar;

  const is2AFABlack_PowerFactor_KWTBB_PeakUsage_MaxDemand =
    hasPowerFactor &&
    hasKWTBB_Page2 &&
    hasPeakUsage_Page2 &&
    hasOffPeakUsage_Page2 &&
    hasMaximumDemand_Page2 &&
    has2AFAOnPage2 &&
    allAFAAre1Line &&
    !hasAFA2Line &&
    !hasUnknownAFALine &&
    !hasEnergyEfficiencyIncentive_Page2 &&
    !hasServiceTax_Page2 &&
    !hasAngkadar;

  const is2AFABlack_2Line_1Line_AK_KWTBB_PenggunaanPuncak_Maksima =
    hasAngkadar &&
    hasKWTBB_Page2 &&
    hasPenggunaanPuncak_Page2 &&
    hasPenggunaanLuarPuncak_Page2 &&
    hasPermintaanMaksima_Page2 &&
    has2AFAOnPage2 &&
    firstAFA2LineSecondAFA1Line &&
    hasMixedAFALines &&
    !hasUnknownAFALine &&
    !hasServiceTax_Page2 &&
    !hasInsentifCekapTenaga_Page2 &&
    !hasPowerFactor;

  const is2AFABlack_2Line_1Line_AK_KWTBB =
    hasAngkadar &&
    hasKWTBB_Page2 &&
    has2AFAOnPage2 &&
    firstAFA2LineSecondAFA1Line &&
    hasMixedAFALines &&
    !hasUnknownAFALine &&
    !hasPenggunaanPuncak_Page2 &&
    !hasPenggunaanLuarPuncak_Page2 &&
    !hasPermintaanMaksima_Page2 &&
    !hasServiceTax_Page2 &&
    !hasInsentifCekapTenaga_Page2 &&
    !hasPowerFactor;

  const is1AFABlack_2Line_AK_KWTBB_PenggunaanPuncak_Maksima =
    hasAngkadar &&
    hasKWTBB_Page2 &&
    hasPenggunaanPuncak_Page2 &&
    hasPenggunaanLuarPuncak_Page2 &&
    hasPermintaanMaksima_Page2 &&
    has1AFAOnPage2 &&
    allAFAAre2Line &&
    hasAFA2Line &&
    !hasAFA1Line &&
    !hasUnknownAFALine &&
    !hasServiceTax_Page2 &&
    !hasInsentifCekapTenaga_Page2 &&
    !hasPowerFactor;

  const is2AFABlack_KWTBB_CukaiPerkhidmatan =
    hasKWTBB_Page2 &&
    has2AFAOnPage2 &&
    allAFAAre1Line &&
    hasAFA1Line &&
    !hasAFA2Line &&
    !hasUnknownAFALine &&
    hasServiceTax_Page2 &&
    !hasInsentifCekapTenaga_Page2 &&
    !hasEnergyEfficiencyIncentive_Page2 &&
    !hasAngkadar &&
    !hasPowerFactor;

  const is2AFABlack_2Line_1Line_PowerFactor_KWTBB_PeakUsage_MaxDemand =
    hasPowerFactor &&
    hasKWTBB_Page2 &&
    hasPeakUsage_Page2 &&
    hasOffPeakUsage_Page2 &&
    hasMaximumDemand_Page2 &&
    has2AFAOnPage2 &&
    firstAFA2LineSecondAFA1Line &&
    hasMixedAFALines &&
    !hasUnknownAFALine &&
    !hasEnergyEfficiencyIncentive_Page2 &&
    !hasServiceTax_Page2 &&
    !hasAngkadar;

  // --- Select boxes based on flags ---
  let selectedBoxes = [];
  let conditionUsed = "";

  const CONDITION_2AFA_BLACK_AK_KWTBB_PUNCAK_MAKSIMA =
    "2 AFA Black + Angkadar Kuasa + KWTBB " +
    "(Penggunaan Puncak + Permintaan Maksima, AFA 1 Line)";

  const CONDITION_2AFA_BLACK_2LINE_AK_KWTBB_PUNCAK_MAKSIMA =
    "2 AFA Black + Angkadar Kuasa + KWTBB " +
    "(Penggunaan Puncak + Permintaan Maksima, Both AFA 2 Line)";

  const CONDITION_2AFA_BLACK_1LINE_2LINE_AK_KWTBB_PUNCAK_MAKSIMA =
    "2 AFA Black + Angkadar Kuasa + KWTBB " +
    "(Penggunaan Puncak + Permintaan Maksima, First AFA 1 Line + Second AFA 2 Line)";

  const CONDITION_2AFA_BLACK_SERVICE_TAX_INSENTIF_KWTBB =
    "2 AFA Black + Service Tax + Insentif + KWTBB";

  const CONDITION_2AFA_BLACK_AK_KWTBB = "2 AFA Black + Angkadar Kuasa + KWTBB";

  const CONDITION_2AFA_BLACK_1LINE_2LINE_AK_KWTBB =
    "2 AFA Black + First AFA 1 Line + Second AFA 2 Line + Angkadar Kuasa + KWTBB";

  const CONDITION_2AFA_BLACK_AK_KWTBB_INSENTIF =
    "2 AFA Black + Angkadar Kuasa + KWTBB + Insentif";

  const CONDITION_2AFA_BLACK_POWER_FACTOR_INCENTIVE_2LINE_KWTBB =
    "2 AFA Black + Power Factor + Energy Efficiency Incentive 2 Line + KWTBB";

  const CONDITION_2AFA_BLACK_1LINE_2LINE_POWER_FACTOR_KWTBB_PEAK_MAX =
    "2 AFA Black + First AFA 1 Line + Second AFA 2 Line + " +
    "Power Factor + KWTBB + Peak Usage + Maximum Demand";

  const CONDITION_2AFA_BLACK_2LINE_POWER_FACTOR_KWTBB_PEAK_MAX =
    "2 AFA Black + Both AFA 2 Line + " +
    "Power Factor + KWTBB + Peak Usage + Maximum Demand";

  const CONDITION_2AFA_BLACK_POWER_FACTOR_KWTBB =
    "2 AFA Black + Power Factor + KWTBB";

  const CONDITION_2AFA_BLACK_POWER_FACTOR_KWTBB_PEAK_MAX =
    "2 AFA Black + Power Factor + KWTBB + Peak Usage + Maximum Demand";

  const CONDITION_2AFA_BLACK_2LINE_1LINE_AK_KWTBB_PUNCAK_MAKSIMA =
    "2 AFA Black + First AFA 2 Line + Second AFA 1 Line + " +
    "Angkadar Kuasa + KWTBB + Penggunaan Puncak + Permintaan Maksima";

  const CONDITION_2AFA_BLACK_2LINE_1LINE_AK_KWTBB =
    "2 AFA Black + First AFA 2 Line + Second AFA 1 Line + Angkadar Kuasa + KWTBB";

  const CONDITION_1AFA_BLACK_2LINE_AK_KWTBB_PUNCAK_MAKSIMA =
    "1 AFA Black + AFA 2 Line + Angkadar Kuasa + KWTBB + Penggunaan Puncak + Permintaan Maksima";

  const CONDITION_2AFA_BLACK_KWTBB_CUKAI_PERKHIDMATAN =
    "2AFA Black + KWTBB + Cukai Perkhidmatan";

  const CONDITION_2AFA_BLACK_2LINE_1LINE_POWER_FACTOR_KWTBB_PEAK_MAX =
    "2 AFA Black + First AFA 2 Line + Second AFA 1 Line + " +
    "Power Factor + KWTBB + Peak Usage + Maximum Demand";

  switch (true) {
    // ======================================================
    // 2 AFA + Service Tax + Insentif + KWTBB
    // ======================================================
    case is2AFABlack_ServiceTax_Insentif_KWTBB:
      selectedBoxes = boxes_2AFABlack_ServiceTax_Insentif_KWTBB;
      conditionUsed = CONDITION_2AFA_BLACK_SERVICE_TAX_INSENTIF_KWTBB;
      break;

    // ======================================================
    // 2 AFA + Power Factor + 2-line Incentive + KWTBB
    // ======================================================
    case is2AFABlack_PowerFactor_Incentive_2Line_KWTBB:
      selectedBoxes = boxes_2AFABlack_PowerFactor_Incentive_2Line_KWTBB;
      conditionUsed = CONDITION_2AFA_BLACK_POWER_FACTOR_INCENTIVE_2LINE_KWTBB;
      break;

    // ======================================================
    // First AFA 1 line, second AFA 2 lines
    // Power Factor + Peak Usage + Maximum Demand
    // ======================================================
    case is2AFABlack_1Line_2Line_PowerFactor_KWTBB_PeakUsage_MaxDemand:
      selectedBoxes =
        boxes_2AFABlack_1Line_2Line_PowerFactor_KWTBB_PeakUsage_MaxDemand;
      conditionUsed =
        CONDITION_2AFA_BLACK_1LINE_2LINE_POWER_FACTOR_KWTBB_PEAK_MAX;
      break;

    // ======================================================
    // First AFA 2 line, second AFA 1 lines
    // Power Factor + Peak Usage + Maximum Demand
    // ======================================================
    case is2AFABlack_2Line_1Line_PowerFactor_KWTBB_PeakUsage_MaxDemand:
      selectedBoxes =
        boxes_2AFABlack_2Line_1Line_PowerFactor_KWTBB_PeakUsage_MaxDemand;
      conditionUsed =
        CONDITION_2AFA_BLACK_2LINE_1LINE_POWER_FACTOR_KWTBB_PEAK_MAX;
      break;

    // ======================================================
    // Both AFA entries are 1 line
    // Power Factor + Peak Usage + Maximum Demand
    // ======================================================
    case is2AFABlack_PowerFactor_KWTBB_PeakUsage_MaxDemand:
      selectedBoxes = boxes_2AFABlack_PowerFactor_KWTBB_PeakUsage_MaxDemand;
      conditionUsed = CONDITION_2AFA_BLACK_POWER_FACTOR_KWTBB_PEAK_MAX;
      break;

    // =====================================================
    // 2AFA + Power Factor + KWTBB
    // ======================================================
    case is2AFABlack_PowerFactor_KWTBB:
      selectedBoxes = boxes_2AFABlack_PowerFactor_KWTBB;
      conditionUsed = CONDITION_2AFA_BLACK_POWER_FACTOR_KWTBB;
      break;

    // ======================================================
    // Both AFA entries are 2 lines
    // Power Factor + Peak Usage + Maximum Demand
    // ======================================================
    case is2AFABlack_2Line_PowerFactor_KWTBB_PeakUsage_MaxDemand:
      selectedBoxes =
        boxes_2AFABlack_2Line_PowerFactor_KWTBB_PeakUsage_MaxDemand;
      conditionUsed = CONDITION_2AFA_BLACK_2LINE_POWER_FACTOR_KWTBB_PEAK_MAX;
      break;

    // ======================================================
    // 2 AFA + Angkadar Kuasa + KWTBB + Insentif
    // ======================================================
    case is2AFABlack_AK_KWTBB_Insentif:
      selectedBoxes = boxes_2AFABlack_AK_KWTBB_Insentif;
      conditionUsed = CONDITION_2AFA_BLACK_AK_KWTBB_INSENTIF;
      break;

    // ======================================================
    // First AFA 2 lines, second AFA 1 line
    // ======================================================
    case is2AFABlack_2Line_1Line_AK_KWTBB_PenggunaanPuncak_Maksima:
      selectedBoxes =
        boxes_2AFABlack_2Line_1Line_AK_KWTBB_PenggunaanPuncak_Maksima;
      conditionUsed = CONDITION_2AFA_BLACK_2LINE_1LINE_AK_KWTBB_PUNCAK_MAKSIMA;
      break;

    // ======================================================
    // First AFA 1 line, second AFA 2 lines
    // ======================================================
    case is2AFABlack_1Line_2Line_AK_KWTBB_PenggunaanPuncak_Maksima:
      selectedBoxes =
        boxes_2AFABlack_1Line_2Line_AK_KWTBB_PenggunaanPuncak_Maksima;
      conditionUsed = CONDITION_2AFA_BLACK_1LINE_2LINE_AK_KWTBB_PUNCAK_MAKSIMA;
      break;

    // ======================================================
    // Both AFA rows are 2 lines
    // ======================================================
    case is2AFABlack_2Line_AK_KWTBB_PenggunaanPuncak_Maksima:
      selectedBoxes = boxes_2AFABlack_2Line_AK_KWTBB_PenggunaanPuncak_Maksima;
      conditionUsed = CONDITION_2AFA_BLACK_2LINE_AK_KWTBB_PUNCAK_MAKSIMA;
      break;

    // ======================================================
    // Both AFA rows are 1 line
    // ======================================================
    case is2AFABlack_AK_KWTBB_PenggunaanPuncak_Maksima:
      selectedBoxes = boxes_2AFABlack_AK_KWTBB_PenggunaanPuncak_Maksima;
      conditionUsed = CONDITION_2AFA_BLACK_AK_KWTBB_PUNCAK_MAKSIMA;
      break;

    // ======================================================
    // 1AFA 2 Line
    // ======================================================
    case is1AFABlack_2Line_AK_KWTBB_PenggunaanPuncak_Maksima:
      selectedBoxes = boxes_1AFABlack_2Line_AK_KWTBB_PenggunaanPuncak_Maksima;
      conditionUsed = CONDITION_1AFA_BLACK_2LINE_AK_KWTBB_PUNCAK_MAKSIMA;
      break;

    // ======================================================
    // First 2 line + second 1 line, NO Puncak/Maksima
    // ======================================================
    case is2AFABlack_2Line_1Line_AK_KWTBB:
      selectedBoxes = boxes_2AFABlack_2Line_1Line_AK_KWTBB;
      conditionUsed = CONDITION_2AFA_BLACK_2LINE_1LINE_AK_KWTBB;
      break;

    // ======================================================
    // First AFA 1 line, second AFA 2 lines
    // ======================================================
    case is2AFABlack_1Line_2Line_AK_KWTBB:
      selectedBoxes = boxes_2AFABlack_1Line_2Line_AK_KWTBB;
      conditionUsed = CONDITION_2AFA_BLACK_1LINE_2LINE_AK_KWTBB;
      break;

    // ======================================================
    // 2 AFA + Angkadar Kuasa + KWTBB
    // ======================================================
    case is2AFABlack_AK_KWTBB:
      selectedBoxes = boxes_2AFABlack_AK_KWTBB;
      conditionUsed = CONDITION_2AFA_BLACK_AK_KWTBB;
      break;

    // ======================================================
    // Existing generic Malay condition
    // ======================================================
    case hasKWTBB && hasAngkadar:
      if (hasMultipleAFA) {
        // Dual AFA (2 AFA)
        if (hasAFABlue) {
          if (
            hasJumlahAnggaranBil &&
            hasPelarasanPenggenapan &&
            hasFaktorProrata
          ) {
            selectedBoxes =
              boxes_AFADual_AK_KWTBB_BLUE_JumlahAnggaranBil_PG_Prorata;
            conditionUsed =
              "2 AFA + Angkadar Kuasa + KWTBB (Blue + Anggaran + Pelarasan + Prorata)";
          } else if (hasPelarasanPenggenapan) {
            if (hasInsentif) {
              selectedBoxes = boxes_AFADual_AK_KWTBB_BLUE_Insentif_PG;
              conditionUsed =
                "2 AFA + Angkadar Kuasa + KWTBB + Insentif (Blue + Pelarasan Penggenapan)";
            } else if (hasSurcaj) {
              selectedBoxes = boxes_AFADual_AK_KWTBB_BLUE_PG_Surcaj;
              conditionUsed = conditionUsed =
                "2 AFA + Angkadar Kuasa + KWTBB + Surcaj (Blue + Pelarasan Penggenapan)";
            } else {
              selectedBoxes = boxes_AFADual_AK_KWTBB_BLUE_PG;
              conditionUsed =
                "2 AFA + Angkadar Kuasa + KWTBB (Blue + Pelarasan Penggenapan)";
            }
          } else if (hasSurcaj) {
            selectedBoxes = boxes_AFADual_AK_KWTBB_BLUE_S;
            conditionUsed = "2 AFA + Angkadar Kuasa + KWTBB (Blue + Surcaj)";
          } else if (hasSurcajLewatBayar && hasInsentif) {
            selectedBoxes = boxes_AFADual_AK_KWTBB_Insentif_Surcaj;
            conditionUsed =
              "2 AFA + Angkadar Kuasa + KWTBB (Blue + Insentif + Surcaj Lewat Bayar)";
          } else if (hasSurcajLewatBayar && !hasInsentif) {
            selectedBoxes = boxes_AFADual_AK_KWTBB_Blue_Surcaj;
            conditionUsed =
              "2 AFA + Angkadar Kuasa + KWTBB (Blue + Surcaj Lewat Bayar)";
          } else if (hasInsentif && !hasSurcajLewatBayar) {
            selectedBoxes = boxes_AFADual_AK_KWTBB_BLUE_Insentif;
            conditionUsed = "2 AFA + Angkadar Kuasa + KWTBB (Blue + Insentif)";
          } else if (hasJumlahAnggaranBil) {
            selectedBoxes = boxes_AFADual_AK_KWTBB_BLUE_JumlahAnggaranBil;
            conditionUsed =
              "2 AFA + Angkadar Kuasa + KWTBB (Blue + Jumlah Anggaran Bil Terdahulu)";
          } else if (hasFaktorProrata) {
            selectedBoxes = boxes_AFADual_AK_KWTBB_BLUE_Prorata;
            conditionUsed = "2 AFA + Angkadar Kuasa + KWTBB (Blue + Prorata)";
          } else if (hasPenggunaanPuncak) {
            if (hasPermintaanMaksima) {
              selectedBoxes = boxes_AFADual_AK_KWTBB_BLUE_PUNCAK_MAKSIMA;
              conditionUsed =
                "2 AFA + Angkadar Kuasa + KWTBB (Blue + Penggunaan Puncak + Maksima)";
            } else {
              selectedBoxes = boxes_AFADual_AK_KWTBB_BLUE_PUNCAK;
              conditionUsed =
                "2 AFA + Angkadar Kuasa + KWTBB (Blue + Penggunaan Puncak)";
            }
          } else {
            selectedBoxes = boxes_AFADual_AK_KWTBB_BLUE;
            conditionUsed = "2 AFA + Angkadar Kuasa + KWTBB (Blue)";
          }
        } else if (hasAFABlack) {
          selectedBoxes = boxes_AFADual_AK_KWTBB_BLACK;
          conditionUsed = "2 AFA + Angkadar Kuasa + KWTBB (Black)";
        } else {
          selectedBoxes = boxes_AFADual_AK_KWTBB_BLUE;
          conditionUsed = "2 AFA + Angkadar Kuasa + KWTBB";
        }
      } else {
        // Single AFA (1 AFA)
        if (hasAFABlue) {
          if (
            hasPenggunaanPuncak &&
            hasPermintaanMaksima &&
            !hasInsentif &&
            !hasSurcaj
          ) {
            selectedBoxes = boxes_AFA_AK_KWTBB_BLUE_PUNCAK_MAKSIMA;
            conditionUsed =
              "AFA + Angkadar Kuasa + KWTBB (Blue + Penggunaan Puncak + Permintaan Maksima)";
          } else if (
            hasPenggunaanPuncak &&
            !hasPermintaanMaksima &&
            !hasInsentif &&
            !hasSurcaj
          ) {
            selectedBoxes = boxes_AFA_AK_KWTBB_BLUE_PUNCAK;
            conditionUsed =
              "AFA + Angkadar Kuasa + KWTBB (Blue + Penggunaan Puncak)";
          } else if (hasInsentif && !hasPenggunaanPuncak && !hasSurcaj) {
            selectedBoxes = boxes_AFA_AK_KWTBB_BLUE_Insentif;
            conditionUsed = "AFA + Angkadar Kuasa + KWTBB (Blue + Insentif)";
          } else if (hasInsentif && hasPenggunaanPuncak && !hasSurcaj) {
            selectedBoxes = boxes_AFA_AK__KWTBB_BLUE_PUNCAK_Insentif;
            conditionUsed =
              "AFA + Angkadar Kuasa + KWTBB (Blue + Insentif + Penggunaan Puncak)";
          } else if (hasInsentif && hasPenggunaanPuncak && hasSurcaj) {
            selectedBoxes = boxes_AFA_AK_KWTBB_BLUE_PUNCAK_Insentif_S;
            conditionUsed =
              "AFA + Angkadar Kuasa + KWTBB (Blue + Insentif + Penggunaan Puncak + Surcaj)";
          } else if (!hasInsentif && !hasPenggunaanPuncak && hasSurcaj) {
            selectedBoxes = boxes_AFA_AK_KWTBB_BLUE_S;
            conditionUsed = "AFA + Angkadar Kuasa + KWTBB (Blue + Surcaj)";
          } else if (!hasInsentif && hasPenggunaanPuncak && hasSurcaj) {
            selectedBoxes = boxes_AFA_AK_KWTBB_BLUE_PUNCAK_SURCAJ;
            conditionUsed =
              "AFA + Angkadar Kuasa + KWTBB (Blue + Surcaj + Penggunaan Puncak)";
          } else {
            selectedBoxes = boxes_AFA_AK_KWTBB_BLUE;
            conditionUsed = "AFA + Angkadar Kuasa + KWTBB (Blue)";
          }
        } else if (hasAFABlack) {
          if (
            hasPenggunaanPuncak &&
            hasPermintaanMaksima &&
            !hasInsentif &&
            !hasSurcaj
          ) {
            selectedBoxes = boxes_AFA_AK_KWTBB_BLACK_PUNCAK_MAKSIMA;
            conditionUsed =
              "AFA + Angkadar Kuasa + KWTBB (Black + Penggunaan Puncak + Permintaan Maksima)";
          } else if (
            hasPenggunaanPuncak &&
            !hasPermintaanMaksima &&
            !hasInsentif &&
            !hasSurcaj
          ) {
            selectedBoxes = boxes_AFA_AK_KWTBB_BLACK_PUNCAK;
            conditionUsed =
              "AFA + Angkadar Kuasa + KWTBB (Black + Penggunaan Puncak)";
          } else {
            selectedBoxes = boxes_AFA_AK_KWTBB_BLACK;
            conditionUsed = "AFA + Angkadar Kuasa + KWTBB (Black)";
          }
        } else {
          selectedBoxes = boxes_AFA_AK_KWTBB_BLUE;
          conditionUsed = "AFA + Angkadar Kuasa + KWTBB";
        }
      }
      break;

    // ======================================================
    // AFA + POWER FACTOR + KWTBB  (English)
    // ======================================================
    case hasKWTBB && hasPowerFactor:
      if (hasMultipleAFA) {
        // Dual AFA (2 AFA)
        if (hasAFABlue) {
          if (hasEnergyEfficiencyIncentive && hasLatePaymentSurcharge) {
            selectedBoxes = boxes_AFADual_AK_KWTBB_Insentif_Surcaj_English;
            conditionUsed =
              "2 AFA + Power Factor + KWTBB (Blue + Incentive + Late Payment Surcharge - English)";
          } else if (hasEnergyEfficiencyIncentive && !hasLatePaymentSurcharge) {
            selectedBoxes = boxes_AFADual_AK_KWTBB_Insentif_Blue_English;
            conditionUsed =
              "2 AFA + Power Factor + KWTBB (Blue + Incentive - English)";
          } else {
            selectedBoxes = boxes_AFADual_AK_KWTBB_BLUE_English;
            conditionUsed = "2 AFA + Power Factor + KWTBB (Blue - English)";
          }
        } else if (hasAFABlack) {
          selectedBoxes = boxes_AFADual_AK_KWTBB_BLACK_English;
          conditionUsed = "2 AFA + Power Factor + KWTBB (Black - English)";
        } else {
          selectedBoxes = boxes_AFADual_AK_KWTBB_BLUE_English;
          conditionUsed = "2 AFA + Power Factor + KWTBB (English)";
        }
      } else {
        // Single AFA (1 AFA)
        if (hasAFABlue) {
          selectedBoxes = boxes_AFA_AK_KWTBB_BLUE;
          conditionUsed = "AFA + Power Factor + KWTBB (Blue - English)";
        } else if (hasAFABlack) {
          selectedBoxes = boxes_AFA_AK_KWTBB_BLACK;
          conditionUsed = "AFA + Power Factor + KWTBB (Black - English)";
        } else {
          selectedBoxes = boxes_AFA_AK_KWTBB_BLUE;
          conditionUsed = "AFA + Power Factor + KWTBB (English)";
        }
      }
      break;

    // ======================================================
    // DUAL TARIFF CASES
    // ======================================================
    case hasAngkadar && hasKWTBB && hasJumlahA && hasJumlahB:
      selectedBoxes = boxes_AK_KWTBB_2TARIF;
      conditionUsed = "Dual Tarif (Jumlah A + Jumlah B + Caj Semasa A+B)";
      break;

    // ======================================================
    // SERVICE TAX / INSENTIF / CAGARAN
    // ======================================================
    case hasAFA &&
      hasInsentif &&
      hasServiceTax &&
      hasKWTBB &&
      hasSurcajLewatBayar:
      selectedBoxes = boxes_Insentif_ST_AFA_KWTBB_S;
      conditionUsed = "2 AFA + Service Tax + Insentif + KWTBB + Surcaj (Black)";
      break;

    case has2AFA &&
      hasInsentif &&
      hasServiceTax &&
      hasKWTBB &&
      !hasSurcajLewatBayar:
      selectedBoxes = boxes_Insentif_ST_2AFA_KWTBB;
      conditionUsed = "2 AFA + Service Tax + Insentif + KWTBB";
      break;

    case hasAFA &&
      hasInsentif &&
      hasServiceTax &&
      hasKWTBB &&
      !hasSurcajLewatBayar:
      selectedBoxes = boxes_Insentif_ST_AFA_KWTBB;
      conditionUsed = "AFA + Service Tax + Insentif + KWTBB";
      break;

    case hasInsentif && hasCagaran && hasServiceTax:
      selectedBoxes = boxes_Cagaran_ST_Insentif;
      conditionUsed = "Insentif + Service Tax + Cagaran";
      break;

    case is2AFABlack_KWTBB_CukaiPerkhidmatan:
      selectedBoxes = boxes_2AFABlack_KWTBB_CukaiPerkhidmatan;
      conditionUsed = CONDITION_2AFA_BLACK_KWTBB_CUKAI_PERKHIDMATAN;
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
    // NOTIS PEMOTONGAN (Disconnection Notice)
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
    // OTHER GENERIC FALLBACKS
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
    // DEFAULT CASE
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
  let boxNameMap = {
    "1_1": "TARIKH BIL",
    "1_2": "TEMPOH BIL",
    "1_3": "BILANGAN HARI",
    "1_4": "NO INVOIS",
    "1_5": "NO AKAUN",
    "1_6": "BAKI TERDAHULU",
    "1_7": "CAJ SEMASA",
    "1_8": "PELARASAN",
    "1_9": "ANGKADAR KUASA",
    "2_1": "KWHR",
    "2_2": "KWTBB",
    "2_3": "PENGGUNAAN",
  };

  // --- Apply special mapping for specific condition ---
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

  if (
    conditionUsed ===
    "AFA + Angkadar Kuasa + KWTBB (Blue + Insentif + Penggunaan Puncak + Surcaj)"
  ) {
    boxNameMap = {
      ...boxNameMap,
      "2_1": "KWHR",
      "2_2": "KWTBB",
      "2_3": "SURCJ",
      "2_4": "PENGGUNAAN",
    };
  }

  if (conditionUsed === "AFA + Angkadar Kuasa + KWTBB (Blue + Surcaj)") {
    boxNameMap = {
      ...boxNameMap,
      "2_1": "KWHR",
      "2_2": "KWTBB",
      "2_3": "SURCAJ",
      "2_4": "PENGGUNAAN",
    };
  }

  if (
    conditionUsed ===
    "AFA + Angkadar Kuasa + KWTBB (Blue + Surcaj + Penggunaan Puncak)"
  ) {
    boxNameMap = {
      ...boxNameMap,
      "2_1": "KWHR",
      "2_2": "KWTBB",
      "2_3": "SURCAJ",
      "2_4": "PENGGUNAAN",
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

  if (conditionUsed === "Insentif + Service Tax + Cagaran") {
    boxNameMap = {
      ...boxNameMap, // keep all existing mappings
      "2_1": "KWHR",
      "2_2": "SERVICE TAX",
      "2_3": "CAGARAN",
      "2_4": "PENGGUNAAN",
    };
  }

  if (
    conditionUsed === "AFA + Service Tax + Insentif + KWTBB" ||
    conditionUsed === "2 AFA + Service Tax + Insentif + KWTBB"
  ) {
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

  if (
    conditionUsed === "2 AFA + Service Tax + Insentif + KWTBB + Surcaj (Black)"
  ) {
    boxNameMap = {
      ...boxNameMap,
      "2_1": "KWHR",
      "2_2": "SERVICE TAX",
      "2_3": "KWTBB",
      "2_4": "SURCAJ",
      "2_5": "PENGGUNAAN",
    };
  }

  if (conditionUsed === CONDITION_2AFA_BLACK_AK_KWTBB_PUNCAK_MAKSIMA) {
    boxNameMap = {
      ...boxNameMap,
      "2_1": "KWHR",
      "2_2": "KWTBB",
      "2_3": "PENGGUNAAN",
    };
  }

  if (conditionUsed === CONDITION_2AFA_BLACK_2LINE_AK_KWTBB_PUNCAK_MAKSIMA) {
    boxNameMap = {
      ...boxNameMap,
      "2_1": "KWHR",
      "2_2": "KWTBB",
      "2_3": "PENGGUNAAN",
    };
  }

  if (
    conditionUsed === CONDITION_2AFA_BLACK_1LINE_2LINE_AK_KWTBB_PUNCAK_MAKSIMA
  ) {
    boxNameMap = {
      ...boxNameMap,
      "2_1": "KWHR",
      "2_2": "KWTBB",
      "2_3": "PENGGUNAAN",
    };
  }

  if (conditionUsed === CONDITION_2AFA_BLACK_SERVICE_TAX_INSENTIF_KWTBB) {
    boxNameMap = {
      ...boxNameMap,
      "2_1": "KWHR",
      "2_2": "SERVICE TAX",
      "2_3": "KWTBB",
      "2_4": "PENGGUNAAN",
    };
  }

  if (conditionUsed === CONDITION_2AFA_BLACK_AK_KWTBB) {
    boxNameMap = {
      ...boxNameMap,
      "2_1": "KWHR",
      "2_2": "KWTBB",
      "2_3": "PENGGUNAAN",
    };
  }

  if (conditionUsed === CONDITION_2AFA_BLACK_1LINE_2LINE_AK_KWTBB) {
    boxNameMap = {
      ...boxNameMap,
      "2_1": "KWHR",
      "2_2": "KWTBB",
      "2_3": "PENGGUNAAN",
    };
  }

  if (conditionUsed === CONDITION_2AFA_BLACK_AK_KWTBB_INSENTIF) {
    boxNameMap = {
      ...boxNameMap,
      "2_1": "KWHR",
      "2_2": "KWTBB",
      "2_3": "PENGGUNAAN",
    };
  }

  if (
    conditionUsed === CONDITION_2AFA_BLACK_POWER_FACTOR_INCENTIVE_2LINE_KWTBB
  ) {
    boxNameMap = {
      ...boxNameMap,

      // Page 1
      "1_1": "TARIKH BIL",
      "1_2": "TEMPOH BIL",
      "1_3": "BILANGAN HARI",
      "1_4": "NO INVOIS",
      "1_5": "NO AKAUN",
      "1_6": "BAKI TERDAHULU",
      "1_7": "CAJ SEMASA",
      "1_8": "PELARASAN",
      "1_9": "ANGKADAR KUASA", // Power Factor value

      // Page 2
      "2_1": "KWHR",
      "2_2": "KWTBB",
      "2_3": "PENGGUNAAN",
    };
  }

  if (
    conditionUsed ===
    CONDITION_2AFA_BLACK_1LINE_2LINE_POWER_FACTOR_KWTBB_PEAK_MAX
  ) {
    boxNameMap = {
      ...boxNameMap,

      "1_1": "TARIKH BIL",
      "1_2": "TEMPOH BIL",
      "1_3": "BILANGAN HARI",
      "1_4": "NO INVOIS",
      "1_5": "NO AKAUN",
      "1_6": "BAKI TERDAHULU",
      "1_7": "CAJ SEMASA",
      "1_8": "PELARASAN",
      "1_9": "ANGKADAR KUASA",

      "2_1": "KWHR",
      "2_2": "KWTBB",
      "2_3": "PENGGUNAAN",
    };
  }

  if (
    conditionUsed === CONDITION_2AFA_BLACK_2LINE_POWER_FACTOR_KWTBB_PEAK_MAX
  ) {
    boxNameMap = {
      ...boxNameMap,

      "1_1": "TARIKH BIL",
      "1_2": "TEMPOH BIL",
      "1_3": "BILANGAN HARI",
      "1_4": "NO INVOIS",
      "1_5": "NO AKAUN",
      "1_6": "BAKI TERDAHULU",
      "1_7": "CAJ SEMASA",
      "1_8": "PELARASAN",
      "1_9": "ANGKADAR KUASA",

      "2_1": "KWHR",
      "2_2": "KWTBB",
      "2_3": "PENGGUNAAN",
    };
  }

  if (conditionUsed === CONDITION_2AFA_BLACK_POWER_FACTOR_KWTBB) {
    boxNameMap = {
      ...boxNameMap,

      "1_1": "TARIKH BIL",
      "1_2": "TEMPOH BIL",
      "1_3": "BILANGAN HARI",
      "1_4": "NO INVOIS",
      "1_5": "NO AKAUN",
      "1_6": "BAKI TERDAHULU",
      "1_7": "CAJ SEMASA",
      "1_8": "PELARASAN",
      "1_9": "ANGKADAR KUASA",

      "2_1": "KWHR",
      "2_2": "KWTBB",
      "2_3": "PENGGUNAAN",
    };
  }

  if (conditionUsed === CONDITION_2AFA_BLACK_POWER_FACTOR_KWTBB_PEAK_MAX) {
    boxNameMap = {
      ...boxNameMap,

      "1_1": "TARIKH BIL",
      "1_2": "TEMPOH BIL",
      "1_3": "BILANGAN HARI",
      "1_4": "NO INVOIS",
      "1_5": "NO AKAUN",
      "1_6": "BAKI TERDAHULU",
      "1_7": "CAJ SEMASA",
      "1_8": "PELARASAN",
      "1_9": "ANGKADAR KUASA",

      "2_1": "KWHR",
      "2_2": "KWTBB",
      "2_3": "PENGGUNAAN",
    };
  }

  if (
    conditionUsed === CONDITION_2AFA_BLACK_2LINE_1LINE_AK_KWTBB_PUNCAK_MAKSIMA
  ) {
    boxNameMap = {
      ...boxNameMap,

      "1_1": "TARIKH BIL",
      "1_2": "TEMPOH BIL",
      "1_3": "BILANGAN HARI",
      "1_4": "NO INVOIS",
      "1_5": "NO AKAUN",
      "1_6": "BAKI TERDAHULU",
      "1_7": "CAJ SEMASA",
      "1_8": "PELARASAN",
      "1_9": "ANGKADAR KUASA",

      "2_1": "KWHR",
      "2_2": "KWTBB",
      "2_3": "PENGGUNAAN",
    };
  }

  if (conditionUsed === CONDITION_2AFA_BLACK_2LINE_1LINE_AK_KWTBB) {
    boxNameMap = {
      ...boxNameMap,

      "1_1": "TARIKH BIL",
      "1_2": "TEMPOH BIL",
      "1_3": "BILANGAN HARI",
      "1_4": "NO INVOIS",
      "1_5": "NO AKAUN",
      "1_6": "BAKI TERDAHULU",
      "1_7": "CAJ SEMASA",
      "1_8": "PELARASAN",
      "1_9": "ANGKADAR KUASA",

      "2_1": "KWHR",
      "2_2": "KWTBB",
      "2_3": "PENGGUNAAN",
    };
  }

  if (conditionUsed === CONDITION_1AFA_BLACK_2LINE_AK_KWTBB_PUNCAK_MAKSIMA) {
    boxNameMap = {
      ...boxNameMap,

      "1_1": "TARIKH BIL",
      "1_2": "TEMPOH BIL",
      "1_3": "BILANGAN HARI",
      "1_4": "NO INVOIS",
      "1_5": "NO AKAUN",
      "1_6": "BAKI TERDAHULU",
      "1_7": "CAJ SEMASA",
      "1_8": "PELARASAN",
      "1_9": "ANGKADAR KUASA",

      "2_1": "KWHR",
      "2_2": "KWTBB",
      "2_3": "PENGGUNAAN",
    };
  }

  if (conditionUsed === CONDITION_2AFA_BLACK_KWTBB_CUKAI_PERKHIDMATAN) {
    boxNameMap = {
      ...boxNameMap,

      "1_1": "TARIKH BIL",
      "1_2": "TEMPOH BIL",
      "1_3": "BILANGAN HARI",
      "1_4": "NO INVOIS",
      "1_5": "NO AKAUN",
      "1_6": "BAKI TERDAHULU",
      "1_7": "CAJ SEMASA",
      "1_8": "PELARASAN",

      "2_1": "KWHR",
      "2_2": "SERVICE TAX",
      "2_3": "KWTBB",
      "2_4": "PENGGUNAAN",
    };
  }

  if (
    conditionUsed ===
    CONDITION_2AFA_BLACK_2LINE_1LINE_POWER_FACTOR_KWTBB_PEAK_MAX
  ) {
    boxNameMap = {
      ...boxNameMap,

      "1_1": "TARIKH BIL",
      "1_2": "TEMPOH BIL",
      "1_3": "BILANGAN HARI",
      "1_4": "NO INVOIS",
      "1_5": "NO AKAUN",
      "1_6": "BAKI TERDAHULU",
      "1_7": "CAJ SEMASA",
      "1_8": "PELARASAN",
      "1_9": "ANGKADAR KUASA",

      "2_1": "KWHR",
      "2_2": "KWTBB",
      "2_3": "PENGGUNAAN",
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
            `BOX_${r.page}_${r.box}` === `BOX_${key}`,
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
    path.basename(pdfPath).replace(/\.pdf$/i, "_output.json"),
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
        "Invalid file data format — must be Buffer or base64 string.",
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
