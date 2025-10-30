import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../middleware/index.js";
import { unsaveCityByName } from "../../services/weather/index.js";

export const unsaveCity = async (req: Request, res: Response, next: NextFunction) => {
    const { lat, lon, name, owmId } = req.body as { lat: number; lon: number; name: string; owmId: number };
    const latNum = Number(lat), lonNum = Number(lon);

    if (
        lat == null || lon == null || name == null ||
        Number.isNaN(latNum) || Number.isNaN(lonNum) ||
        latNum < -90 || latNum > 90 ||
        lonNum < -180 || lonNum > 180 ||
        !name.trim()
    ) {
        return next(new HttpError(400, "Giá trị lat, lon hoặc name bị thiếu hoặc không hợp lệ"));
    }

    try {
        const city = await unsaveCityByName(latNum, lonNum, name.trim(), owmId);
        if (!city) {
            return next(new HttpError(404, "Không tìm thấy thành phố"));
        }
        res.status(200).json({ message: "Thành phố đã được xóa" });
    } catch (err) {
        if (err instanceof Error) {
            const statusCode = err.message === "City not found" ? 404 : 500;
            return next(new HttpError(statusCode, err.message));
        }
        return next(err);
    }
};
