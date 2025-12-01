import { getWeatherIcon, formatTemp, formatDate } from '../services/api';
import './Forecast.css';

const Forecast = ({ forecast, units }) => {
    if (!forecast || !forecast.list) return null;

    // Group forecast by day
    const dailyForecasts = {};

    forecast.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();

        if (!dailyForecasts[dateKey]) {
            dailyForecasts[dateKey] = {
                date: item.dt,
                temps: [],
                weather: item.weather[0],
                items: []
            };
        }

        dailyForecasts[dateKey].temps.push(item.main.temp);
        dailyForecasts[dateKey].items.push(item);
    });

    // Get daily summaries (max 5 days)
    const dailySummaries = Object.values(dailyForecasts)
        .slice(0, 5)
        .map(day => ({
            date: day.date,
            weather: day.weather,
            tempMin: Math.min(...day.temps),
            tempMax: Math.max(...day.temps),
            items: day.items
        }));

    return (
        <div className="forecast-container">
            <h2 className="forecast-title">5-Day Forecast</h2>

            <div className="forecast-grid">
                {dailySummaries.map((day, index) => (
                    <div key={index} className="forecast-card glass-card slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="forecast-date">{formatDate(day.date)}</div>

                        <div className="forecast-icon">
                            {getWeatherIcon(day.weather.id)}
                        </div>

                        <div className="forecast-description">
                            {day.weather.description}
                        </div>

                        <div className="forecast-temps">
                            <div className="forecast-temp-item">
                                <span className="temp-label">High</span>
                                <span className="temp-value temp-high">{formatTemp(day.tempMax, units)}</span>
                            </div>
                            <div className="forecast-temp-divider"></div>
                            <div className="forecast-temp-item">
                                <span className="temp-label">Low</span>
                                <span className="temp-value temp-low">{formatTemp(day.tempMin, units)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Hourly Forecast for Today */}
            <div className="hourly-forecast">
                <h3 className="hourly-title">Today's Hourly Forecast</h3>
                <div className="hourly-scroll">
                    {forecast.list.slice(0, 8).map((item, index) => {
                        const date = new Date(item.dt * 1000);
                        const hour = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });

                        return (
                            <div key={index} className="hourly-item glass-card">
                                <div className="hourly-time">{hour}</div>
                                <div className="hourly-icon">{getWeatherIcon(item.weather[0].id)}</div>
                                <div className="hourly-temp">{formatTemp(item.main.temp, units)}</div>
                                <div className="hourly-detail">
                                    <span className="hourly-detail-icon">💧</span>
                                    <span>{item.main.humidity}%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Forecast;
