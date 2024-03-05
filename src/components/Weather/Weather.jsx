import React, { useState } from 'react';
import './Weather.sass';
import Search from '../../assets/search.png';
import Cloud from '../../assets/cloud.png';
import Drizzle from '../../assets/drizzle.png';
import Humidity from '../../assets/humidity.png';
import Rain from '../../assets/rain.png';
import Snow from '../../assets/snow.png';
import Wind from '../../assets/wind.png';
import Clear from '../../assets/clear.png';



export default function Weather() {
  const API_KEY = 'f91efe0fc5bae03556229b36115cb46d';
  const [weatherData, setWeatherData] = useState({
    temperature: '',
    humidity: '',
    windSpeed: '',
    location: '',
  });
  const [weatherIcon, setWeatherIcon] = useState(Drizzle);
  const searchCityData = async () => {
    const input = document.querySelector('.input-search');
    if (input.value === '') {
      alert('Write something in input :)');
      return;
    }
    const URL_API = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${API_KEY}`;

    const data = await fetch(URL_API).then((response) => {
      return response.json();
    });
    setWeatherData({
      temperature: `${Math.floor(data.main.temp)}°C`,
      humidity: `${data.main.humidity}%`,
      windSpeed: `${Math.floor(data.wind.speed)} km/h`,
      location: data.name,
    });
    if (
      data.weather[0].icon === '01d' ||
      data.weather[0].icon === '01n' ||
      data.weather[0].icon === '02d' ||
      data.weather[0].icon === '02n'
    ) {
      setWeatherIcon(Cloud);
    } else if (
      data.weather[0].icon === '03d' ||
      data.weather[0].icon === '03n' ||
      data.weather[0].icon === '04d' ||
      data.weather[0].icon === '04n'
    ) {
      setWeatherIcon(Drizzle);
    } else if (
      data.weather[0].icon === '09d' ||
      data.weather[0].icon === '09n' ||
      data.weather[0].icon === '10d' ||
      data.weather[0].icon === '10n'
    ) {
      setWeatherIcon(Rain);
    } else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
      setWeatherIcon(Snow);
    } else {
      setWeatherIcon(Clear);
    }
  };
  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="input-search" placeholder="Search..." />
        <div className="search-icon" onClick={searchCityData}>
          <img src={Search} alt="search..." className="search" />
        </div>
      </div>
      <div className="weather-image-place">
        <img src={weatherIcon} alt="cloud" className="cloud" />
      </div>
      <div className="weather-temperature">
        {weatherData.temperature === '' ? '24°C' : weatherData.temperature}
      </div>
      <div className="location">
        {weatherData.location === '' ? 'London' : weatherData.location}
      </div>
      <div className="data-container">
        <div className="element">
          <img src={Humidity} alt="" className="icon" />
          <div className="data">
            <div className="humidity">
              {weatherData.humidity === '' ? '87%' : weatherData.humidity}
            </div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={Wind} alt="" className="icon" />
          <div className="data">
            <div className="wind-speed">
              {weatherData.windSpeed === '' ? '18 km/h' : weatherData.windSpeed}
            </div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
