import './LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Loading...' }) => {
    return (
        <div className="loading-container">
            <div className="weather-loader">
                <div className="sun"></div>
                <div className="cloud"></div>
            </div>
            <p className="loading-message">{message}</p>
        </div>
    );
};

export default LoadingSpinner;
