import './ClothingRecommendation.css';

const ClothingRecommendation = ({ weather, units }) => {
    if (!weather) return null;

    const { main, weather: weatherInfo, wind } = weather;
    const temp = main.temp;
    const weatherId = weatherInfo[0].id;
    const windSpeed = wind.speed;

    // Determine clothing based on temperature
    const getClothingSuggestion = () => {
        const tempC = units === 'metric' ? temp : (temp - 32) * 5 / 9;

        if (tempC < 0) {
            return {
                outfit: '🧥 Heavy winter coat, scarf, gloves, and warm boots',
                layers: 'Multiple layers recommended',
                icon: '🧥'
            };
        } else if (tempC < 10) {
            return {
                outfit: '🧥 Warm jacket, long pants, and closed shoes',
                layers: 'Layer up with a sweater',
                icon: '🧥'
            };
        } else if (tempC < 15) {
            return {
                outfit: '🧥 Light jacket or hoodie with jeans',
                layers: 'Bring a light layer',
                icon: '👔'
            };
        } else if (tempC < 20) {
            return {
                outfit: '👕 Long sleeve shirt or light sweater',
                layers: 'Comfortable casual wear',
                icon: '👕'
            };
        } else if (tempC < 25) {
            return {
                outfit: '👕 T-shirt and jeans or shorts',
                layers: 'Light clothing',
                icon: '👕'
            };
        } else if (tempC < 30) {
            return {
                outfit: '👕 Light t-shirt and shorts',
                layers: 'Stay cool and comfortable',
                icon: '🩳'
            };
        } else {
            return {
                outfit: '🩳 Tank top, shorts, and sandals',
                layers: 'Minimal clothing, stay hydrated',
                icon: '🩳'
            };
        }
    };

    // Determine if umbrella is needed
    const needsUmbrella = () => {
        // Rain conditions (drizzle, rain, thunderstorm)
        if (weatherId >= 200 && weatherId < 600) {
            return {
                needed: true,
                reason: 'Rain expected',
                icon: '☂️'
            };
        }
        // Snow
        if (weatherId >= 600 && weatherId < 700) {
            return {
                needed: true,
                reason: 'Snow expected',
                icon: '☂️'
            };
        }
        return {
            needed: false,
            reason: 'No rain expected',
            icon: '✅'
        };
    };

    // Additional accessories based on conditions
    const getAccessories = () => {
        const accessories = [];

        // Sunglasses for clear/sunny weather
        if (weatherId === 800) {
            accessories.push({ item: '😎 Sunglasses', reason: 'Sunny weather' });
        }

        // Hat for very hot weather
        const tempC = units === 'metric' ? temp : (temp - 32) * 5 / 9;
        if (tempC > 28) {
            accessories.push({ item: '🧢 Hat', reason: 'Protect from sun' });
        }

        // Scarf for cold and windy
        if (tempC < 10 && windSpeed > 5) {
            accessories.push({ item: '🧣 Scarf', reason: 'Cold and windy' });
        }

        return accessories;
    };

    const clothing = getClothingSuggestion();
    const umbrella = needsUmbrella();
    const accessories = getAccessories();

    return (
        <div className="clothing-recommendation fade-in">
            <h2 className="recommendation-title">
                <span className="title-icon">👔</span>
                What to Wear
            </h2>

            <div className="recommendation-grid">
                {/* Main Outfit Suggestion */}
                <div className="recommendation-card glass-card">
                    <div className="card-header">
                        <span className="card-icon">{clothing.icon}</span>
                        <h3>Outfit Suggestion</h3>
                    </div>
                    <p className="outfit-text">{clothing.outfit}</p>
                    <p className="layer-text">{clothing.layers}</p>
                </div>

                {/* Umbrella Recommendation */}
                <div className={`recommendation-card glass-card ${umbrella.needed ? 'umbrella-needed' : 'umbrella-not-needed'}`}>
                    <div className="card-header">
                        <span className="card-icon">{umbrella.icon}</span>
                        <h3>Umbrella</h3>
                    </div>
                    <p className="umbrella-status">
                        {umbrella.needed ? '✅ Bring an umbrella' : '❌ No umbrella needed'}
                    </p>
                    <p className="umbrella-reason">{umbrella.reason}</p>
                </div>

                {/* Accessories */}
                {accessories.length > 0 && (
                    <div className="recommendation-card glass-card accessories-card">
                        <div className="card-header">
                            <span className="card-icon">🎒</span>
                            <h3>Don't Forget</h3>
                        </div>
                        <div className="accessories-list">
                            {accessories.map((acc, index) => (
                                <div key={index} className="accessory-item">
                                    <span className="accessory-name">{acc.item}</span>
                                    <span className="accessory-reason">{acc.reason}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Weather Comfort Tip */}
                <div className="recommendation-card glass-card comfort-card">
                    <div className="card-header">
                        <span className="card-icon">💡</span>
                        <h3>Comfort Tip</h3>
                    </div>
                    <p className="comfort-text">
                        {main.humidity > 80 ? '💧 High humidity - dress in breathable fabrics' :
                            main.humidity < 30 ? '🌵 Low humidity - stay hydrated and moisturize' :
                                wind.speed > 10 ? '💨 Windy conditions - secure loose clothing' :
                                    '✨ Perfect conditions for outdoor activities!'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ClothingRecommendation;
