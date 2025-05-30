import sys
import random
import requests
from PyQt5.QtWidgets import (QApplication, QWidget, QLabel, QLineEdit, QPushButton, QVBoxLayout, QGraphicsScene, QGraphicsView, QGraphicsEllipseItem)
from PyQt5.QtCore import Qt, QTimer, QRectF
from PyQt5.QtGui import QColor, QPainter  # Import QPainter here


class WeatherApp(QWidget):
    def __init__(self):
        super().__init__()

        # Initialize UI components 
        self.city_label = QLabel("Enter city name: ", self)
        self.city_input = QLineEdit(self)
        self.get_weather_button = QPushButton("Get Weather", self)
        self.temperature_label = QLabel(self)
        self.emoji_label = QLabel(self)
        self.description_label = QLabel(self)

        # Create the animation area (Graphics View)
        self.graphics_view = QGraphicsView(self)
        self.graphics_scene = QGraphicsScene(self)

        # Set the layout for the window
        self.initUI()

        # Timer for animating balls
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.animate_balls)
        self.timer.start(50)

        # List to store the animated balls
        self.balls = []

    def initUI(self):
        self.setWindowTitle("Weather App")
        vbox = QVBoxLayout()
        
        # Add widgets to the layout
        vbox.addWidget(self.city_label)
        vbox.addWidget(self.city_input)
        vbox.addWidget(self.get_weather_button)
        vbox.addWidget(self.temperature_label)
        vbox.addWidget(self.emoji_label)
        vbox.addWidget(self.description_label)

        # Set the layout
        self.setLayout(vbox)

        # Set up the graphics view for the animation
        self.graphics_view.setScene(self.graphics_scene)
        self.graphics_view.setRenderHint(QPainter.Antialiasing)
        self.graphics_view.setGeometry(0, 0, 400, 400)  # Adjust the size of the animation area
        vbox.addWidget(self.graphics_view)

        self.city_label.setAlignment(Qt.AlignCenter)
        self.city_input.setAlignment(Qt.AlignCenter)
        self.temperature_label.setAlignment(Qt.AlignCenter)
        self.emoji_label.setAlignment(Qt.AlignCenter)
        self.description_label.setAlignment(Qt.AlignCenter)

        self.city_label.setObjectName("city_label")
        self.city_input.setObjectName("city_input")
        self.get_weather_button.setObjectName("get_weather_button")
        self.temperature_label.setObjectName("temperature_label")
        self.emoji_label.setObjectName("emoji_label")
        self.description_label.setObjectName("description_label")

        self.setStyleSheet("""
            QWidget {
                background-color: black;
            }
            QLabel, QPushButton {
                color: white;
                font-family: calibri;
            }
            QLabel#city_label {
                font-size: 40px;
                font-style: italic;
            }
            QLineEdit#city_input {
                font-size: 40px;
                width: 400px;
                height: 60px;
                padding: 10px;
                color: white;
                background-color: black;
            }
            QPushButton#get_weather_button {
                font-size: 30px;
                font-weight: bold;
                background-color: #444;
                border: 1px solid #666;
            }
            QLabel#temperature_label {
                font-size: 75px;
            }
            QLabel#emoji_label {
                font-size: 100px;
                font-family: Segoe UI emoji;
            }
            QLabel#description_label {
                font-size: 50px;
            }
        """)

        self.get_weather_button.clicked.connect(self.get_weather)

    def create_ball(self):
        # Create a small white ball
        ball = QGraphicsEllipseItem(0, 0, 10, 10)
        ball.setBrush(QColor(255, 255, 255))  # Set ball color to white
        ball.setPos(random.randint(0, 400), random.randint(0, 400))  # Random initial position
        self.graphics_scene.addItem(ball)
        self.balls.append(ball)

    def animate_balls(self):
        # Create new balls randomly
        if random.random() < 0.1:  # 10% chance to create a new ball
            self.create_ball()

        # Animate each ball (move them randomly)
        for ball in self.balls:
            x, y = ball.pos().x(), ball.pos().y()
            new_x = x + random.randint(-5, 5)
            new_y = y + random.randint(-5, 5)

            # Ensure the ball stays inside the bounds
            if new_x < 0:
                new_x = 0
            if new_x > 400:
                new_x = 400
            if new_y < 0:
                new_y = 0
            if new_y > 400:
                new_y = 400

            ball.setPos(new_x, new_y)

    def get_weather(self):
        """
            Fetches real-time weather data from OpenWeatherMap API.

            Includes error handling:
            - Handles HTTP errors (e.g., 404 city not found)
            - Handles other request exceptions (e.g., network problems)

            This ensures the app doesn't crash and shows user-friendly error messages.

            The project is also set up with GitHub Actions (outside this code)
            for automated testing and Continuous Integration (CI),
            meaning every time code is updated, tests run automatically
            to catch errors early and keep the app stable.
         """

        api_key = "b6f45dc68e71f414f7e3954f74906379"
        city = self.city_input.text()
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"

        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()

            if data["cod"] == 200:
                self.display_weather(data)

        except requests.exceptions.HTTPError as http_error:
            self.display_error(f"HTTP error occurred: {http_error}")

        except requests.exceptions.RequestException as req_error:
            self.display_error(f"Request Error: {req_error}")

    def display_error(self, message):
        self.temperature_label.setStyleSheet("font-size: 30px;")
        self.temperature_label.setText(message)
        self.emoji_label.clear()
        self.description_label.clear()

    def display_weather(self, data):
        self.temperature_label.setStyleSheet("font-size: 75px;")
        temperature_k = data["main"]["temp"]
        temperature_f = (temperature_k * 9/5) - 459.67
        weather_id = data["weather"][0]["id"]
        weather_description = data["weather"][0]["description"]

        self.temperature_label.setText(f"{temperature_f:.0f}°F")
        self.emoji_label.setText(self.get_weather_emoji(weather_id))
        self.description_label.setText(weather_description)

    @staticmethod
    def get_weather_emoji(weather_id):
        if 200 <= weather_id <= 232:
            return "⛈"
        elif 300 <= weather_id <= 321:
            return "🌦"
        elif 500 <= weather_id <= 531:
            return "🌧"
        elif 600 <= weather_id <= 622:
            return "❄"
        elif 701 <= weather_id <= 741:
            return "🌫"
        elif weather_id == 762:
            return "🌋"
        elif weather_id == 771:
            return "💨"
        elif weather_id == 781:
            return "🌪"
        elif weather_id == 800:
            return "☀"
        elif 801 <= weather_id <= 804:
            return "☁"
        else:
            return ""


if __name__ == "__main__":
    app = QApplication(sys.argv)
    weather_app = WeatherApp()
    weather_app.show()
    sys.exit(app.exec_())
