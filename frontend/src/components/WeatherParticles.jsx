import { useEffect, useRef } from 'react';
import './WeatherParticles.css';

const WeatherParticles = ({ weatherId }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Particle class
        class Particle {
            constructor(type) {
                this.type = type;
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = this.type === 'snow' ? -10 : (this.type === 'cloud' ? Math.random() * (canvas.height / 3) : Math.random() * -canvas.height);
                this.speed = this.type === 'snow' ? Math.random() * 1 + 0.5 : (this.type === 'cloud' ? Math.random() * 0.2 + 0.1 : Math.random() * 2 + 2);
                this.size = this.type === 'snow' ? Math.random() * 3 + 2 : (this.type === 'cloud' ? Math.random() * 60 + 40 : Math.random() * 2 + 1);
                this.opacity = this.type === 'cloud' ? Math.random() * 0.3 + 0.1 : Math.random() * 0.5 + 0.3;
                this.drift = this.type === 'snow' ? Math.random() * 0.5 - 0.25 : (this.type === 'cloud' ? 0.3 : 0);
            }

            update() {
                if (this.type === 'cloud') {
                    this.x += this.drift;
                } else {
                    this.y += this.speed;
                    this.x += this.drift;
                }

                if (this.y > canvas.height && this.type !== 'cloud') {
                    this.reset();
                }
                if (this.x > canvas.width + 100) {
                    this.x = -100;
                } else if (this.x < -100) {
                    this.x = canvas.width + 100;
                } else if ((this.x < 0 || this.x > canvas.width) && this.type !== 'cloud') {
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Clear existing particles
        particlesRef.current = [];

        // Create particles based on weather
        let particleCount = 0;
        let particleType = null;

        if (weatherId >= 200 && weatherId < 300) {
            // Thunderstorm - rain with occasional flashes
            particleCount = 150;
            particleType = 'rain';
        } else if (weatherId >= 300 && weatherId < 600) {
            // Drizzle/Rain
            particleCount = weatherId >= 500 ? 150 : 80;
            particleType = 'rain';
        } else if (weatherId >= 600 && weatherId < 700) {
            // Snow
            particleCount = 100;
            particleType = 'snow';
        } else if (weatherId > 800) {
            // Clouds
            particleCount = 15;
            particleType = 'cloud';
        }

        if (particleCount > 0 && particleType) {
            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push(new Particle(particleType));
            }
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach(particle => {
                particle.update();
                particle.draw();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        if (particlesRef.current.length > 0) {
            animate();
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [weatherId]);

    // Don't render canvas if no particles needed
    if (!weatherId || (weatherId < 200 || (weatherId >= 700 && weatherId <= 800))) {
        return null;
    }

    return <canvas ref={canvasRef} className="weather-particles" />;
};

export default WeatherParticles;
