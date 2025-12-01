# 🌦️ My Weather App

> A cool looking weather app that I built to learn React and Python.

![Weather App Demo](https://via.placeholder.com/800x400?text=Weather+App+Preview)

## 🚀 What is this?

This is a weather dashboard that shows you the current weather and forecast. I wanted to make something that didn't just show numbers, but actually looked nice and felt good to use. It changes colors based on if it's sunny, rainy, or cloudy.

## 💡 Cool Things I Built

### 1. Smoother Hourly Forecast
The free weather API I used only gives data every 3 hours (like 12 PM, 3 PM, 6 PM). That looked kind of choppy.
**How I fixed it**: I wrote a function that "guesses" the temperature for the hours in between. So if it's 20° at 12 PM and 23° at 3 PM, my code figures out it's probably 21° at 1 PM and 22° at 2 PM. Now it shows a smooth forecast for every single hour!

### 2. Dynamic Colors & Glass Effect
I used something called "Glassmorphism" to make the cards look like frosted glass.
Also, the whole app changes color based on the weather:
- **Sunny**: Bright orange/yellow gradient.
- **Rainy**: Blue/Green gradient.
- **Clear Night**: Dark blue gradient.
I used CSS variables for this so it switches instantly without reloading.

### 3. Works on Mobile
I spent a lot of time making sure it looks good on my phone too. On a computer, everything is spread out. On a phone, the boxes rearrange themselves into a neat 2x2 grid so you can see everything without zooming out.

## 🛠️ Tools I Used

- **Frontend**: React (to build the UI), Vite (to run it fast), and plain CSS (for the styling).
- **Backend**: Python with FastAPI (to talk to the weather API).

## 🏃‍♂️ How to Run It

If you want to try it out on your computer:

### 1. Start the Backend (Python)
This gets the weather data.

```bash
cd backend
# Install the libraries
pip install -r requirements.txt

# Run the server
python main.py
```

### 2. Start the Frontend (React)
This shows the website.

```bash
cd frontend
# Install the libraries
npm install

# Run the website
npm run dev
```

Then open `http://localhost:5173` in your browser!

