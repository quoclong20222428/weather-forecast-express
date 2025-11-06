// Shared types for weather services
export type OpenWeatherResponse = {
  coord: { lon: number; lat: number };
  weather: Array<{ id: number; main: string; description: string; icon: string }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility?: number;
  wind?: { speed: number; deg: number; gust?: number };
  clouds?: { all: number };
  dt: number;
  sys: { country: string; sunrise?: number; sunset?: number };
  timezone: number;
  id: number; // owm city id
  name: string;
  cod: number;
};

export type DailyWeatherResponse = {
  city: {
    id: number;
    name: string;
    coord: { lon: number; lat: number };
    country: string;
    population: number;
    timezone: number;
  };
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    sunrise: number;
    sunset: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    pressure: number;
    humidity: number;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    speed: number;
    deg: number;
    gust: number;
    clouds: number;
    pop: number;
    rain?: number;
    snow?: number;
  }>;
};

export type DailyHourWeatherResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number; // Probability of precipitation
    rain?: {
      "1h"?: number;
    };
    snow?: {
      "1h"?: number;
    };
    sys: {
      pod: string; // Part of day (d = day, n = night)
    };
    dt_txt: string; // Datetime in text format "YYYY-MM-DD HH:mm:ss"
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};