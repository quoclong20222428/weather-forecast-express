import { NextFunction, Response } from "express";
import { HttpError } from "../../middleware/index.js";
import { AuthRequest } from "../../middleware/auth/index.js";
import { saveCity as saveCityService } from "../../services/weather/index.js";

export const saveCity = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { lat, lon, name } = req.body as { lat: number; lon: number; name: string };
    const latNum = Number(lat), lonNum = Number(lon);

    if (
        lat == null || lon == null || name == null ||
        Number.isNaN(latNum) || Number.isNaN(lonNum) ||
        latNum < -90 || latNum > 90 ||
        lonNum < -180 || lonNum > 180 ||
        !name.trim()
    ) {
        return next(new HttpError(400, "Missing or invalid lat, lon, or name"));
    }

    // Lấy userId từ authenticated user
    const userId = req.user?.userId;
    if (!userId) {
        return next(new HttpError(401, "Unauthorized"));
    }

    try {
        const result = await saveCityService(userId, latNum, lonNum, name.trim());

        // Nếu city đã tồn tại, trả về status 200 với thông báo
        if (result.alreadyExists) {
            return res.status(200).json(result);
        }

        // Nếu city mới được tạo, trả về status 201
        res.status(201).json(result);
    } catch (err) {
        if (err instanceof Error) {
            return next(new HttpError(400, err.message));
        }
        return next(err);
    }
};
