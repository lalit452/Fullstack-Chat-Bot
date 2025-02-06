import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    console.log("User Message:", userMessage);

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ role: "user", parts: [{ text: userMessage }] }]
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    console.log("Gemini Response:", response.data);

    if (!response.data.candidates || response.data.candidates.length === 0) {
      return res.status(500).json({ error: "No response from Gemini API" });
    }

    const reply = response.data.candidates[0].content.parts[0].text;
    res.json({ reply });
  } catch (error) {
    console.error("API Error:", error.response ? error.response.data : error.message);
    res.status(500).json({
      error: "Failed to get response from Gemini API",
      details: error.response ? error.response.data : error.message
    });
  }
});

export default router;
