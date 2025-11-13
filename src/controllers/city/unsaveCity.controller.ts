import { NextFunction, Response } from "express";
import { HttpError } from "../../middleware/index.js";
import { AuthRequest } from "../../middleware/auth/index.js";
import { unsaveCity as unsaveCityService } from "../../services/weather/index.js";

export const unsaveCity = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const idNum = Number(id);

    if (Number.isNaN(idNum)) {
        return next(new HttpError(400, "ID không hợp lệ"));
    }

    // Lấy userId từ authenticated user
    const userId = req.user?.userId;
    if (!userId) {
        return next(new HttpError(401, "Unauthorized"));
    }

    try {
        const deleted = await unsaveCityService(userId, idNum);
        if (!deleted) {
            return next(new HttpError(404, "Không tìm thấy thành phố hoặc bạn chưa lưu thành phố này"));
        }
        res.status(200).json({ message: "Thành phố đã được xóa khỏi danh sách của bạn" });
    } catch (err) {
        if (err instanceof Error) {
            return next(new HttpError(500, err.message));
        }
        return next(err);
    }
};
