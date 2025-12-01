import { useState, useEffect } from 'react';
import { storage } from '../services/api';
import './Favorites.css';

const Favorites = ({ onSelectCity, currentCity }) => {
    const [favorites, setFavorites] = useState(storage.getFavorites());
    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        setFavorites(storage.getFavorites());
    }, [currentCity]);

    const handleAddFavorite = () => {
        if (currentCity && !favorites.includes(currentCity)) {
            storage.addFavorite(currentCity);
            setFavorites(storage.getFavorites());
        }
    };

    const handleRemoveFavorite = (city) => {
        storage.removeFavorite(city);
        setFavorites(storage.getFavorites());
    };

    const isFavorite = currentCity && favorites.includes(currentCity);

    return (
        <div className="favorites-container">
            {currentCity && (
                <button
                    className={`btn-favorite ${isFavorite ? 'is-favorite' : ''}`}
                    onClick={handleAddFavorite}
                    disabled={isFavorite}
                    title={isFavorite ? 'Already in favorites' : 'Add to favorites'}
                >
                    {isFavorite ? '⭐' : '☆'} {isFavorite ? 'Saved' : 'Save'}
                </button>
            )}

            {favorites.length > 0 && (
                <>
                    <button
                        className="btn-show-favorites"
                        onClick={() => setShowFavorites(!showFavorites)}
                    >
                        📍 Favorites ({favorites.length})
                    </button>

                    {showFavorites && (
                        <div className="favorites-dropdown glass-card">
                            <div className="favorites-header">
                                <h3>Your Favorite Locations</h3>
                                <button
                                    className="btn-close"
                                    onClick={() => setShowFavorites(false)}
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="favorites-list">
                                {favorites.map((city, index) => (
                                    <div key={index} className="favorite-item">
                                        <button
                                            className="favorite-city-btn"
                                            onClick={() => {
                                                onSelectCity(city);
                                                setShowFavorites(false);
                                            }}
                                        >
                                            <span className="favorite-icon">📍</span>
                                            <span className="favorite-name">{city}</span>
                                        </button>
                                        <button
                                            className="btn-remove"
                                            onClick={() => handleRemoveFavorite(city)}
                                            title="Remove from favorites"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Favorites;
