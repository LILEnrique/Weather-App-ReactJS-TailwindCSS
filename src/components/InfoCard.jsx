import React from 'react';
import moment from 'moment';

const InfoCard = ({ data, getWeatherIcon }) => {
  const weatherIcon = getWeatherIcon(data.list[0].weather[0].main);

  const { clouds, main, weather } = data.list[0];
  return (
    <div className="container p-4 flex items-center justify-center shadow-md rounded-lg bg-white bg-opacity-30 h-1/3 ">
      <div className="my-auto p-4">
        <p className="font-bold text-5xl text-orange-600 mb-2">
          {Math.round(main.temp)}&deg;C
        </p>
        <p className="text-4xl text-white tracking-widest">{weather[0].main}
          {weatherIcon}
        </p>
        <p className="text-white text-xs uppercase tracking-widest">
          {weather[0].description}
        </p>
        <p className="tracking-wider text-orange-600">{moment().format("dddd MMM YYYY")}</p>
      </div>
      <div className="my-2 border-l-2 text-white border-white p-2">
        <p>Sensación Térmica: {Math.round(main.feels_like)}&deg;C</p>
        <p>Humedad: {main.humidity}%</p>
        <p>Cobertura de Nubes: {clouds.all}%</p>
        <p>Temperatura Mín: {Math.round(main.temp_min)}&deg;C</p>
        <p>Temperatura Máx: {Math.round(main.temp_max)}&deg;C</p>

      </div>
    </div>
  );
};

export default InfoCard;
