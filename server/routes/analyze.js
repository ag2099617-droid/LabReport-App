import express from "express";
import multer from "multer";
import { PDFParse } from "pdf-parse";
import Tesseract from "tesseract.js";

import { analyzeLabReport } from "../services/groqService.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 20 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only PDF, JPG, JPEG and PNG files are supported."
        )
      );
    }
  },
});

// POST /api/analyze
router.post("/", upload.single("report"), async (req, res) => {
  try {
    console.log("=================================");
    console.log("ANALYZE REQUEST RECEIVED");
    console.log("=================================");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No report file uploaded.",
      });
    }

    const language = req.body.language || "English";

    console.log("File:", req.file.originalname);
    console.log("Type:", req.file.mimetype);
    console.log("Size:", req.file.size);
    console.log("Language:", language);

    let reportText = "";

    // =========================
    // PDF
    // =========================

    if (req.file.mimetype === "application/pdf") {
      console.log("Extracting PDF text...");

      const parser = new PDFParse({
        data: req.file.buffer,
      });

      const result = await parser.getText();

      reportText = result.text || "";

      await parser.destroy();

      console.log(
        "PDF text length:",
        reportText.length
      );
    }

    // =========================
    // IMAGE
    // =========================

    else {
      console.log("Running OCR on image...");

      const result = await Tesseract.recognize(
        req.file.buffer,
        "eng",
        {
          logger: (info) => {
            if (info.status === "recognizing text") {
              console.log(
                `OCR progress: ${Math.round(
                  info.progress * 100
                )}%`
              );
            }
          },
        }
      );

      reportText = result.data.text || "";

      console.log(
        "OCR text length:",
        reportText.length
      );
    }

    if (!reportText.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Could not extract text from this report. Please upload a clearer PDF or image.",
      });
    }

    console.log("Sending report to Groq AI...");

    const aiResult = await analyzeLabReport(
      reportText,
      language
    );

    console.log("Groq analysis completed.");

    return res.json({
      success: true,

      fileName: req.file.originalname,

      language,

      extractedText: reportText,

      analysis: aiResult,
    });
  } catch (error) {
    console.error("ANALYSIS ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to analyze the laboratory report.",
    });
  }
});

export default router;