import React, { useContext, useState, useEffect } from 'react';
import { getWeatherByDayForecast, getWeatherByDayHistory } from 'api';
import { UserContext, UserContextValue } from 'providers/UserProvider';
import {
  dateToUnixTime,
  formatString,
  getHours,
  getMaxDateCalendar,
  getMinDateCalendar,
} from 'utils/utils';
import { WeatherHistoryDTO, Nulleable } from 'DTOs';
import { CurrentDTO } from 'DTOs/CurrentDTO';
import { Card } from 'components/Card/Card';
import { CalendarInput } from 'components/CalendarInput/CalendarInput';
import { TableWeather } from 'components/TableWeather/TableWeather';
import { formatCurrentDateToString } from '../../utils/utils';
import styles from './ByDay.module.scss';

const {
  listItems,
  items,
  container,
} = styles;

type State = {
  date: string;
  minDate: string;
  maxDate: string;
  history: boolean;
  showInfo: boolean;
  dataHistory: Nulleable<WeatherHistoryDTO>;
  dataHours: Nulleable<CurrentDTO>;
};

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

  const {
    date,
    minDate,
    maxDate,
    history,
    dataHistory,
    showInfo,
    dataHours
  } = state;

  useEffect(() => {
    setState({
      ...state,
      minDate: getMinDateCalendar(),
      maxDate: getMaxDateCalendar(),
    });
  }, []);

  useEffect(() => {
    if (date !== '') {
      const unixTime1 = dateToUnixTime(date);
      const unixTime2 = dateToUnixTime(formatCurrentDateToString());

      if (unixTime1 <= unixTime2) {
        getWeatherByDayHistory(position, unixTime1)
          .then(({ data }: any) => {
            setState({ ...state, history: true, dataHistory: data });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        getWeatherByDayForecast(position)
          .then(({ data }: any) => {
            setState({ ...state, history: false });
            console.log(data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [date]);

  const handleChange = ({ target }: any) => {
    setState({ ...state, date: target.value });
  };

  const handleClick = (e: CurrentDTO) => {
    setState({ ...state, showInfo: true, dataHours: e });
  };

  return (
    <div className={container}>
      <div>
        <CalendarInput
          label={'Elegir día'}
          date={date}
          minDate={minDate}
          maxDate={maxDate}
          handleChange={handleChange}
        />
        {history && (
          <ul className={listItems}>
            {dataHistory?.hourly.map((e: CurrentDTO) => (
              <li key={e.dt} className={items} onClick={() => handleClick(e)}>
                {getHours(e.dt)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        {showInfo && dataHours && dataHistory && (
          <Card title={formatString(dataHistory.timezone)}>
            <TableWeather dataHours={dataHours} />
          </Card>
        )}
      </div>
    </div>
  );
};
