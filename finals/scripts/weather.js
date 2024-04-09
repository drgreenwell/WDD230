async function apiFetch() {
  const url = 'https://api.openweathermap.org/data/2.5/onecall';
  const apiKey = '94a116f2e94d3ee756b65e7657259c47';
  const latitude = '20.50689777729495';
  const longitude = '-86.95013831686919';
  const units = 'imperial';
  const exclude = 'minutely,hourly';
  const apiUrl = `${url}?lat=${latitude}&lon=${longitude}&units=${units}&exclude=${exclude}&appid=${apiKey}`;

  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      updateWeatherInfo(data);
  } catch (error) {
      console.error('Error fetching weather data:', error.message);
  }
}

function updateWeatherInfo(data) {
  // Update current weather
  document.getElementById('current-temp').textContent = data.current.temp + '°F';
  document.getElementById('current-humidity').textContent = data.current.humidity + '%';
  document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`;

  // Update next day's forecast
  const nextDayForecast = data.daily[1];
  document.getElementById('next-day-forecast-temp').textContent = nextDayForecast.temp.day + '°F';
  document.getElementById('next-day-forecast-icon').src = `https://openweathermap.org/img/wn/${nextDayForecast.weather[0].icon}.png`;

  // Update closeable message with high temperature
  const tempMax = Math.round(data.daily[0].temp.max);
  document.querySelector('.closeable-message').textContent = `Today's high temperature: ${tempMax}°F`;
}

// Call the apiFetch function when the page loads
window.addEventListener('load', () => {
  apiFetch();
});