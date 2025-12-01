# 🌤️ Modern Weather Application

A full-stack weather application built with **React** and **FastAPI** that provides real-time weather data, 5-day forecasts, and a stunning user interface designed to impress.

![Weather App](https://img.shields.io/badge/React-18-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green) ![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

### 🎨 **Premium UI/UX**
- **Glassmorphism Design**: Modern frosted glass effects with backdrop blur
- **Dynamic Backgrounds**: Background gradients that change based on weather conditions
- **Smooth Animations**: Micro-interactions, hover effects, and page transitions
- **Dark/Light Themes**: Toggle between themes with smooth transitions
- **Fully Responsive**: Perfect on mobile, tablet, and desktop devices

### 🌍 **Weather Features**
- **Real-time Weather Data**: Current temperature, humidity, wind speed, pressure, and more
- **5-Day Forecast**: Daily weather predictions with high/low temperatures
- **Hourly Forecast**: 24-hour forecast with scrollable timeline
- **Location Search**: Autocomplete search with city suggestions
- **Geolocation**: Automatically detect and use your current location
- **Unit Conversion**: Switch between Celsius/Fahrenheit
- **Weather Icons**: Beautiful emoji-based weather icons

### 🔧 **Technical Features**
- **RESTful API**: Professional FastAPI backend with multiple endpoints
- **Error Handling**: Comprehensive error handling and user feedback
- **Local Storage**: Save preferences (theme, units)
- **Responsive Design**: Mobile-first approach with breakpoints
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🚀 Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API requests
- **CSS3** - Custom design system with variables
- **Google Fonts** - Inter & Outfit fonts

### Backend
- **FastAPI** - High-performance Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **Python-dotenv** - Environment configuration
- **OpenWeatherMap API** - Weather data provider

## 📦 Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn
- OpenWeatherMap API key ([Get one free here](https://openweathermap.org/api))

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```

5. **Run the backend server**
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## 🎯 Usage

1. **Search for a city**: Type a city name in the search bar
2. **Use autocomplete**: Select from suggested locations
3. **Get current location**: Click the location button (📍)
4. **Toggle units**: Switch between °C and °F
5. **Change theme**: Click the theme toggle (🌙/☀️) in the top-right

## 📡 API Endpoints

### Weather Endpoints

- `GET /` - API health check
- `GET /api/weather/current/{city}` - Get current weather for a city
- `GET /api/weather/coordinates?lat={lat}&lon={lon}` - Get weather by coordinates
- `GET /api/weather/forecast/{city}` - Get 5-day forecast
- `GET /api/weather/search/{query}` - Search locations (autocomplete)
- `GET /api/weather/air-quality/{city}` - Get air quality data

### Query Parameters

- `units` - Temperature units (`metric` for Celsius, `imperial` for Fahrenheit)
- `limit` - Number of search results (1-10)

### Example Request

```bash
curl http://localhost:8000/api/weather/current/London?units=metric
```

## 🏗️ Project Structure

```
Weather-Application/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example        # Environment template
│   └── .env                # Your API keys (not in git)
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── SearchBar.jsx
│   │   │   ├── CurrentWeather.jsx
│   │   │   ├── Forecast.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── services/       # API services
│   │   │   └── api.js
│   │   ├── App.jsx         # Main app component
│   │   ├── App.css         # App styles
│   │   ├── index.css       # Design system
│   │   └── main.jsx        # Entry point
│   ├── index.html          # HTML template
│   ├── package.json        # Node dependencies
│   └── vite.config.js      # Vite configuration
└── README.md               # This file
```

## 🎨 Design System

The application uses a comprehensive design system with:
- **CSS Variables**: Consistent colors, spacing, and typography
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Gradients**: Dynamic color gradients based on weather
- **Animations**: Smooth transitions and micro-interactions
- **Responsive Grid**: Mobile-first responsive design

## 🌟 Key Features for Recruiters

This project demonstrates:

✅ **Full-Stack Development**: Complete frontend and backend integration  
✅ **Modern React**: Hooks, state management, and component architecture  
✅ **RESTful API Design**: Professional FastAPI backend with proper error handling  
✅ **UI/UX Design**: Premium interface with attention to detail  
✅ **Responsive Design**: Mobile-first approach with breakpoints  
✅ **Code Organization**: Clean, maintainable, and well-structured code  
✅ **API Integration**: External API consumption with error handling  
✅ **State Management**: Local storage, theme persistence  
✅ **Performance**: Optimized builds and fast load times  

## 🚀 Deployment

### Backend Deployment
Deploy to platforms like:
- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repo
- **DigitalOcean**: Use App Platform
- **AWS**: EC2 or Elastic Beanstalk

### Frontend Deployment
Deploy to platforms like:
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: `npm run build` + gh-pages
- **Cloudflare Pages**: Connect GitHub repo

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 About the Developer

Built by an aspiring full-stack developer passionate about creating beautiful, functional web applications. This project showcases skills in:
- Modern JavaScript/React development
- Python/FastAPI backend development
- UI/UX design and implementation
- API integration and data handling
- Responsive web design

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons and emojis from Unicode standard
- Fonts from [Google Fonts](https://fonts.google.com/)

---

**⭐ If you like this project, please give it a star!**
