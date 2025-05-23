// Get elements
const searchInput = document.getElementById('input-box');
const buttonPress = document.getElementById('btn');

// Event listeners
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getWeatherReport(searchInput.value);
    }
});

buttonPress.addEventListener('click', () => {
    getWeatherReport(searchInput.value);
});

// Weather functions
function getWeatherReport(city) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=a350d80d9d1b4cbdbb1185231252005&q=${city}&aqi=no`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or API error');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            document.getElementById('errorMsg').textContent = error.message;
            document.getElementById('report').innerHTML = '';
        });
}

function displayWeather(data) {
    const weather = data.current;
    document.getElementById('report').innerHTML = `
        <h2>Weather in ${data.location.name}</h2>
        <img src="https:${weather.condition.icon}" alt="${weather.condition.text}">
        <p>Temperature: ${weather.temp_c}°C</p>
        <p>Condition: ${weather.condition.text}</p>
        <p>Humidity: ${weather.humidity}%</p>
        <p>Wind: ${weather.wind_kph} km/h</p>
    `;
    document.getElementById('errorMsg').textContent = '';
}

