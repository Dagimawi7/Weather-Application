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
                    <img src="https://img.icons8.com/?size=100&id=LZhC7swSWAxh&format=png&color=000000"
                        alt="save Icon"
                        style={{ width: '20px', height: '20px' }} />
                    {isFavorite ? 'Saved' : 'Save'}
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
                                            <img src="https://img.icons8.com/?size=100&id=nerFBdXcYDve&format=png&color=000000"
                                                alt="delete Icon"
                                                style={{ width: '20px', height: '20px' }} />
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
