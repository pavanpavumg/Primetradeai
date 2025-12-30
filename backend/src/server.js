import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import dns from "dns";

// FORCE DNS TO GOOGLE (Fixes ENOTFOUND on restricted networks)
try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    console.log("🌐 DNS servers set to Google (8.8.8.8)");
} catch (err) {
    console.error("Failed to set DNS servers:", err);
}

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Security Headers
app.use(helmet());

// Date Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

// Only listen if not in Vercel environment (local dev)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`Health check: http://localhost:${PORT}/api/tasks`);
    });
}

// GLOBAL ERROR HANDLERS
process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("❌ Unhandled Promise Rejection:", err);
});

export default app;
