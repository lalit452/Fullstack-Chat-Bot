import express from "express";
import cors from "cors";
import chatbotRoutes from "./routes/chatbot.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Allow frontend dynamically (Fixes CORS Issue)
// const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5173"];
const allowedOrigins = ["https://fullstack-chat-bot-frontend.vercel.app/" || "http://localhost:5173"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use("/api", chatbotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
