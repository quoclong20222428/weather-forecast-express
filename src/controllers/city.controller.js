import { getWeatherByCity, getWeatherByCityId, saveCityByName, getSavedCities, getCityById, updateCityWeather, unsaveCityByName, getWeatherByLatLon, } from "../services/weather.service.js";
import { HttpError } from "../middleware/index.js";
import { initializeRedisClient } from "../utils/redisClient.js";
import { prisma } from "../config/db.js";
export const listCities = async (_req, res) => {
    const cities = await getSavedCities();
    res.json(cities);
};
export const saveCity = async (req, res, next) => {
    const { name } = req.body;
    if (!name || !name.trim()) {
        return next(new HttpError(400, "Missing city name"));
    }
    try {
        const city = await saveCityByName(name.trim());
        res.status(201).json(city);
    }
    catch (err) {
        if (err instanceof Error) {
            return next(new HttpError(400, err.message));
        }
        return next(err);
    }
};
export const unsaveCity = async (req, res, next) => {
    const { name } = req.body;
    if (!name || !name.trim()) {
        return next(new HttpError(400, "Missing city name"));
    }
    try {
        const city = await unsaveCityByName(name.trim());
        if (!city) {
            return next(new HttpError(404, "City not found"));
        }
        res.status(200).json({ message: "City was unsaved" });
    }
    catch (err) {
        if (err instanceof Error) {
            const statusCode = err.message === "City not found" ? 404 : 500;
            return next(new HttpError(statusCode, err.message));
        }
        return next(err);
    }
};
export const getCityDetail = async (req, res, next) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        return next(new HttpError(400, "Invalid id"));
    }
    try {
        const redisClient = await initializeRedisClient();
        const cacheKey = `city:${id}`;
        const cached = await redisClient.get(cacheKey);
        if (cached) {
            console.log(`Cache hit: city ${id}`);
            return res.json(JSON.parse(cached));
        }
        const city = await getCityById(id);
        if (!city) {
            return next(new HttpError(404, "City not found"));
        }
        await redisClient.setEx(cacheKey, 600, JSON.stringify(city));
        res.json(city);
    }
    catch (err) {
        return next(err);
    }
    // const city = await getCityById(id);
    // if (!city) {
    //   return next(new HttpError(404, "City not found"));
    // }
    // res.json(city);
};
export const refreshCityWeather = async (req, res, next) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        return next(new HttpError(400, "Invalid id"));
    }
    try {
        const result = await updateCityWeather(id);
        res.json(result);
    }
    catch (err) {
        if (err instanceof Error) {
            const msg = err.message.toLowerCase();
            const statusCode = msg.includes("404") || msg.includes("city not found") ? 404 : 400;
            return next(new HttpError(statusCode, err.message));
        }
        return next(err);
    }
};
export const getWeatherCityByLatLon = async (req, res, next) => {
    const { lat, lon } = req.params;
    const latNum = Number(lat);
    const lonNum = Number(lon);
    if (Number.isNaN(latNum) || Number.isNaN(lonNum) || latNum < -90 || latNum > 90 || lonNum < -180 || lonNum > 180) {
        return next(new HttpError(400, "Invalid latitude or longitude"));
    }
    try {
        const weather = await getWeatherByLatLon(latNum, lonNum);
        res.json(weather);
    }
    catch (error) {
        if (error instanceof Error) {
            const msg = error.message.toLowerCase();
            const statusCode = msg.includes("404") || msg.includes("city not found") ? 404 : 400;
            return next(new HttpError(statusCode, error.message));
        }
        return next(error);
    }
};
export const getWeatherByName = async (req, res, next) => {
    const { name } = req.params;
    try {
        const weather = await getWeatherByCity(name);
        res.json(weather);
    }
    catch (err) {
        if (err instanceof Error) {
            const msg = err.message.toLowerCase();
            const statusCode = msg.includes("404") || msg.includes("city not found") ? 404 : 400;
            return next(new HttpError(statusCode, err.message));
        }
        return next(err);
    }
};
export const getWeatherById = async (req, res, next) => {
    const id = Number(req.params.owmId);
    if (Number.isNaN(id)) {
        return next(new HttpError(400, "Invalid owmId"));
    }
    try {
        const weather = await getWeatherByCityId(id);
        res.json(weather);
    }
    catch (err) {
        if (err instanceof Error) {
            const msg = err.message.toLowerCase();
            const statusCode = msg.includes("404") || msg.includes("city not found") ? 404 : 400;
            return next(new HttpError(statusCode, err.message));
        }
        return next(err);
    }
};
const CACHE_KEY = "cities:all";
const CACHE_TTL = 3600; // 1 giờ
export const getAllCities = async (_req, res, next) => {
    try {
        const redisClient = await initializeRedisClient();
        // Luôn lấy dữ liệu mới từ DB
        const cities = await prisma.city.findMany();
        // Cập nhật cache với dữ liệu mới
        await redisClient.setEx(CACHE_KEY, CACHE_TTL, JSON.stringify(cities));
        return res.json(cities);
    }
    catch (err) {
        console.error("Error in getAllCities:", err);
        return next(new HttpError(500, "Failed to fetch all cities"));
    }
};
// POST /api/cities
export const createCity = async (req, res, next) => {
    const { name, country, lat, lon } = req.body;
    if (!name || !country || lat == null || lon == null) {
        return next(new HttpError(400, "Missing required fields"));
    }
    try {
        // Start transaction to ensure data consistency
        const result = await prisma.$transaction(async (tx) => {
            // 1. Create new city
            const newCity = await tx.city.create({
                data: { name, country, lat, lon, owmId: 0, timezone: 0 },
            });
            // 2. Get updated list of all cities
            const allCities = await tx.city.findMany();
            return { newCity, allCities };
        });
        // 3. Update cache after transaction completes successfully
        const redisClient = await initializeRedisClient();
        await redisClient.setEx(CACHE_KEY, CACHE_TTL, JSON.stringify(result.allCities));
        return res.status(201).json(result.newCity);
    }
    catch (err) {
        console.error("Error in createCity:", err);
        return next(new HttpError(500, "Failed to create city"));
    }
};
// DELETE /api/cities/:id
export const deleteCity = async (req, res, next) => {
    const { id } = req.params;
    const idNum = Number(id);
    if (Number.isNaN(idNum)) {
        return next(new HttpError(400, "Invalid city id"));
    }
    try {
        // Thực hiện transaction để đảm bảo tính nhất quán
        const result = await prisma.$transaction(async (tx) => {
            // 1. Xóa city
            await tx.city.delete({
                where: { id: idNum }
            });
            // 2. Lấy danh sách cities mới
            const remainingCities = await tx.city.findMany();
            return { remainingCities };
        });
        // 3. Cập nhật cache sau khi transaction thành công
        const redisClient = await initializeRedisClient();
        // Cập nhật cache danh sách cities
        await redisClient.setEx(CACHE_KEY, CACHE_TTL, JSON.stringify(result.remainingCities));
        // Xóa cache chi tiết của city vừa xóa
        await redisClient.del(`city:${id}`);
        return res.json({
            message: "City deleted successfully",
            remainingCities: result.remainingCities
        });
    }
    catch (err) {
        console.error("Error in deleteCity:", err);
        // Nếu không tìm thấy city để xóa, Prisma sẽ throw RecordNotFound
        if (typeof err === 'object' && err !== null && 'code' in err && err.code === 'P2025') {
            return next(new HttpError(404, "City not found"));
        }
        return next(new HttpError(500, "Failed to delete city"));
    }
};
