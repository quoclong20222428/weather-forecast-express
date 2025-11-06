import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../middleware/index.js";
import { getDailyWeather } from "../../services/index.js";

export const getDailyWeatherController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lat, lon } = req.params;

    // Validate parameters
    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);

    if (isNaN(latNum) || isNaN(lonNum) || latNum < -90 || latNum > 90 || lonNum < -180 || lonNum > 180) {
      return next(new HttpError(400, "Invalid latitude or longitude"));
    }

    // Lấy dữ liệu daily weather
    const dailyWeather = await getDailyWeather(latNum, lonNum);

    res.json(dailyWeather);
  } catch (error) {
    console.error("Get daily weather error:", error);
    next(new HttpError(500, "Failed to fetch daily weather forecast"));
  }
};
