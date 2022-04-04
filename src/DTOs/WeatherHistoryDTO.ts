import { CurrentDTO } from "./CurrentDTO";
import { HourlyDTO } from "./HourlyDTO";

export type WeatherHistoryDTO = {
  current: CurrentDTO,
  hourly: Array<HourlyDTO>,
  lat: number,
  lon: number,
  timezone: string,
  timezone_offset: number,
}
