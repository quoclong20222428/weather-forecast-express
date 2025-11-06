import { getSavedCities } from "../../services/weather/index.js";
export const listCities = async (_req, res) => {
    const cities = await getSavedCities();
    res.json(cities);
};
