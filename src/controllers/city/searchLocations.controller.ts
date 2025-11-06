import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../middleware/index.js";
import { searchLocationsFullText } from "../../services/index.js";

export const searchLocations = async (req: Request, res: Response, next: NextFunction) => {
    // Lấy query từ req.params.q (theo route: /search/:q)
    const { q } = req.params;

    // Validate query parameter
    if (!q || typeof q !== 'string' || q.trim() === '') {
        return next(new HttpError(400, "Missing or invalid query parameter"));
    }

    try {
        const locations = await searchLocationsFullText(q.trim());
        res.json(locations);
    } catch (error) {
        console.error("Search locations error:", error);
        next(new HttpError(500, "Failed to search locations"));
    }
}