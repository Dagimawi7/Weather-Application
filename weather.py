import sys
import requests
# Importing the necessary modules from PyQt5 to create a graphical user interface 
from PyQt5.QtWidgets import (QApplication, QWidget, QLabel, QLineEdit, QPushButton, QVBoxLayout)
from PyQt5.QtCore import Qt

# Defining the WeatherApp class which inherits from QWidget 
class WeatherApp(QWidget):
    def __init__(self):
        super().__init__()
        
        # Initialize UI components 
        self.city_label = QLabel("Enter city name: ", self)  # Label for the city input prompt
        self.city_input = QLineEdit(self)  # Input field for user to type in a city name
        self.get_weather_button = QPushButton("Get Weather", self)  # Button to fetch weather information
        self.temperature_label = QLabel(self)  # Label to display temperature
        self.emoji_label = QLabel(self)  # Label to display weather emoji
        self.description_label = QLabel(self)  # Label to display weather description
        
        # Call the function to initializing the user interface (UI)
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

    def get_weather(self):
        """
        This method sends a request to the OpenWeather API to fetch weather data for a given city,
        handles any errors that may occur, and displays the weather information on the app.
        """
        
        
        api_key = "b6f45dc68e71f414f7e3954f74906379" 
        
        # Retrieve the city entered by the user in the input field
        city = self.city_input.text()

        # Construct the API URL using the city name and the API key
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"

        try:
            # Send a GET request to the OpenWeather API to fetch weather data
            response = requests.get(url)
            
            # Raise an exception for any HTTP error responses (4xx, 5xx)
            response.raise_for_status()
            
            # Parse the JSON response from the API
            data = response.json()

            # If the request is successful (status code 200), call display_weather to show data
            if data["cod"] == 200:
                self.display_weather(data)

        except requests.exceptions.HTTPError as http_error:
            """
            Handle various HTTP errors by matching the response status code and displaying a corresponding error message.
            """
            match response.status_code:
                case 400:
                    self.display_error("Bad request:\nPlease check your input")
                case 401:
                    self.display_error("Unauthorized:\nInvalid API key")
                case 403:
                    self.display_error("Forbidden:\nAccess is denied")
                case 404:
                    self.display_error("Not found:\nCity not found")
                case 500:
                    self.display_error("Internal Server Error:\nPlease try again later")
                case 502:
                    self.display_error("Bad Gateway:\nInvalid response from the server")
                case 503:
                    self.display_error("Service Unavailable:\nServer is down")
                case 504:
                    self.display_error("Gateway Timeout:\nNo response from the server")
                case _:
                    self.display_error(f"HTTP error occurred:\n{http_error}")

        except requests.exceptions.ConnectionError:
            # Handle case where the app cannot establish a connection to the API
            self.display_error("Connection Error:\nCheck your internet connection")
        except requests.exceptions.Timeout:
            # Handle case where the request times out
            self.display_error("Timeout Error:\nThe request timed out")
        except requests.exceptions.TooManyRedirects:
            # Handle case where there are too many redirects in the request
            self.display_error("Too many Redirects:\nCheck the URL")
        except requests.exceptions.RequestException as req_error:
            # Handle any other request-related errors
            self.display_error(f"Request Error:\n{req_error}")

    def display_error(self, message):
        """
        This method handles the display of error messages when the weather data request fails.
        It clears any existing weather information and shows the error message on the app interface.
        """
        
        # Set the font size for the error message to make it visually clear
        self.temperature_label.setStyleSheet("font-size: 30px;")
        
        # Set the error message text to the temperature label, which will be displayed to the user
        self.temperature_label.setText(message)
        
        # Clear the emoji label, as it will not be needed when there's an error
        self.emoji_label.clear()
        
        # Clear the description label, as it will not be needed when there's an error
        self.description_label.clear()

    def display_weather(self, data):
        """
        This method processes the weather data returned from the OpenWeather API,
        calculates the temperature in Fahrenheit, retrieves the weather description and emoji, 
        and displays them on the app's interface.
        """
        
        # Set the font size for displaying the temperature to make it visually prominent
        self.temperature_label.setStyleSheet("font-size: 75px;")
        
        # Extract the temperature in Kelvin from the API response
        temperature_k = data["main"]["temp"]
        
        # Convert the temperature from Kelvin to Celsius (not used in this case)
        temperature_c = temperature_k - 273.15
        
        # Convert the temperature from Kelvin to Fahrenheit for display
        temperature_f = (temperature_k * 9/5) - 459.67
        
        # Get the weather ID (used to determine the appropriate emoji for the weather condition)
        weather_id = data["weather"][0]["id"]
        
        # Get the weather description (e.g., 'clear sky', 'light rain')
        weather_description = data["weather"][0]["description"]

        # Set the temperature label text to show the temperature in Fahrenheit
        self.temperature_label.setText(f"{temperature_f:.0f}°F")
        
        # Set the emoji label to display the weather emoji based on the weather ID
        self.emoji_label.setText(self.get_weather_emoji(weather_id))
        
        # Set the description label to display the weather description (e.g., 'clear sky', 'rain')
        self.description_label.setText(weather_description)

    @staticmethod
    def get_weather_emoji(weather_id):
        """
        This static method returns a weather-related emoji based on the weather condition ID
        obtained from the OpenWeather API. The weather ID corresponds to various weather conditions,
        and this function maps those IDs to appropriate emojis.
        """
        
        # Check if the weather ID is in the range corresponding to thunderstorms
        if 200 <= weather_id <= 232:
            return "⛈"  # Return thunderstorm emoji
        
        # Check if the weather ID is in the range corresponding to drizzle or light rain
        elif 300 <= weather_id <= 321:
            return "🌦"  # Return drizzle or light rain emoji
        
        # Check if the weather ID is in the range corresponding to moderate to heavy rain
        elif 500 <= weather_id <= 531:
            return "🌧"  # Return rain emoji
        
        # Check if the weather ID is in the range corresponding to snow
        elif 600 <= weather_id <= 622:
            return "❄"  # Return snowflake emoji
        
        # Check if the weather ID is in the range corresponding to mist, fog, or haze
        elif 701 <= weather_id <= 741:
            return "🌫"  # Return mist or fog emoji
        
        # Check if the weather ID is exactly 762, corresponding to volcanic activity
        elif weather_id == 762:
            return "🌋"  # Return volcano emoji
        
        # Check if the weather ID is exactly 771, corresponding to strong wind
        elif weather_id == 771:
            return "💨"  # Return wind emoji
        
        # Check if the weather ID is exactly 781, corresponding to a tornado
        elif weather_id == 781:
            return "🌪"  # Return tornado emoji
        
        # Check if the weather ID is exactly 800, corresponding to clear skies
        elif weather_id == 800:
            return "☀"  # Return sun emoji
        
        # Check if the weather ID is in the range corresponding to partly cloudy to overcast
        elif 801 <= weather_id <= 804:
            return "☁"  # Return cloud emoji
        
        # Return an empty string if the weather ID doesn't match any known conditions
        else:
            return ""

if __name__ == "__main__":
    app = QApplication(sys.argv)
    weather_app = WeatherApp()
    weather_app.show()
    sys.exit(app.exec_())