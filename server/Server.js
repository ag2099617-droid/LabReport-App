import "dotenv/config";

import express from "express";
import cors from "cors";

import analyzeRoutes from "./routes/analyze.js";

const app = express();

const PORT = process.env.PORT || 5000;

// ==========================================
// CHECK GROQ API KEY
// ==========================================

if (!process.env.GROQ_API_KEY) {
  console.error("❌ GROQ_API_KEY is missing from .env");
} else {
  console.log("✅ GROQ_API_KEY loaded successfully");
}

// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// ==========================================
// BODY PARSER
// ==========================================

app.use(
  express.json({
    limit: "10mb",
  })
);

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Lab Report Analyzer backend is running",
  });
});

// ==========================================
// ANALYZE API
// ==========================================

app.use("/api/analyze", analyzeRoutes);

// ==========================================
// ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
  console.error("=================================");
  console.error("SERVER ERROR");
  console.error("=================================");
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log("=================================");
  console.log("🚀 AI Lab Report Analyzer Backend");
  console.log("=================================");
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Analyze API: http://localhost:${PORT}/api/analyze`);
});