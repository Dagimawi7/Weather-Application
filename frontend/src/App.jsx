import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import LoadingSpinner from './components/LoadingSpinner';
import ThemeToggle from './components/ThemeToggle';
import WeatherParticles from './components/WeatherParticles';
import Favorites from './components/Favorites';
import WeatherStats from './components/WeatherStats';
import ClothingRecommendation from './components/ClothingRecommendation';
import { weatherAPI, storage, getWeatherGradient } from './services/api';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState(storage.getUnits());
  const [currentCity, setCurrentCity] = useState('');
  const [backgroundGradient, setBackgroundGradient] = useState('var(--primary-gradient)');

  // Load default city on mount
  useEffect(() => {
    const defaultCity = 'London';
    fetchWeatherData(defaultCity);
  }, []);

  // Update background based on weather
  useEffect(() => {
    if (weather && weather.weather) {
      const weatherId = weather.weather[0].id;
      const isDay = weather.sys && Date.now() / 1000 > weather.sys.sunrise && Date.now() / 1000 < weather.sys.sunset;
      setBackgroundGradient(getWeatherGradient(weatherId, isDay));
    }
  }, [weather]);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    setCurrentCity(city);

    try {
      // Fetch current weather
      const weatherResult = await weatherAPI.getCurrentWeather(city, units);
      if (!weatherResult.success) {
        setError(weatherResult.error);
        setLoading(false);
        return;
      }
      setWeather(weatherResult.data);

      // Fetch forecast
      const forecastResult = await weatherAPI.getForecast(city, units);
      if (forecastResult.success) {
        setForecast(forecastResult.data);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoordinates = async (lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const weatherResult = await weatherAPI.getWeatherByCoordinates(lat, lon, units);
      if (!weatherResult.success) {
        setError(weatherResult.error);
        setLoading(false);
        return;
      }
      setWeather(weatherResult.data);
      setCurrentCity(weatherResult.data.name);

      // Fetch forecast for the city
      const forecastResult = await weatherAPI.getForecast(weatherResult.data.name, units);
      if (forecastResult.success) {
        setForecast(forecastResult.data);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city) => {
    fetchWeatherData(city);
  };

  const handleLocationSelect = (location) => {
    if (location.lat && location.lon) {
      fetchWeatherByCoordinates(location.lat, location.lon);
    } else {
      fetchWeatherData(location.name);
    }
  };

  const toggleUnits = () => {
    const newUnits = units === 'metric' ? 'imperial' : 'metric';
    setUnits(newUnits);
    storage.setUnits(newUnits);
    if (currentCity) {
      fetchWeatherData(currentCity);
    }
  };

  return (
    <div className="app" style={{ '--dynamic-gradient': backgroundGradient }}>
      <div className="app-background"></div>

      {/* Weather Particles Animation */}
      {weather && weather.weather && (
        <WeatherParticles weatherId={weather.weather[0].id} />
      )}

      <ThemeToggle />

      <div className="container">
        <header className="app-header fade-in">
          <h1 className="app-title">
            <span className="title-icon">🌤️</span>
            Weather App
          </h1>
          <p className="app-subtitle">Real-time weather forecasts at your fingertips</p>
        </header>

        <div className="search-section fade-in">
          <SearchBar onSearch={handleSearch} onLocationSelect={handleLocationSelect} />

          <div className="controls-row">
            <button className="btn-units" onClick={toggleUnits}>
              {units === 'metric' ? '°C' : '°F'} | Switch to {units === 'metric' ? '°F' : '°C'}
            </button>

            <Favorites
              onSelectCity={handleSearch}
              currentCity={currentCity}
            />
          </div>
        </div>

        {loading && <LoadingSpinner message="Fetching weather data..." />}

        {error && (
          <div className="error-message glass-card fade-in">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && weather && (
          <>
            <CurrentWeather weather={weather} units={units} />
            <ClothingRecommendation weather={weather} units={units} />
            <WeatherStats weather={weather} />
            {forecast && <Forecast forecast={forecast} units={units} />}
          </>
        )}

        {!loading && !error && !weather && (
          <div className="welcome-message glass-card fade-in">
            <span className="welcome-icon">👋</span>
            <h2>Welcome to Weather App!</h2>
            <p>Search for a city to get started, or use your current location.</p>
          </div>
        )}
      </div>

      <footer className="app-footer">
        <p>Built with React & FastAPI | Weather data from OpenWeatherMap</p>
      </footer>
    </div>
  );
}

export default App;
