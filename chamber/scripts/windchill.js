// windchill.js

function calculateWindChill(temperature, windSpeed) {
    if (temperature <= 50 && windSpeed > 3.0) {
        var windChill = Math.round(35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16)));
        return windChill;
    } else {
        return "N/A";
    }
}

var temperature = parseFloat(document.getElementById('temperature').innerText);
var windSpeed = parseFloat(document.getElementById('windSpeed').innerText);
var windChill = calculateWindChill(temperature, windSpeed);
document.getElementById('windChill').innerText = windChill;
