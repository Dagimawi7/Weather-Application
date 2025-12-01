import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/weather';

// API Service
export const weatherAPI = {
    // Get current weather by city name
    getCurrentWeather: async (city, units = 'metric') => {
        try {
            const response = await axios.get(`${API_BASE_URL}/current/${encodeURIComponent(city)}`, {
                params: { units }
            });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || 'Failed to fetch weather data'
            };
        }
    },

    // Get weather by coordinates
    getWeatherByCoordinates: async (lat, lon, units = 'metric') => {
        try {
            const response = await axios.get(`${API_BASE_URL}/coordinates`, {
                params: { lat, lon, units }
            });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || 'Failed to fetch weather data'
            };
        }
    },

    // Get 5-day forecast
    getForecast: async (city, units = 'metric') => {
        try {
            const response = await axios.get(`${API_BASE_URL}/forecast/${encodeURIComponent(city)}`, {
                params: { units }
            });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || 'Failed to fetch forecast data'
            };
        }
    },

    // Search locations (autocomplete)
    searchLocations: async (query) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/search/${encodeURIComponent(query)}`, {
                params: { limit: 5 }
            });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to search locations'
            };
        }
    },

    // Get air quality
    getAirQuality: async (city) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/air-quality/${encodeURIComponent(city)}`);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: 'Air quality data not available'
            };
        }
    }
};

// Weather icon mapping
export const getWeatherIcon = (weatherId, isDay = true) => {
    if (weatherId >= 200 && weatherId < 300) return '⛈️'; // Thunderstorm
    if (weatherId >= 300 && weatherId < 400) return '🌦️'; // Drizzle
    if (weatherId >= 500 && weatherId < 600) return '🌧️'; // Rain
    if (weatherId >= 600 && weatherId < 700) return '❄️'; // Snow
    if (weatherId >= 700 && weatherId < 800) return '🌫️'; // Atmosphere
    if (weatherId === 800) return isDay ? '☀️' : '🌙'; // Clear
    if (weatherId > 800) return '☁️'; // Clouds
    return '🌡️';
};

// Get weather background gradient
export const getWeatherGradient = (weatherId, isDay = true) => {
    if (weatherId >= 200 && weatherId < 300) {
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    if (weatherId >= 500 && weatherId < 600) {
        return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
    }
    if (weatherId >= 600 && weatherId < 700) {
        return 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)';
    }
    if (weatherId === 800) {
        return isDay
            ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
            : 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
    }
    if (weatherId > 800) {
        return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    }
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
};

// Format temperature
export const formatTemp = (temp, units = 'metric') => {
    const rounded = Math.round(temp);
    return units === 'metric' ? `${rounded}°C` : `${rounded}°F`;
};

// Format date
export const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
};

// Format time
export const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};

// Get wind direction
export const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
};

// Local storage helpers
export const storage = {
    getFavorites: () => {
        try {
            return JSON.parse(localStorage.getItem('favorites') || '[]');
        } catch {
            return [];
        }
    },

    addFavorite: (city) => {
        const favorites = storage.getFavorites();
        if (!favorites.includes(city)) {
            favorites.push(city);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    },

    removeFavorite: (city) => {
        const favorites = storage.getFavorites();
        const filtered = favorites.filter(f => f !== city);
        localStorage.setItem('favorites', JSON.stringify(filtered));
    },

    getUnits: () => {
        return localStorage.getItem('units') || 'metric';
    },

    setUnits: (units) => {
        localStorage.setItem('units', units);
    },

    getTheme: () => {
        return localStorage.getItem('theme') || 'light';
    },

    setTheme: (theme) => {
        localStorage.setItem('theme', theme);
    }
};
