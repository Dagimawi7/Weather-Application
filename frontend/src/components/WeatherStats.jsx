import './WeatherStats.css';

const WeatherStats = ({ weather }) => {
    if (!weather) return null;

    const { main, sys } = weather;

    // Calculate sunrise/sunset times
    const sunrise = new Date(sys.sunrise * 1000);
    const sunset = new Date(sys.sunset * 1000);
    const sunriseTime = sunrise.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const sunsetTime = sunset.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    // Calculate day length
    const dayLength = (sys.sunset - sys.sunrise) / 3600;
    const hours = Math.floor(dayLength);
    const minutes = Math.round((dayLength - hours) * 60);

    return (
        <div className="weather-stats">
            <div className="stats-grid">
                <div className="stat-card glass-card">
                    <div className="stat-icon">🌅</div>
                    <div className="stat-content">
                        <div className="stat-label">Sunrise</div>
                        <div className="stat-value">{sunriseTime}</div>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-icon">🌇</div>
                    <div className="stat-content">
                        <div className="stat-label">Sunset</div>
                        <div className="stat-value">{sunsetTime}</div>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-icon">⏱️</div>
                    <div className="stat-content">
                        <div className="stat-label">Day Length</div>
                        <div className="stat-value">{hours}h {minutes}m</div>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-icon">🌡️</div>
                    <div className="stat-content">
                        <div className="stat-label">Sea Level</div>
                        <div className="stat-value">{main.sea_level || main.pressure} hPa</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherStats;
