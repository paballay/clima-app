import React from 'react';
import { CurrentDTO } from 'DTOs/CurrentDTO';
import { getIconWeather } from 'utils/constants';
import style from './TableWeather.module.scss';

const { cardColumnOne, cardColumnTwo, cardcontainer } = style;

type Props = {
  dataHours: CurrentDTO
}

export const TableWeather = ({ dataHours }: Props) => {
  return (
    <>
      <div className={cardcontainer}>
        <div className={cardColumnOne}>
          <label>Temperatura: {dataHours.temp}</label>
          <label>Sensación Termica: {dataHours.feels_like}</label>
          <label>Humedad: {dataHours.humidity}%</label>
        </div>
        <div className={cardColumnTwo}>
          <label>Descripcion: {dataHours.weather[0].description}</label>
          <img src={getIconWeather(dataHours.weather[0].icon)} alt='icon weather' />
        </div>
      </div>
    </>
  )
}
