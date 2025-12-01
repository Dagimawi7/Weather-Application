"""
FastAPI Backend for Weather Application
Provides comprehensive weather data including current conditions, forecasts, and location search
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Weather API",
    description="Comprehensive weather data API with forecasts and location search",
    version="2.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
API_KEY = os.getenv("OPENWEATHER_API_KEY", "b6f45dc68e71f414f7e3954f74906379")
BASE_URL = "https://api.openweathermap.org/data/2.5"
GEO_URL = "https://api.openweathermap.org/geo/1.0"


# Response Models
class WeatherResponse(BaseModel):
    success: bool
    data: Optional[Dict[str, Any]] = None
    error: Optional[str] = None


class ForecastResponse(BaseModel):
    success: bool
    data: Optional[Dict[str, Any]] = None
    error: Optional[str] = None


class LocationResult(BaseModel):
    name: str
    country: str
    state: Optional[str] = None
    lat: float
    lon: float


# Helper Functions
def make_api_request(url: str, params: dict) -> dict:
    """Make request to OpenWeatherMap API with error handling"""
    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        return {"success": True, "data": response.json()}
    except requests.exceptions.HTTPError as e:
        if response.status_code == 404:
            return {"success": False, "error": "Location not found"}
        elif response.status_code == 401:
            return {"success": False, "error": "Invalid API key"}
        else:
            return {"success": False, "error": f"API error: {str(e)}"}
    except requests.exceptions.Timeout:
        return {"success": False, "error": "Request timeout"}
    except requests.exceptions.RequestException as e:
        return {"success": False, "error": f"Network error: {str(e)}"}


# API Endpoints
@app.get("/")
def root():
    """API health check"""
    return {
        "status": "online",
        "message": "Weather API is running",
        "version": "2.0.0"
    }


@app.get("/api/weather/current/{city}")
def get_current_weather(
    city: str,
    units: str = Query("metric", regex="^(metric|imperial)$")
):
    """
    Get current weather for a city
    
    - **city**: City name (e.g., "London", "New York")
    - **units**: Temperature units (metric for Celsius, imperial for Fahrenheit)
    """
    params = {
        "q": city,
        "appid": API_KEY,
        "units": units
    }
    
    result = make_api_request(f"{BASE_URL}/weather", params)
    
    if not result["success"]:
        raise HTTPException(status_code=404, detail=result["error"])
    
    return result["data"]


@app.get("/api/weather/coordinates")
def get_weather_by_coordinates(
    lat: float = Query(..., ge=-90, le=90),
    lon: float = Query(..., ge=-180, le=180),
    units: str = Query("metric", regex="^(metric|imperial)$")
):
    """
    Get current weather by coordinates
    
    - **lat**: Latitude (-90 to 90)
    - **lon**: Longitude (-180 to 180)
    - **units**: Temperature units (metric or imperial)
    """
    params = {
        "lat": lat,
        "lon": lon,
        "appid": API_KEY,
        "units": units
    }
    
    result = make_api_request(f"{BASE_URL}/weather", params)
    
    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["error"])
    
    return result["data"]


@app.get("/api/weather/forecast/{city}")
def get_forecast(
    city: str,
    units: str = Query("metric", regex="^(metric|imperial)$")
):
    """
    Get 5-day weather forecast with 3-hour intervals
    
    - **city**: City name
    - **units**: Temperature units (metric or imperial)
    """
    params = {
        "q": city,
        "appid": API_KEY,
        "units": units
    }
    
    result = make_api_request(f"{BASE_URL}/forecast", params)
    
    if not result["success"]:
        raise HTTPException(status_code=404, detail=result["error"])
    
    return result["data"]


@app.get("/api/weather/search/{query}")
def search_locations(
    query: str,
    limit: int = Query(5, ge=1, le=10)
):
    """
    Search for locations (autocomplete)
    
    - **query**: Search query (city name)
    - **limit**: Maximum number of results (1-10)
    """
    params = {
        "q": query,
        "limit": limit,
        "appid": API_KEY
    }
    
    result = make_api_request(f"{GEO_URL}/direct", params)
    
    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["error"])
    
    # Format results
    locations = []
    for loc in result["data"]:
        locations.append({
            "name": loc.get("name"),
            "country": loc.get("country"),
            "state": loc.get("state"),
            "lat": loc.get("lat"),
            "lon": loc.get("lon")
        })
    
    return locations


@app.get("/api/weather/air-quality/{city}")
def get_air_quality(city: str):
    """
    Get air quality data for a city
    
    - **city**: City name
    """
    # First, get coordinates for the city
    geo_params = {
        "q": city,
        "limit": 1,
        "appid": API_KEY
    }
    
    geo_result = make_api_request(f"{GEO_URL}/direct", geo_params)
    
    if not geo_result["success"] or not geo_result["data"]:
        raise HTTPException(status_code=404, detail="Location not found")
    
    lat = geo_result["data"][0]["lat"]
    lon = geo_result["data"][0]["lon"]
    
    # Get air quality data
    aq_params = {
        "lat": lat,
        "lon": lon,
        "appid": API_KEY
    }
    
    result = make_api_request(f"{BASE_URL}/air_pollution", aq_params)
    
    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["error"])
    
    return result["data"]


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=True
    )
