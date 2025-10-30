import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../middleware/index.js";
import { getSavedCityWeather as getSavedCityWeatherService } from "../../services/weather/index.js";

export const getSavedCityWeather = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return next(new HttpError(400, "ID thành phố không hợp lệ"));
    }

    try {
        const weatherData = await getSavedCityWeatherService(id);
        res.json(weatherData);
    } catch (err) {
        if (err instanceof Error) {
            const msg = err.message.toLowerCase();
            const statusCode = msg.includes("404") || msg.includes("not found") ? 404 : 400;
            return next(new HttpError(statusCode, err.message));
        }
        return next(err);
    }
};
