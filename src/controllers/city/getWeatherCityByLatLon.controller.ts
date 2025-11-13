import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../middleware/index.js";
import { getWeatherByLatLon } from "../../services/weather/index.js";

export const getWeatherCityByLatLon = async (req: Request, res: Response, next: NextFunction) => {
    const { lat, lon } = req.params;
    const latNum = Number(lat);
    const lonNum = Number(lon);

    if (Number.isNaN(latNum) || Number.isNaN(lonNum) || latNum < -90 || latNum > 90 || lonNum < -180 || lonNum > 180) {
        return next(new HttpError(400, "Invalid latitude or longitude"));
    }

    try {
        const weather = await getWeatherByLatLon(latNum, lonNum);
        weather.coord.lat = latNum;
        weather.coord.lon = lonNum;

        res.json(weather);
    } catch (error) {
        if (error instanceof Error) {
            const msg = error.message.toLowerCase();
            const statusCode =
                msg.includes("404") || msg.includes("city not found") ? 404 : 400;
            return next(new HttpError(statusCode, error.message));
        }
        return next(error);
    }
};
