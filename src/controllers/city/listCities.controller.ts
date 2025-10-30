import { Request, Response } from "express";
import { getSavedCities } from "../../services/weather/index.js";

export const listCities = async (_req: Request, res: Response) => {
    const cities = await getSavedCities();
    res.json(cities);
};
