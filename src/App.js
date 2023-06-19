import React, { useState } from "react"
import InfoCard from "./components/InfoCard"
import SummaryCard from "./components/SummaryCard"
import { TiWeatherSunny, TiWeatherDownpour, TiWeatherCloudy, TiWeatherSnow, TiWeatherStormy, TiWeatherPartlySunny } from 'react-icons/ti';
import { MdAddLocationAlt, MdSearch, MdLocationOn } from 'react-icons/md';
import Logo from './assets/Logo.png';
import hero from './assets/bbblurry.svg';

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY

  const [noData, setNoData] = useState('Sin datos')
  const [searchTerm, setSearchTerm] = useState('')
  const [weatherData, setWeatherData] = useState([])
  const [city, setCity] = useState('Ubicación desconocida')

  const handleChange = input => {
    const { value } = input.target
    setSearchTerm(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getWeather(searchTerm)
  }

  const getWeather = async (location) => {
    setWeatherData([]);
    let how_to_search = typeof location === 'string' ? `q=${location}` : `lat=${location[0]}&lon=${location[1]}`;

    try {
      let res = await fetch(`${process.env.REACT_APP_URL + how_to_search}&lang=es&appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`);
      let data = await res.json();
      if (data.cod != 200) {
        setNoData('Ubicación no encontrada');
        return;
      }
      setWeatherData(data);
      console.log(data);
      setCity(`${data.city.name}, ${data.city.country}`);
    } catch (error) {
      console.log(error);
    }
  };

  const myIP = (location) => {
    const { latitude, longitude } = location.coords
    getWeather([latitude, longitude])
  }

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'Clear':
        return <TiWeatherSunny />;
      case 'Rain':
        return <TiWeatherDownpour />;
      case 'Clouds':
        return <TiWeatherCloudy />;
      case 'Snow':
        return <TiWeatherSnow />;
      case 'Thunderstorm':
        return <TiWeatherStormy />;
      case 'Haze':
        return <TiWeatherPartlySunny />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row md:items-center md:justify-center m-auto sm:py-0 md:py-10 h-screen md:overflow-hidden ">
      <img src={hero} className="absolute top-0 left-0 w-screen h-screen object-cover" alt="Hero SVG" />
      <div className=" z-10 flex flex-col lg:flex-row md:w-3/4 sm:w-full sm:h-screen md:h-full lg:h-full xl:h-full  md:rounded-3xl shadow-lg  bg-gradient-to-r from-rose-400 to-orange-300">
        {/* form card section */}
        <div className="font-bold sm:w-full md:w-1/2 lg:w-1/2 h-auto">
          <div className="flex items-center justify-center">
            <img src={Logo} className="mr-auto h-20 p-3"></img>
            <div className="flex p-2 text-gray-100 bg-white bg-opacity-20 rounded-lg mr-2">
              <MdLocationOn className=" my-auto" />
              <div className="text-right">
                <p className="font-semibold text-sm ml-2">{city}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full mb-10">
            <h1 className="text-white text-2xl text-center mb-5">El tiempo by CatPsycho x OpenWeatherMap</h1>
            <form noValidate onSubmit={handleSubmit} className="flex justify-center w-full">
              <input
                type="text"
                placeholder="Ingresa ubicación"
                className="relative rounded-xl py-2 px-3 w-2/3 bg-white bg-opacity-20 text-white placeholder-white font-normal"
                onChange={handleChange}
                required
              />
              <button type="submit" className="z-10">
                <MdSearch className=" text-white -ml-8  my-auto z-10 cursor-pointer text-xl" />
              </button>
              <MdAddLocationAlt className="my-auto  cursor-pointer text-white text-xl mx-1"
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(myIP);
                }} />
            </form>
          </div>
        </div>
        {/* info card section */}
        <div className="sm:w-full md:w-1/2 lg:w-1/2 p-10 min-h-screen">
          <div className="flex flex-col">
            {/* card jsx */}
            {weatherData.length === 0 ? (
              <div className="container p-4 flex items-center justify-center h-1/3 mb-auto">
                <h1 className="text-4xl font-bold uppercase text-white">{noData}</h1>
              </div>
            ) : (
              <>
                <h1 className="text-4xl text-zinc-100 mt-auto mb-4">El tiempo hoy </h1>
                <InfoCard data={weatherData} getWeatherIcon={getWeatherIcon} />
                <h1 className="text-2xl text-zinc-100 mb-4 mt-6">Pronóstico en {city}</h1>
                <ul className="grid grid-cols-2 gap-2">
                  {weatherData.list.map((days, index) => {
                    if (index > 0) {
                      return <SummaryCard key={index} day={days} getWeatherIcon={getWeatherIcon} />;
                    }
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
