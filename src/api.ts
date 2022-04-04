import axios from 'axios';
import { APP_ID, EXCLUDE } from './utils/constants';

const instanceDefault = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

const instanceOneCall = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/onecall',
});

type location = {
  longitude: number | null;
  latitude: number | null;
};

export function getWeather({ latitude, longitude}: location) {
  return instanceDefault.get('/weather', {
    params: {
      lang: 'es',
      lat: latitude,
      lon: longitude,
      appid: APP_ID,
      units: 'metric',
    }
  });
};

export function getWeatherByCity(city: string) {
  return instanceDefault.get('/weather', {
    params: {
      q: city,
      lang: 'es',
      appid: APP_ID,
      units: 'metric',
    }
  });
}

export function getWeatherByDayForecast ({ latitude, longitude}: location) {
  return instanceOneCall.get('/', {
    params: {
      lang: 'es',
      lat: latitude,
      lon: longitude,
      appid: APP_ID,
      units: 'metric',
      exclude: EXCLUDE,
    }
  });
}

export function getWeatherByDayHistory({ latitude, longitude}: location, time: number) {
  return instanceOneCall.get('/timemachine', {
    params: {
      dt: time,
      lang: 'es',
      lat: latitude,
      lon: longitude,
      appid: APP_ID,
      units: 'metric',
    }
  });
}
