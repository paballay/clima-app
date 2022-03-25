import axios, { AxiosRequestConfig } from 'axios';
import { APP_ID, EXCLUDE } from './utils/constants';

function callApi<R>(config: AxiosRequestConfig): Promise<R> {
  return axios(config)
    .then(({ data }) => {
      return Promise.resolve(data);
    })
    .catch(error => {
      return Promise.reject('Error interno de la aplicación.');
    });
}

type location = {
  longitude: number | null;
  latitude: number | null;
};

export function getWeather(location: location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lang=es&lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${APP_ID}`;

  return callApi({
    url,
    method: 'get',
  });
}

export function getWeatherByCity(city: string) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID}`;

  return callApi({
    url,
    method: 'get',
  });
}

export function getWeatherByDayForecast (location: location) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?exclude=${EXCLUDE}&lat=${location.latitude}&lon=${location.longitude}&appid=${APP_ID}`;

  return callApi({
    url,
    method: 'get',
  });
}

export function getWeatherByDayHistory(location: location, time: number) {
  const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${location.latitude}&lon=${location.longitude}&dt=${time}&appid=${APP_ID}`;

  return callApi({
    url,
    method: 'get',
  });
}
