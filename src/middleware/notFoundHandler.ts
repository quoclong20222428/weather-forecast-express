import type { NextFunction, Request, Response } from "express";
import { HttpError } from "./httpError.js";

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
	next(new HttpError(404, `Route ${req.method} ${req.originalUrl} not found`));
};
