import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
console.log("🔑 Loaded GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "Yes ✅" : "No ❌");

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Route 1: Summarization
app.post("/api/summarize", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "No text provided" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(
      `Summarize the following legal text in simple terms:\n\n${text}`
    );

    const summary = result.response.text();
    res.json({ summary });
  } catch (error) {
    console.error("Summarize error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

// ✅ Route 2: Clause Explanation
app.post("/api/explain", async (req, res) => {
  try {
    const { clause } = req.body;
    if (!clause || !clause.trim()) {
      return res.status(400).json({ error: "No clause provided" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
You are a contract analyst. Explain the following clause in plain English for a non-lawyer.
Return sections with short bullets:
1) What it means
2) Who it affects
3) Risks / hidden pitfalls
4) Whether it's standard
5) A simple everyday example

Clause:
"""${clause}"""
    `;

    const result = await model.generateContent(prompt);
    const explanation = result.response.text();

    res.json({ explanation });
  } catch (error) {
    console.error("Explain error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

// ✅ Route 3: Q&A
app.post("/api/qa", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || !question.trim()) {
      return res.status(400).json({ error: "No question provided" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(
      `Answer this legal question in simple terms:\n\n${question}`
    );

    const answer = result.response.text();
    res.json({ answer });
  } catch (error) {
    console.error("Q&A error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

// ✅ Root check
app.get("/", (req, res) => {
  res.send("✅ Backend running with Gemini API");
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
