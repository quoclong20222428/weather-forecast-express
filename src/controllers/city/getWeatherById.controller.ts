import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../middleware/index.js";
import { getSavedCityWeather } from "../../services/weather/index.js";

export const getWeatherById = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.owmId);

    if (Number.isNaN(id)) {
        return next(new HttpError(400, "Invalid owmId"));
    }

    try {
        const weather = await getSavedCityWeather(id);
        res.json(weather);
    } catch (err) {
        if (err instanceof Error) {
            const msg = err.message.toLowerCase();
            const statusCode =
                msg.includes("404") || msg.includes("city not found") ? 404 : 400;
            return next(new HttpError(statusCode, err.message));
        }
        return next(err);
    }
};
