import axios, { AxiosRequestConfig } from 'axios';

const APP_ID = 'e0c39463afb3b9a2701719f76e8560d5';

export type PromiseManager<T> = {
  takeUntil: () => Promise<T>;
  takeLast: () => Promise<T>;
};

export function promiseManager<T>(
  promiseCall: (...args: Array<any>) => Promise<T>,
) {
  let firstCall = true;
  return function (...args: Array<any>): PromiseManager<T> {
    return {
      takeUntil: function (): Promise<T> {
        if (firstCall) {
          firstCall = false;
          return promiseCall(...args)
            .then((response: T) => {
              firstCall = true;
              return Promise.resolve(response);
            })
            .catch((error) => {
              firstCall = true;
              return Promise.reject(error);
            });
        }
        return Promise.reject('Solicitud Cancelada');
      },
      takeLast: function (): Promise<T> {
        return promiseCall(...args)
          .then((response: T) => {
            return Promise.resolve(response);
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      },
    };
  };
}

function fetch<R>(config: AxiosRequestConfig): Promise<R> {
  return axios(config)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        // Check the error shape that comes from the backend
        // error: {
        //  code: string,
        //  message: string
        // };
        return error.response.data.error &&
          error.response.data.error.code &&
          error.response.data.error.message
          ? Promise.reject(error.response.data.error)
          : Promise.reject('Error interno de la aplicación.');
      } else if (error.request) {
        // The request was made but no response was received
        return Promise.reject('Error interno de la aplicación.');
      } else if (axios.isCancel(error)) {
        // the request was canceled
        return Promise.reject('Solicitud cancelada.');
      } else {
        // Something happened in setting up the request that triggered an Error
        return Promise.reject('Error interno de la aplicación.');
      }
    });
}

type location = {
  longitude: number;
  latitude: number;
};

export function getWeather(location: location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lang=es&lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${APP_ID}`;

  return fetch({
    url,
    method: 'get',
  });
}

export function getWeatherByCity(city: string) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID}`;

  return fetch({
    url,
    method: 'get',
  });
}
