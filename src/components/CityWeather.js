import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = "caf0bcbc3156f32d86b20e9fab3ba6b8";

const CityWeather = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim() !== '') {
      fetchWeather();
    }
  };

  return (
    <div>
      <h1>City Weather</h1>
      <input
        type="text"
        className="search"
        placeholder="Enter city name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>Search</button>
      {loading && <p>Loading...</p>}
      {weather && (
        <div className="weather">
          <h2>{weather.name}</h2>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default CityWeather;
