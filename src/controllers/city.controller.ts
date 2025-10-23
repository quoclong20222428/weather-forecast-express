import { NextFunction, Request, Response } from "express";
import {
  getWeatherByCity,
  getWeatherByCityId,
  saveCityByName,
  getSavedCities,
  getCityById,
  updateCityWeather,
  unsaveCityByName,
  getWeatherByLatLon,
} from "../services/weather.service.js";
import { HttpError } from "../middleware/index.js";

export const listCities = async (_req: Request, res: Response) => {
  const cities = await getSavedCities();
  res.json(cities);
};

export const saveCity = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body as { name?: string };
  if (!name || !name.trim()) {
    return next(new HttpError(400, "Missing city name"));
  }
  try {
    const city = await saveCityByName(name.trim());
    res.status(201).json(city);
  } catch (err) {
    if (err instanceof Error) {
      return next(new HttpError(400, err.message));
    }
    return next(err);
  }
};

export const unsaveCity = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body as { name?: string };
  if (!name || !name.trim()) {
    return next(new HttpError(400, "Missing city name"));
  }
  try {
    const city = await unsaveCityByName(name.trim());
    if (!city) {
      return next(new HttpError(404, "City not found"));
    }
    res.status(200).json({ message: "City was unsaved" });
  } catch (err) {
    if (err instanceof Error) {
      const statusCode = err.message === "City not found" ? 404 : 500;
      return next(new HttpError(statusCode, err.message));
    }
    return next(err);
  }
}

export const getCityDetail = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return next(new HttpError(400, "Invalid id"));
  }
  const city = await getCityById(id);
  if (!city) {
    return next(new HttpError(404, "City not found"));
  }
  res.json(city);
};

export const refreshCityWeather = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return next(new HttpError(400, "Invalid id"));
  }
  try {
    const result = await updateCityWeather(id);
    res.json(result);
  } catch (err) {
    if (err instanceof Error) {
      const statusCode = err.message === "City not found" ? 404 : 500;
      return next(new HttpError(statusCode, err.message));
    }
    return next(err);
  }
};

export const getWeatherCityByLatLon = async (req: Request, res: Response, next: NextFunction) => {
  const { lat, lon } = req.params;
  const latNum = Number(lat);
  const lonNum = Number(lon);

  if (Number.isNaN(latNum) || Number.isNaN(lonNum)) {
    return next(new HttpError(400, "Invalid latitude or longitude"));
  }

  try {
    const weather = await getWeatherByLatLon(latNum, lonNum);
    res.json(weather);
  } catch (error) {
    if (error instanceof Error) {
      const statusCode = error.message === "City not found" ? 404 : 500;
      return next(new HttpError(statusCode, error.message));
    }
    return next(error);
  }
}

export const getWeatherByName = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;
  try {
    const weather = await getWeatherByCity(name);
    res.json(weather);
  } catch (err) {
    if (err instanceof Error) {
      const statusCode = err.message === "City not found" ? 404 : 400;
      return next(new HttpError(statusCode, err.message));
    }
    return next(err);
  }
};

export const getWeatherById = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.owmId);
  if (Number.isNaN(id)) {
    return next(new HttpError(400, "Invalid owmId"));
  }
  try {
    const weather = await getWeatherByCityId(id);
    res.json(weather);
  } catch (err) {
    if (err instanceof Error) {
      const statusCode = err.message === "City not found" ? 404 : 400;
      return next(new HttpError(statusCode, err.message));
    }
    return next(err);
  }
};