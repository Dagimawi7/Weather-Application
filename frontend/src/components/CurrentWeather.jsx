import { getWeatherIcon, formatTemp, getWindDirection } from '../services/api';
import './CurrentWeather.css';

const CurrentWeather = ({ weather, units }) => {
    if (!weather) return null;

    const { main, weather: weatherInfo, wind, clouds, sys, name } = weather;
    const weatherId = weatherInfo[0].id;
    const isDay = sys && Date.now() / 1000 > sys.sunrise && Date.now() / 1000 < sys.sunset;

    return (
        <div className="current-weather fade-in">
            <div className="weather-hero">
                <div className="weather-icon-large pulse">
                    {getWeatherIcon(weatherId, isDay)}
                </div>

                <div className="weather-main-info">
                    <h1 className="temperature">{formatTemp(main.temp, units)}</h1>
                    <p className="weather-description">{weatherInfo[0].description}</p>
                    <p className="location">📍 {name}, {sys?.country}</p>
                </div>
            </div>

            <div className="weather-details-grid">
                <div className="detail-card glass-card">
                    <div className="detail-icon">🌡️</div>
                    <div className="detail-content">
                        <div className="detail-label">Feels Like</div>
                        <div className="detail-value">{formatTemp(main.feels_like, units)}</div>
                    </div>
                </div>

                <div className="detail-card glass-card">
                    <div className="detail-icon">💧</div>
                    <div className="detail-content">
                        <div className="detail-label">Humidity</div>
                        <div className="detail-value">{main.humidity}%</div>
                    </div>
                </div>

                <div className="detail-card glass-card">
                    <div className="detail-icon">💨</div>
                    <div className="detail-content">
                        <div className="detail-label">Wind</div>
                        <div className="detail-value">
                            {Math.round(wind.speed)} {units === 'metric' ? 'm/s' : 'mph'}
                            <span className="wind-direction"> {getWindDirection(wind.deg)}</span>
                        </div>
                    </div>
                </div>

                <div className="detail-card glass-card">
                    <div className="detail-icon">🔽</div>
                    <div className="detail-content">
                        <div className="detail-label">Pressure</div>
                        <div className="detail-value">{main.pressure} hPa</div>
                    </div>
                </div>

                <div className="detail-card glass-card">
                    <div className="detail-icon">👁️</div>
                    <div className="detail-content">
                        <div className="detail-label">Visibility</div>
                        <div className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</div>
                    </div>
                </div>

                <div className="detail-card glass-card">
                    <div className="detail-icon">☁️</div>
                    <div className="detail-content">
                        <div className="detail-label">Cloudiness</div>
                        <div className="detail-value">{clouds.all}%</div>
                    </div>
                </div>
            </div>

            {main.temp_min && main.temp_max && (
                <div className="temp-range glass-card">
                    <div className="temp-range-item">
                        <span className="temp-range-icon">🔻</span>
                        <span className="temp-range-label">Min</span>
                        <span className="temp-range-value">{formatTemp(main.temp_min, units)}</span>
                    </div>
                    <div className="temp-range-divider"></div>
                    <div className="temp-range-item">
                        <span className="temp-range-icon">🔺</span>
                        <span className="temp-range-label">Max</span>
                        <span className="temp-range-value">{formatTemp(main.temp_max, units)}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurrentWeather;
