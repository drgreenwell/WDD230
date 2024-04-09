// JavaScript to fetch weather information from OpenWeatherMap API

const apiKey = '94a116f2e94d3ee756b65e7657259c47';
const city = 'Cozumel';
const countryCode = 'MX';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}&units=metric`;

// Function to fetch current weather data
async function fetchWeather() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Update current weather information
    document.getElementById('current-temp').textContent = `${data.main.temp}°C`;
    document.getElementById('current-humidity').textContent = `${data.main.humidity}%`;
    // Update current weather icon
    document.getElementById('current-weather-icon').setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    // Set today's high temperature for the closeable message
    const todayHighTemp = data.main.temp_max;
    const closeableMessage = document.querySelector('.closeable-message');
    closeableMessage.innerHTML = `Today's high temperature: ${todayHighTemp}°C <span class="close-btn">❌</span>`;
    // Add event listener to the close button
    const closeButton = closeableMessage.querySelector('.close-btn');
    closeButton.addEventListener('click', function() {
      closeableMessage.style.display = 'none';
    });
    // Fetch next day's forecast
    fetchNextDayForecast(data.coord.lat, data.coord.lon);
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
}


// Function to fetch next day's forecast at 15:00 (3:00pm)
async function fetchNextDayForecast(lat, lon) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(forecastUrl);
    const data = await response.json();
    console.log('Forecast data:', data);
    // Find the forecast data for the next day
    const currentDate = new Date();
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrowDateString = tomorrowDate.toISOString().split('T')[0];
    const forecastForNextDay = data.list.find(item => item.dt_txt.includes(tomorrowDateString));
    console.log('Forecast for next day:', forecastForNextDay);
    // Get the temperature at 3:00pm from the forecast
    const forecastTemperature = forecastForNextDay.main.temp;
    console.log('Forecast temperature:', forecastTemperature);
    // Update next day's forecasted temperature
    document.getElementById('next-day-forecast-temp').textContent = `${forecastTemperature}°C`;
    // Update next day's weather icon
    document.getElementById('next-day-forecast-icon').setAttribute('src', `https://openweathermap.org/img/wn/${forecastForNextDay.weather[0].icon}.png`);
  } catch (error) {
    console.error('Error fetching next day forecast:', error);
  }
}



// Function to close the high temperature message
document.querySelector('.close-btn').addEventListener('click', function() {
  document.querySelector('.closeable-message').style.display = 'none';
});

// Call fetchWeather function when the page loads
window.addEventListener('load', fetchWeather);
