// Function to calculate wind chill
function calculateWindChill(temperature, windSpeed) {
    if (temperature <= 50 && windSpeed > 3.0) {
        var windChill = Math.round(35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16)));
        return windChill;
    } else {
        return "N/A";
    }
}

// Function to update wind chill on the webpage
function updateWindChill(temperatureElementId, windSpeedElementId, windChillElementId) {
    // Retrieve temperature and wind speed elements from the HTML
    var temperature = parseFloat(document.getElementById(temperatureElementId).innerText);
    var windSpeed = parseFloat(document.getElementById(windSpeedElementId).innerText);
    
    // Calculate wind chill
    var windChill = calculateWindChill(temperature, windSpeed);
    
    // Update wind chill element on the webpage
    document.getElementById(windChillElementId).innerText = windChill;
}

// Function to fetch weather data from API
async function fetchWeatherData(apiUrl, temperatureElementId, weatherIconElementId, weatherDescElementId, windSpeedElementId, windChillElementId, forecastElementIds) {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeatherData(data, apiUrl, temperatureElementId, weatherIconElementId, weatherDescElementId, windSpeedElementId, windChillElementId, forecastElementIds);
        } else {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to display weather data in HTML
function displayWeatherData(data, apiUrl, temperatureElementId, weatherIconElementId, weatherDescElementId, windSpeedElementId, windChillElementId, forecastElementIds) {
    document.getElementById(temperatureElementId).innerHTML = `${data.main.temp.toFixed(0)}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    desc = desc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    document.getElementById(weatherIconElementId).setAttribute('src', iconsrc);
    document.getElementById(weatherDescElementId).textContent = `${desc}`;
    
    // Fetch 3-day forecast
    fetchForecast(apiUrl, forecastElementIds);
    
    // Update wind chill
    updateWindChill(temperatureElementId, windSpeedElementId, windChillElementId); // Call updateWindChill function after updating temperature and wind speed
}

// Function to fetch 3-day forecast
async function fetchForecast(apiUrl, forecastElementIds) {
    const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const forecastApiUrl = `${forecastUrl}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
    try {
        const response = await fetch(forecastApiUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data, forecastElementIds);
        } else {
            throw new Error(`Failed to fetch forecast data: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}

// Function to display 3-day forecast
function displayForecast(data, forecastElementIds) {
    const forecastData = data.list;
    // Display forecast for the next three days
    for (let i = 0; i < 3; i++) {
        const forecastDate = new Date(forecastData[i * 8].dt * 1000); // Access data for every 24 hours (8 data points per day)
        const dayOfWeek = forecastDate.toLocaleDateString('en-US', { weekday: 'long' }); // Get day of the week
        const dateOfMonth = forecastDate.toLocaleDateString('en-US', { day: 'numeric' }); // Get date of the month
        const forecastTemp = forecastData[i * 8].main.temp.toFixed(0); // Access temperature for the middle of the day
        document.getElementById(forecastElementIds[i]).textContent = `${dayOfWeek} ${dateOfMonth}: ${forecastTemp} °F`;
    }
}

// Define API key and coordinates
const apiKey = 'ccd5563da126656b282cadea81ef3910';
const latitude = '29.882802866112275';
const longitude = '-97.79299267726698';
const units = 'imperial';

// Define API URL with parameters
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

// Call functions to fetch and display weather data
fetchWeatherData(weatherApiUrl, 'current-temp', 'weather-icon', 'caption-desc', 'windSpeed', 'windChill', ['day1-temp', 'day2-temp', 'day3-temp']);

// JavaScript for last modified date
document.getElementById('lastModified').textContent = new Date(document.lastModified).toLocaleString();