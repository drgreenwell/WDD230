// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData() {
    const apiKey = 'ccd5563da126656b282cadea81ef3910';
    const city = 'Maxwell'; // Change to your desired city
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to display current weather
async function displayCurrentWeather() {
    const weatherData = await fetchWeatherData();
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    
    if (weatherData) {
        temperatureElement.textContent = weatherData.main.temp + ' °F';
        descriptionElement.textContent = weatherData.weather[0].description;
    }
}

// Function to fetch and display three day forecast
async function displayThreeDayForecast() {
    const apiKey = 'ccd5563da126656b282cadea81ef3910';
    const city = 'Maxwell'; // Change to your desired city
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const forecastData = data.list.slice(0, 3); // Get first three forecast entries
        
        forecastData.forEach((forecast, index) => {
            const forecastElement = document.getElementById(`forecast${index + 1}`);
            forecastElement.textContent = `${forecast.main.temp} °F`;
        });
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}

// Call functions to display weather and forecast when page loads
window.addEventListener('load', () => {
    displayCurrentWeather();
    displayThreeDayForecast();
});