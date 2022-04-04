import axios from 'axios';
import { APP_ID, EXCLUDE } from './utils/constants';

const instanceDefault = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

const instanceOneCall = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/onecall',
});

instanceDefault.interceptors.response.use(function (response) {
  // console.log('response: ', response);
  return response;
}, function (error) {
  console.log('error: ', error)
  // console.log('error: ', error);
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // return Promise.reject(error);
});

type location = {
  longitude: number | null;
  latitude: number | null;
};

export function getWeather({ latitude, longitude}: location) {
  instanceDefault.get('/weather', {
    params: {
      lang: 'es',
      lat: latitude,
      lon: longitude,
      // appid: APP_ID,
      appid: 'APP_ID',
      units: 'metric',
    }
  })
  .then(data => {
    return data;
  })
  .catch(error => {
    return error;
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
