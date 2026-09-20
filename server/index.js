import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import fs from "fs";
import { PDFParse } from "pdf-parse";
import Tesseract from "tesseract.js";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// -----------------------------
// Gemini AI
// -----------------------------

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// -----------------------------
// Multer configuration
// -----------------------------

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 20 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only PDF, JPG, JPEG and PNG files are allowed."
        )
      );
    }
  },
});

// -----------------------------
// Extract text from PDF
// -----------------------------

async function extractPDFText(filePath) {
  const dataBuffer = fs.readFileSync(filePath);

  const parser = new PDFParse({
    data: dataBuffer,
  });

  const result = await parser.getText();

  await parser.destroy();

  return result.text;
}

// -----------------------------
// Extract text from image
// -----------------------------

async function extractImageText(filePath) {
  const result = await Tesseract.recognize(
    filePath,
    "eng"
  );

  return result.data.text;
}

// -----------------------------
// Analyze uploaded report
// -----------------------------

app.post(
  "/api/analyze",
  upload.single("report"),
  async (req, res) => {
    let filePath = null;

    try {
      // Check uploaded file
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please upload a report.",
        });
      }

      filePath = req.file.path;

      let extractedText = "";

      // -----------------------------
      // PDF
      // -----------------------------

      if (req.file.mimetype === "application/pdf") {
        extractedText = await extractPDFText(filePath);
      }

      // -----------------------------
      // JPG / PNG
      // -----------------------------

      else {
        extractedText = await extractImageText(filePath);
      }

      // Delete temporary uploaded file
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        filePath = null;
      }

      // Check extracted text
      if (!extractedText.trim()) {
        return res.status(400).json({
          success: false,
          message:
            "Could not extract text from this report.",
        });
      }

      console.log("Extracted report text:");
      console.log(extractedText);

      // -----------------------------
      // Gemini AI Analysis
      // -----------------------------

      const prompt = `
You are an AI Lab Report Analyzer.

Analyze the following student lab report.

Provide the result in the following sections:

1. Use simple, everyday English.
2. Explain the main point in 2-4 short sentences.
3. Avoid difficult words and technical terms.
4. Focus only on the most important information.
5. Explain like you are talking to a normal person.
6. Do not add unnecessary details.
7. Keep the meaning accurate.

Keep the explanation clear, accurate, and suitable for a college student.

LAB REPORT:
${extractedText}
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      const analysis = response.text;

      // -----------------------------
      // Send result to frontend
      // -----------------------------

      res.json({
        success: true,
        message: "Report analyzed successfully.",
        extractedText,
        analysis,
      });

    } catch (error) {
      console.error("ERROR:", error);

      // Delete uploaded file if an error occurs
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      res.status(500).json({
        success: false,
        message:
          "Something went wrong while processing the report.",
        error: error.message,
      });
    }
  }
);

// -----------------------------
// Start server
// -----------------------------

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});