import React, { useState } from 'react';
import { getWeatherByCity } from 'api';
import { CITIES } from 'utils/constants';

type State = {
  city: string;
};

export const ByCity = () => {
  const [state, setState] = useState<State>({
    city: '',
  });

  const handleChangeCity = ({ target }: any) => {
    setState({ ...state, city: target.value });

    getWeatherByCity(target.value)
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log('error: ', e);
      });
  };

  return (
    <>
      <label htmlFor="city">Elije una ciudad:</label>

      <select name="city" id="city" onChange={handleChangeCity}>
        {
          CITIES.map(e => <option value={e.id} key={e.id}>{e.name}</option>)
        }
      </select>
    </>
  );
};
