document.addEventListener('DOMContentLoaded', function() {
    function calculateWindChill(temperature, windSpeed) {
        if (temperature <= 50 && windSpeed > 3.0) {
            var windChill = Math.round(35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16)));
            return windChill;
        } else {
            return "N/A";
        }
    }

    var temperatureElement = document.getElementById('temperature');
    var windSpeedElement = document.getElementById('windSpeed');
    var windChillElement = document.getElementById('windChill');

    if (temperatureElement && windSpeedElement && windChillElement) {
        var temperature = parseFloat(temperatureElement.innerText);
        var windSpeed = parseFloat(windSpeedElement.innerText);
        var windChill = calculateWindChill(temperature, windSpeed);
        windChillElement.innerText = windChill;
    } else {
        console.error("One or more required elements not found.");
    }
});
