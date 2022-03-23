import React, { useContext, useEffect, useState } from 'react';
import { getWeather, promiseManager } from './api';
import { UserContext, UserContextValue } from './providers/UserProvider';

const getWeatherApi = promiseManager(getWeather)
export const App = () => {
  const [state, setState] = useState({})
  const { globalConfig: { answer, position, location }}: UserContextValue = useContext(UserContext);

  useEffect(() => {
    console.log('position: ', position)
    if(position.latitude !== null && position.longitude !== null) {
      getWeatherApi(position)
        .takeLast()
        .then((data: any) => {
          setState({ ...state, data})
        });
    }
  }, [position]);
  return (
    <>
      {
        answer 
          ?  
            <pre>{ JSON.stringify(state, null, 3)}</pre>
          : <div>Loading...</div>
      }
    </>
  )
};
