// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#caption-desc');

// Define API URL
const url = 'https://api.openweathermap.org/data/2.5/weather';

// Define API key and coordinates
const apiKey = 'ccd5563da126656b282cadea81ef3910';
const latitude = '29.882802866112275';
const longitude = '-97.79299267726698';
const units = 'imperial';

// Define API URL with parameters
const apiUrl = `${url}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

// Function to fetch data from API
async function apiFetch() {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // testing only
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Function to display results in HTML
function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    desc = desc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    weatherIcon.setAttribute('src', iconsrc);
    captionDesc.textContent = `${desc}`;
    
    // Fetch 3-day forecast
    fetchForecast();
    
    // Display banner if it's Monday, Tuesday, or Wednesday
    const today = new Date().getDay();
    if (today >= 1 && today <= 3) {
        const banner = document.getElementById('chamber-banner');
        banner.style.display = 'block';
        const closeButton = document.getElementById('close-banner');
        closeButton.addEventListener('click', () => {
            banner.style.display = 'none';
        });
    }
}

// Function to fetch 3-day forecast
async function fetchForecast() {
    const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const forecastApiUrl = `${forecastUrl}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
    try {
        const response = await fetch(forecastApiUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // for testing
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Function to display 3-day forecast
function displayForecast(data) {
    const forecastData = data.list;
    // Display forecast for the next three days
    for (let i = 0; i < 3; i++) {
        const forecastTemp = forecastData[i].main.temp.toFixed(0);
        const forecastDate = new Date(forecastData[i].dt * 1000); // Convert UNIX timestamp to milliseconds
        const dayOfWeek = forecastDate.toLocaleDateString('en-US', { weekday: 'long' });
        const dateOfMonth = forecastDate.toLocaleDateString('en-US', { day: 'numeric' });
        document.getElementById(`day${i+1}-temp`).textContent = `${dayOfWeek}, ${dateOfMonth}`;
    }
}

// Invoke API fetch function
apiFetch();