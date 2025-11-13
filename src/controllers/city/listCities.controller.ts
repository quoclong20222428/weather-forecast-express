import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middleware/auth/index.js";
import { HttpError } from "../../middleware/index.js";
import { getSavedCities } from "../../services/weather/index.js";

export const listCities = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;
    if (!userId) {
        return next(new HttpError(401, "Unauthorized"));
    }

    const cities = await getSavedCities(userId);
    res.json(cities);
};
