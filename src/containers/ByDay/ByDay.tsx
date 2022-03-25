import React, { useContext, useState, useEffect } from 'react'
import { getWeatherByDayForecast, getWeatherByDayHistory } from '../../api';
import { UserContext, UserContextValue } from '../../providers/UserProvider';
import { getMaxDateCalendar, getMinDateCalendar } from '../../utils/utils';

type State = {
  date: string;
  minDate: string;
  maxDate: string,
}

export const ByDay = () => {
  const {
    globalConfig: { position },
  }: UserContextValue = useContext(UserContext);

  const [state, setState] = useState<State>({
    date: '',
    minDate: '',
    maxDate: '',
  });

  const { date, minDate, maxDate } = state;

  useEffect(() => {
    setState({ ...state, minDate: getMinDateCalendar(), maxDate: getMaxDateCalendar() })
  }, [])

  const handleSearch = () => {
    const dateFormat = date.replaceAll('-', '/');
    const dateFormat2 = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`;

    const unixTime1 = Math.floor(new Date(dateFormat).getTime() / 1000)
    const unixTime2 = Math.floor(new Date(dateFormat2).getTime() / 1000)

    if(unixTime1 <= unixTime2) {
      getWeatherByDayHistory(position, unixTime1)
        .then(data => {
          console.log(data)
        })
        .catch(e => {
          console.log(e);
        })
    } else {
      getWeatherByDayForecast(position)
        .then(data => {
          console.log(data)
        })
        .catch(e => {
          console.log(e);
        })
    }
  }

  return (
    <>
      <label htmlFor='minDate'>Pick Date</label>
      <input id="minDate" type="date" value={date} min={minDate} max={maxDate} onChange={({ target }) => setState({ ...state, date: target.value})}/>

      <button onClick={handleSearch}>Ver clima</button>
    </>
  )
}
