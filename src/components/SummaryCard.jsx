import React from "react";
import moment from "moment";

const SummaryCard = ({ day, getWeatherIcon }) => {
  const weatherIcon = getWeatherIcon(day.weather[0].main);
  return (
    <li className="container p-4 flex items-center justify-center shadow-md bg-white bg-opacity-20 rounded-lg my-auto mr-1">
      <div className="my-auto">
        <p className="font-bold text-3xl text-orange-600 mb-2">{Math.round(day.main.temp)}&deg;C</p>
        <p className="text-2xl text-zinc-100 tracking-widest">
          {day.weather[0].main}
          {weatherIcon}
        </p>
        <p className="text-white text-xs uppercase tracking-widest">{day.weather[0].description}</p>
        <p className="tracking-wider text-orange-600">{moment(day.dt_txt).format("dddd hh:mm")}am</p>
      </div>
    </li>
  );
};

export default SummaryCard;
