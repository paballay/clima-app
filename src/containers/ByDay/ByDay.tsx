import React, { useContext, useState, useEffect } from 'react'
import { getWeatherByDay, promiseManager } from '../../api';
import { UserContext, UserContextValue } from '../../providers/UserProvider';
import { getCurrentDate, getMinDateCalendar } from '../../utils/utils';

type State = {
  startDate: string;
  endDate: string;
  minDate: string;
}
const getWeatherByDayAPI = promiseManager(getWeatherByDay);

export const ByDay = () => {
  const {
    globalConfig: { position },
  }: UserContextValue = useContext(UserContext);

  const [state, setState] = useState<State>({
    startDate: '',
    endDate: '',
    minDate: '',
  });

  const { startDate, endDate, minDate } = state;

  useEffect(() => {
    setState({ ...state, minDate: getMinDateCalendar() })
  }, [])
  const handleSearch = () => {
    // getWeatherByDayAPI(position)
    //   .takeLast()
    //   .then(({ daily, timezone}: any) => {
    //     daily.forEach((el: any, i: any) => {
    //       console.log('Dia ', i, ': ', new Date(el.dt * 1000));
    //     })
    //   })
    console.log(Math.floor(new Date(startDate).getTime() / 1000));
  }

  return (
    <>
      <label htmlFor='minDate'>Min Date</label>
      <input id="minDate" type="date" value={startDate} min={minDate} onChange={({ target }) => setState({ ...state, startDate: target.value})}/>

      <label htmlFor='maxDate'>Min Date</label>
      <input id="maxDate" type="date" value={endDate} min={minDate} onChange={({ target }) => setState({ ...state, endDate: target.value})}/>

      <button onClick={handleSearch}>Ver clima</button>
    </>
  )
}
