import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherService from './WeatherService';

function App() {
  const [city, setCity] = useState('');
  const [forecastData, setForecastData] = useState<any[]>([]);
  const savedCity = localStorage.getItem('city');

  useEffect(() => {
    const savedForecastData = JSON.parse(localStorage.getItem('forecastData') || '[]');

    if (savedCity) {
      setCity(savedCity);
    }

    if (savedForecastData.length > 0) {
      setForecastData(savedForecastData);
    }
  }, []);

  const fetchForecast = async () => {
    try {
      const weatherData = await WeatherService.getWeather(city);
      const forecast = await WeatherService.getForecast(weatherData.coord.lat, weatherData.coord.lon);
      setForecastData(forecast.list);

      localStorage.setItem('city', city);
      localStorage.setItem('forecastData', JSON.stringify(forecast.list));
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Weather Forecast App</h1>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-button" onClick={fetchForecast}>
          Get Forecast
        </button>
      </div>

      {forecastData.length > 0 && (
        <div className="forecast-container">
          <h2>Forecast of {savedCity} for 5 Days</h2>
          <table>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Temperature (°C)</th>
                <th>Weather</th>
              </tr>
            </thead>
            <tbody>
              {forecastData.map((forecast: any, index: number) => (
                <tr key={index}>
                  <td>{forecast.dt_txt}</td>
                  <td>{forecast.main.temp}°C</td>
                  <td>{forecast.weather[0].main}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
