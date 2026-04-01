import express from "express";
import fs from "fs";
import processAllPdfs from "./src/proofOfConceptDataExtractionV1.js";
import processAllPdfsSewerage from "./src/Sewerage/proofOfConceptDataExtractionSewerageV1.js";
import processAllPdfsTM from "./src/TM/proofOfConceptDataExtractionTMV1.js";
import processAllPdfsMaxis from "./src/Maxis/proofOfConceptDataExtractionMaxisV1.js";
import processAllPdfsCelcomDigi from "./src/CELCOMDIGI/proofOfConceptDataExtractionCelcomDigiV1.js";

import { waterRouter } from "./src/water/extractWaterBillsAPI.js";

const app = express();

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// Use raw body parser for PDFs
app.use("/run", express.raw({ type: "application/pdf", limit: "200mb" }));

app.post("/run", async (req, res) => {
  try {
    console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`);

    // req.body is a Buffer containing PDF binary
    const pdfBuffer = req.body;

    if (!pdfBuffer || !Buffer.isBuffer(pdfBuffer)) {
      return res.status(400).json({ success: false, error: "No valid PDF binary received." });
    }

    
    // Optionally, write file to disk (for debug)
    // fs.writeFileSync("uploaded.pdf", pdfBuffer);

    const result = await processAllPdfs([{ data: pdfBuffer }]);

    res.json({ success: true, data: result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use("/TM", express.raw({ type: "application/pdf", limit: "200mb" }));

app.post("/TM", async (req, res) => {
  try {
    console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`);

    // req.body is a Buffer containing PDF binary
    const pdfBuffer = req.body;

    if (!pdfBuffer || !Buffer.isBuffer(pdfBuffer)) {
      return res.status(400).json({ success: false, error: "No valid PDF binary received." });
    }

    
    // Optionally, write file to disk (for debug)
    // fs.writeFileSync("uploaded.pdf", pdfBuffer);

    const result = await processAllPdfsTM([{ data: pdfBuffer }]);

    res.json({ success: true, data: result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use("/MAXIS", express.raw({ type: "application/pdf", limit: "200mb" }));

app.post("/MAXIS", async (req, res) => {
  try {
    console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`);

    // req.body is a Buffer containing PDF binary
    const pdfBuffer = req.body;

    if (!pdfBuffer || !Buffer.isBuffer(pdfBuffer)) {
      return res.status(400).json({ success: false, error: "No valid PDF binary received." });
    }

    
    // Optionally, write file to disk (for debug)
    // fs.writeFileSync("uploaded.pdf", pdfBuffer);

    const result = await processAllPdfsMaxis([{ data: pdfBuffer }]);

    res.json({ success: true, data: result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use("/SEWERAGE", express.raw({ type: "application/pdf", limit: "200mb" }));

app.post("/SEWERAGE", async (req, res) => {
  try {
    console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`);

    // req.body is a Buffer containing PDF binary
    const pdfBuffer = req.body;

    if (!pdfBuffer || !Buffer.isBuffer(pdfBuffer)) {
      return res.status(400).json({ success: false, error: "No valid PDF binary received." });
    }

    
    // Optionally, write file to disk (for debug)
    // fs.writeFileSync("uploaded.pdf", pdfBuffer);

    const result = await processAllPdfsSewerage([{ data: pdfBuffer }]);

    res.json({ success: true, data: result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use("/CELCOMDIGI", express.raw({ type: "application/pdf", limit: "200mb" }));

app.post("/CELCOMDIGI", async (req, res) => {
  try {
    console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`);

    // req.body is a Buffer containing PDF binary
    const pdfBuffer = req.body;

    if (!pdfBuffer || !Buffer.isBuffer(pdfBuffer)) {
      return res.status(400).json({ success: false, error: "No valid PDF binary received." });
    }

    
    // Optionally, write file to disk (for debug)
    // fs.writeFileSync("uploaded.pdf", pdfBuffer);

    const result = await processAllPdfsCelcomDigi([{ data: pdfBuffer }]);

    res.json({ success: true, data: result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}); 

app.use("/water-bills", waterRouter);

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
