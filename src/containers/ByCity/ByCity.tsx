import React, { useState } from 'react';
import { getWeatherByCity, promiseManager } from '../../api';

type State = {
  city: string;
};

const getWeatherByCityApi = promiseManager(getWeatherByCity);

export const ByCity = () => {
  const [state, setState] = useState<State>({
    city: '',
  });

  const handleChangeCity = ({ target }: any) => {
    setState({ ...state, city: target.value });

    getWeatherByCityApi(target.value)
      .takeLast()
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log('error: ', e);
      });
  };

  return (
    <>
      <label htmlFor="city">Choose a car:</label>

      <select name="city" id="city" onChange={handleChangeCity}>
        <option value="barcelona">Barcelona</option>
        <option value="manchester">Manchester</option>
        <option value="new york">New York</option>
        <option value="sydney">Sydney</option>
      </select>
    </>
  );
};
