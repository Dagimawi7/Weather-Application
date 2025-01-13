import sys
import requests
# Importing the necessary modules from PyQt5 to create a graphical user interface (GUI)
from PyQt5.QtWidgets import (QApplication, QWidget, QLabel, QLineEdit, QPushButton, QVBoxLayout)
from PyQt5.QtCore import Qt

# Define the WeatherApp class which inherits from QWidget (base class for GUI objects in PyQt)
class WeatherApp(QWidget):
    def __init__(self):
        super().__init__()
        
        # Initialize UI components (labels, input field, and button)
        self.city_label = QLabel("Enter city name: ", self)  # Label for the city input prompt
        self.city_input = QLineEdit(self)  # Input field for user to type in a city name
        self.get_weather_button = QPushButton("Get Weather", self)  # Button to fetch weather information
        self.temperature_label = QLabel(self)  # Label to display temperature
        self.emoji_label = QLabel(self)  # Label to display weather emoji
        self.description_label = QLabel(self)  # Label to display weather description
        
        # Call the function to initialize the user interface (UI)
        self.initUI()

    def initUI(self):
        """
        This method sets up the window properties and arranges the widgets (labels, input fields, buttons) in a layout.
        """
        self.setWindowTitle("Weather App")  # Set the window title

        # Create a vertical box layout (vbox) to organize the widgets
        vbox = QVBoxLayout()
        
        # Add the widgets to the layout in the desired order
        vbox.addWidget(self.city_label)
        vbox.addWidget(self.city_input)
        vbox.addWidget(self.get_weather_button)
        vbox.addWidget(self.temperature_label)
        vbox.addWidget(self.emoji_label)
        vbox.addWidget(self.description_label)

        # Set the layout for the main window
        self.setLayout(vbox)

        # Align all the widgets to the center of the window
        self.city_label.setAlignment(Qt.AlignCenter)
        self.city_input.setAlignment(Qt.AlignCenter)
        self.temperature_label.setAlignment(Qt.AlignCenter)
        self.emoji_label.setAlignment(Qt.AlignCenter)
        self.description_label.setAlignment(Qt.AlignCenter)

        # Set object names for the widgets (optional, used for styling or identification)
        self.city_label.setObjectName("city_label")
        self.city_input.setObjectName("city_input")
        self.get_weather_button.setObjectName("get_weather_button")
        self.temperature_label.setObjectName("temperature_label")
        self.emoji_label.setObjectName("emoji_label")
        self.description_label.setObjectName("description_label")

        # Set the style sheet (CSS) for customizing the appearance of the widgets
        self.setStyleSheet("""
            QLabel, QPushButton{
                font-family: calibri;
            }
            QLabel#city_label{
                font-size: 40px;
                font-style: italic;
            }
            QLineEdit#city_input{
                font-size: 40px;
            }
            QPushButton#get_weather_button{
                font-size: 30px;
                font-weight: bold;
            }
            QLabel#temperature_label{
                font-size: 75px;
            }
            QLabel#emoji_label{
                font-size: 100px;
                font-family: Segoe UI emoji;
            }
            QLabel#description_label{
                font-size: 50px;
            }
        """)

        # Connect the "Get Weather" button to the function that fetches the weather data
        self.get_weather_button.clicked.connect(self.get_weather)

