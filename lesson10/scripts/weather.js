// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// Define API URL
const url = 'https://api.openweathermap.org/data/2.5/weather';

// Define API key and coordinates
const apiKey = 'ccd5563da126656b282cadea81ef3910';
const latitude = '49.75';
const longitude = '6.64';
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
  currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;F`; // Format temperature with zero decimal points
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;
  desc = desc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); // Capitalize each word
  weatherIcon.setAttribute('src', iconsrc);
  captionDesc.textContent = `${desc}`;
}

// Invoke API fetch function
apiFetch();
