import React, { useContext, useState, useEffect } from 'react'
import { getWeatherByDayForecast, getWeatherByDayHistory } from 'api';
import { UserContext, UserContextValue } from 'providers/UserProvider';
import { getHours, getMaxDateCalendar, getMinDateCalendar } from 'utils/utils';
import { WeatherHistoryDTO, Nulleable } from 'DTOs';
import { CurrentDTO } from 'DTOs/CurrentDTO';
import styles from './ByDay.module.scss';

const {
  listItems,
  items,
  container,
  card,
  containerCard,
  cardColumnOne,
  cardColumnTwo,
} = styles;

type State = {
  date: string;
  minDate: string;
  maxDate: string;
  history: boolean;
  showInfo: boolean;
  dataHistory: Nulleable<WeatherHistoryDTO>;
  dataHours: Nulleable<CurrentDTO>;
}

export const ByDay = () => {
  const {
    globalConfig: { position },
  }: UserContextValue = useContext(UserContext);

  const [state, setState] = useState<State>({
    date: '',
    minDate: '',
    maxDate: '',
    history: false,
    dataHistory: null,
    showInfo: false,
    dataHours: null,
  });

  const { date, minDate, maxDate, history, dataHistory, showInfo, dataHours } = state;

  useEffect(() => {
    setState({ ...state, minDate: getMinDateCalendar(), maxDate: getMaxDateCalendar() })
  }, [])

  useEffect(() => {
    if(date !== '') {
      const dateFormat = date.replaceAll('-', '/');
      const dateFormat2 = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`;

      const unixTime1 = Math.floor(new Date(dateFormat).getTime() / 1000)
      const unixTime2 = Math.floor(new Date(dateFormat2).getTime() / 1000)

      if(unixTime1 <= unixTime2) {
        getWeatherByDayHistory(position, unixTime1)
          .then(({data}: any) => {
            setState({ ...state, history: true, dataHistory: data })
          })
          .catch(e => {
            console.log(e);
          })
      } else {
        getWeatherByDayForecast(position)
          .then(({data}: any) => {
            setState({ ...state, history: false })
            console.log(data)
          })
          .catch(e => {
            console.log(e);
          })
      }
    }
  }, [date]);

  const handleChange = ({ target }: any) => {
    setState({ ...state, date: target.value})
  };

  const handleClick = (e: CurrentDTO) => {
    setState({ ...state, showInfo: true, dataHours: e })
  };

  return (
    <div className={container}>
      <div>
        <label htmlFor='minDate'>Pick Date</label>
        <input id="minDate" type="date" value={date} min={minDate} max={maxDate} onChange={handleChange} />
        {
          history && (
            <ul className={listItems}>
              {
                dataHistory?.hourly.map((e: CurrentDTO) => (
                  <li
                    key={e.dt}
                    className={items}
                    onClick={() => handleClick(e)}
                  >
                    {getHours(e.dt)}
                  </li>
                ))
              }
            </ul>
          )
        }
      </div>
      <div className={containerCard}>
        {
          showInfo && (
            <div className={card}>
              <div className={cardColumnOne}>
                <label>Temperatura: {dataHours?.temp}</label>
                <label>Temperatura: {dataHours?.temp}</label>
                <label>Temperatura: {dataHours?.temp}</label>
              </div>
              <div className={cardColumnTwo}>
                <label>Temperatura: {dataHours?.temp}</label>
                <label>Temperatura: {dataHours?.temp}</label>
                <label>Temperatura: {dataHours?.temp}</label>
                <label>Temperatura: {dataHours?.temp}</label>
                <label>Temperatura: {dataHours?.temp}</label>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
