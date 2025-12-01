import { useState, useEffect, useRef } from 'react';
import { weatherAPI } from '../services/api';
import './SearchBar.css';

const SearchBar = ({ onSearch, onLocationSelect }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const searchRef = useRef(null);
    const debounceTimer = useRef(null);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounced search
    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        // Clear previous timer
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Set new timer
        debounceTimer.current = setTimeout(async () => {
            setIsSearching(true);
            const result = await weatherAPI.searchLocations(query);
            if (result.success) {
                setSuggestions(result.data);
                setShowSuggestions(true);
            }
            setIsSearching(false);
        }, 300);

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (location) => {
        const cityName = location.state
            ? `${location.name}, ${location.state}, ${location.country}`
            : `${location.name}, ${location.country}`;

        setQuery(cityName);
        setShowSuggestions(false);

        if (onLocationSelect) {
            onLocationSelect(location);
        } else {
            onSearch(location.name);
        }
    };

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    onLocationSelect({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        name: 'Current Location'
                    });
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    alert('Unable to get your location. Please enable location services.');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    };

    return (
        <div className="search-bar-container" ref={searchRef}>
            <form onSubmit={handleSubmit} className="search-form">
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for a city..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    />
                    {isSearching && <span className="search-loading">⏳</span>}
                </div>
                <button type="submit" className="btn-search" title="Search">
                    🔍
                </button>
            </form>

            <button type="button" className="btn-enable-location" onClick={handleGetLocation}>
                <span className="location-pin">📍</span> Enable Location Service
            </button>

            {showSuggestions && suggestions.length > 0 && (
                <div className="suggestions-dropdown">
                    {suggestions.map((location, index) => (
                        <div
                            key={index}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(location)}
                        >
                            <span className="suggestion-icon">📍</span>
                            <div className="suggestion-content">
                                <div className="suggestion-name">{location.name}</div>
                                <div className="suggestion-details">
                                    {location.state && `${location.state}, `}{location.country}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
