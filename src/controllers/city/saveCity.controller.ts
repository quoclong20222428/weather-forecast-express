import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../middleware/index.js";
import { saveCity as saveCityByName } from "../../services/weather/index.js";

export const saveCity = async (req: Request, res: Response, next: NextFunction) => {
    const { lat, lon, name, owmId } = req.body as { lat: number; lon: number; name: string; owmId: number };
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

    try {
        const result = await saveCityByName(latNum, lonNum, name.trim(), owmId);

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
