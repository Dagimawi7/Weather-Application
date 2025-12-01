import { useEffect, useState } from 'react';
import { storage } from '../services/api';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(storage.getTheme());

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        storage.setTheme(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            className="theme-toggle btn-icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
};

export default ThemeToggle;
