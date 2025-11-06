import { HttpError } from "../../middleware/index.js";
import { getDailyHourWeather } from "../../services/index.js";
export const getDailyHourWeatherController = async (req, res, next) => {
    try {
        const { lat, lon } = req.params;
        const latNum = Number(lat), lonNum = Number(lon);
        if (isNaN(latNum) || isNaN(lonNum) || latNum < -90 || latNum > 90 || lonNum < -180 || lonNum > 180) {
            return next(new HttpError(400, "Invalid latitude or longitude"));
        }
        const dailyHour = await getDailyHourWeather(latNum, lonNum);
        res.json(dailyHour);
    }
    catch (error) {
        console.error("Get daily hour weather error:", error);
        next(new HttpError(500, "Internal Server Error"));
    }
};
