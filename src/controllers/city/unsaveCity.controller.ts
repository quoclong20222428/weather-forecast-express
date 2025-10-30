import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../middleware/index.js";
import { unsaveCity as unsaveCityService } from "../../services/weather/index.js";

export const unsaveCity = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { lat, lon, name } = req.body as { lat: number; lon: number; name: string };
    const idNum = Number(id);
    const latNum = Number(lat), lonNum = Number(lon);

    if (
        Number.isNaN(idNum) ||
        lat == null || lon == null || name == null ||
        Number.isNaN(latNum) || Number.isNaN(lonNum) ||
        latNum < -90 || latNum > 90 ||
        lonNum < -180 || lonNum > 180 ||
        !name.trim()
    ) {
        return next(new HttpError(400, "Giá trị id, lat, lon hoặc name bị thiếu hoặc không hợp lệ"));
    }

    try {
        const city = await unsaveCityService(idNum, latNum, lonNum, name.trim());
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
