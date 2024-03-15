// Function to fetch weather data from API
async function fetchWeatherData(apiUrl, temperatureElementId, weatherIconElementId, weatherDescElementId, forecastElementIds) {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeatherData(data, temperatureElementId, weatherIconElementId, weatherDescElementId, forecastElementIds);
        } else {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to display weather data in HTML
function displayWeatherData(data, temperatureElementId, weatherIconElementId, weatherDescElementId, forecastElementIds) {
    document.getElementById(temperatureElementId).innerHTML = `${data.main.temp.toFixed(0)}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    desc = desc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    document.getElementById(weatherIconElementId).setAttribute('src', iconsrc);
    document.getElementById(weatherDescElementId).textContent = `${desc}`;
    
    // Fetch 3-day forecast
    fetchForecast(apiUrl, forecastElementIds);
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
        const forecastIcon = forecastData[i * 8].weather[0].icon; // Get weather icon code
        const forecastIconUrl = `https://openweathermap.org/img/w/${forecastIcon}.png`; // Construct URL for weather icon

        // Set the text content and weather icon for the forecast element
        const forecastElement = document.getElementById(forecastElementIds[i]);
        forecastElement.innerHTML = `${dayOfWeek} ${dateOfMonth}: ${forecastTemp} °F <img src="${forecastIconUrl}" alt="Weather Icon">`;
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
fetchWeatherData(weatherApiUrl, 'current-temp', 'weather-icon', 'caption-desc', ['day1-temp', 'day2-temp', 'day3-temp']);

// JavaScript for last modified date
document.getElementById('lastModified').textContent = new Date(document.lastModified).toLocaleString();