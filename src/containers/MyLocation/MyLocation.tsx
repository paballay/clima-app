import React, { useContext, useEffect } from 'react';
import { getWeather, promiseManager } from '../../api';
import { UserContext, UserContextValue } from '../../providers/UserProvider';

const getWeatherApi = promiseManager(getWeather);

export const MyLocation = () => {
  const {
    globalConfig: { answer, location, position },
  }: UserContextValue = useContext(UserContext);

  useEffect(() => {
    if (position.latitude !== null && position.longitude !== null) {
      getWeatherApi(position)
        .takeLast()
        .then((data: any) => {
          console.log(data);
        });
    }
  }, [position]);

  return (
    <>
      {!answer ? (
        <div>Por favor seleccione si desea activar la ubicación</div>
      ) : (
        <></>
      )}
    </>
  );
};
