import { WeatherDTO } from "./WeatherDTO"

export type CurrentDTO = {
  clouds: number,
  dew_point: number,
  dt: number,
  feels_like: number,
  humidity: number,
  pressure: number,
  sunrise: number,
  sunset: number,
  temp: number,
  uvi: number,
  visibility: number,
  weather: Array<WeatherDTO>,
  wind_deg: number,
  wind_speed: number,
};
