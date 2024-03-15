// windchill.js

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
function updateWindChill() {
    // Retrieve temperature and wind speed elements from the HTML
    var temperature = parseFloat(document.getElementById('current-temp').innerText);
    var windSpeed = parseFloat(document.getElementById('windSpeed').innerText);
    
    // Calculate wind chill
    var windChill = calculateWindChill(temperature, windSpeed);
    
    // Update wind chill element on the webpage
    document.getElementById('windChill').innerText = windChill;
}

// Call the function to update wind chill initially
updateWindChill();