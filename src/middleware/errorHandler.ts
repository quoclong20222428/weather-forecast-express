import type { ErrorRequestHandler } from "express";
import { HttpError } from "./httpError.js";

// Centralized error formatter to avoid leaking internal errors to clients.
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	const statusCode = err instanceof HttpError ? err.statusCode : 500;
	const message = err instanceof Error ? err.message : "Internal Server Error";

	if (!(err instanceof HttpError) && process.env.NODE_ENV !== "test") {
		console.error(err);
	}

	const payload: Record<string, unknown> = { message };

	if (err instanceof HttpError && typeof err.details !== "undefined") {
		payload.details = err.details;
	}

	if (process.env.NODE_ENV === "development") {
		payload.stack = err instanceof Error ? err.stack : undefined;
	}

	res.status(statusCode).json(payload);
};
