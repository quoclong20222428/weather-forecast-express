import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import cityRoutes from "./routes/city.routes.js";
import authRoutes from "./routes/auth.routes.js";
import dataDeletionRoutes from "./routes/data-deletion.routes.js";
import { errorHandler, notFoundHandler, requestLogger } from "./middleware/index.js";

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
		origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173", "http://localhost:3000"],
		credentials: true,
	})
);

// Initialize Passport
app.use(passport.initialize());

app.get("/", (req: Request, res: Response) => {
	res.send("Weather Forecast API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/data", dataDeletionRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
