import express from "express";
import cors from "cors";
import chatbotRoutes from "./routes/chatbot.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Update CORS Middleware
const allowedOrigins = [
  "https://fullstack-chat-bot-frontend.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Manually set CORS headers (IMPORTANT)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://fullstack-chat-bot-frontend.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// ✅ Add Routes
app.use("/api", chatbotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// import express from "express";
// import cors from "cors";
// import chatbotRoutes from "./routes/chatbot.js";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(express.json());

// // ✅ Allow frontend dynamically (Fixes CORS Issue)
// // const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5173"];
// // const allowedOrigins = ["https://fullstack-chat-bot-frontend.vercel.app" || "http://localhost:5173"];
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // Allow all origins (For testing, later restrict to frontend URL)
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });


// const allowedOrigins = ["https://fullstack-chat-bot-frontend.vercel.app", "http://localhost:5173"];


// // app.use(cors({
// //   origin: function (origin, callback) {
// //     if (!origin || allowedOrigins.includes(origin)) {
// //       callback(null, true);
// //     } else {
// //       callback(new Error("Not allowed by CORS"));
// //     }
// //   },
// //   credentials: true
// // }));
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));


// app.use("/api", chatbotRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
