import React, { useContext, useEffect } from 'react';
import { getWeather } from 'api';
import { UserContext, UserContextValue } from 'providers/UserProvider';

export const ByLocation = () => {
  const {
    globalConfig: { answer, location, position },
  }: UserContextValue = useContext(UserContext);

  useEffect(() => {
    if (position.latitude !== null && position.longitude !== null) {
      getWeather(position)
        .then(({ data }: any) => {
          console.log(data);
        });
    }
  }, [position]);

  return (
    <>
      {!answer ? (
        <div>Por favor seleccione si desea activar la ubicación</div>
      ) : (
        <div className='container'>
        </div>
      )}
    </>
  );
};
