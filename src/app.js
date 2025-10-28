import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cityRoutes from "./routes/city.routes.js";
import { errorHandler, notFoundHandler, requestLogger } from "./middleware/index.js";
dotenv.config();
const app = express();
// Global middleware stack
app.use(requestLogger);
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
}));
app.use("/api/cities", cityRoutes);
app.use(notFoundHandler);
app.use(errorHandler);
export default app;
