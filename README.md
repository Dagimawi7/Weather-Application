# 🌦️ SkyCast | Full-Stack Weather Dashboard

> A high-performance weather application bridging the gap between raw meteorological data and immersive UI/UX.

**[🔗 View Live Demo](https://weather-application-six-blush.vercel.app/)**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

---

## 📖 Overview
SkyCast is a modern weather dashboard that focuses on **data visualization** and **adaptive design**. While most weather apps provide static numbers, SkyCast uses dynamic theming and custom backend logic to create a premium, fluid user experience.

---

## 🛠️ Technical Highlights

### 1. Data Smoothing (The "Gap-Fill" Problem)
Free weather APIs often return data in 3-hour chunks (12 PM, 3 PM, etc.), which makes for a jagged forecast.
* **The Engineering Fix:** I implemented a **Linear Interpolation Algorithm** in the Python backend to calculate the estimated temperature for the hours in between.
* **Impact:** Users see a smooth, 24-hour granular forecast instead of "jumpy" data points.

### 2. Adaptive Glassmorphism UI
The interface reacts in real-time to the weather data provided by the API:
* **Sunny:** Transitions to a vibrant golden-orange gradient.
* **Rainy/Stormy:** Shifts to deep, moody blues and greys.
* **Dynamic Blur:** Uses CSS backdrop-filters (Glassmorphism) to ensure text remains legible regardless of the background color shift.

---

## 🚀 System Architecture

### Frontend
- **React + Vite:** For ultra-fast HMR and optimized production builds.
- **Tailwind CSS:** Utilizing a mobile-first grid system for 100% responsiveness.
- **Lucide React:** For consistent, clean iconography.

### Backend
- **FastAPI:** Asynchronous Python framework for high-performance API routing.
- **Uvicorn:** ASGI server implementation for lightning-fast request handling.
- **OpenWeatherMap API:** The primary data source for global meteorological metrics.

---

## ⚙️ Setup & Installation

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```
## 🎬 System in Action
https://github.com/user-attachments/assets/6ac117c3-bd2d-44cd-b328-b1aa46842db3




