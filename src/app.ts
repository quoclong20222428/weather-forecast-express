import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import cityRoutes from "./routes/city.routes.js";
import authRoutes from "./routes/auth.routes.js";
import dataDeletionRoutes from "./routes/data-deletion.routes.js";
import { errorHandler, notFoundHandler, requestLogger } from "./middleware/index.js";
import { healthCheck } from "./cron/health.cron.js";
import { prisma } from "./config/db.js";

dotenv.config();

const app: Application = express();
// Global middleware stack
app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());

// Serve static files (for privacy policy, etc.)
app.use(express.static("public"));

app.use(
	cors({
		origin: process.env.CORS_ORIGIN?.split(","),
		credentials: true,
	})
);

// Initialize Passport
app.use(passport.initialize());

app.get("/", (req: Request, res: Response) => {
	res.send("Weather Forecast API is running");
});

app.get("/health", async (req: Request, res: Response) => {
	try {
		await prisma.$queryRaw`SELECT 1`;
		res.status(200).json({ status: "ok" });
	}
	catch (error) {
		res.status(500).json({ status: "error", message: "Database connection failed" });
	}
});

app.use("/api/auth", authRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/data", dataDeletionRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const url = process.env.BACKEND_URL || 'http://localhost:5001';
healthCheck(url);

export default app;
