import { HttpError } from "./httpError.js";
export const notFoundHandler = (req, _res, next) => {
    next(new HttpError(404, `Route ${req.method} ${req.originalUrl} not found`));
};
