function onload(){
    document.querySelector('.city-input').focus();
};
onload();
// DOM manipulation
function showData(){
    if(document.querySelector('.city-input').value==""){
        alert("Input field can't be empty");
    }
}
const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");

const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description i");

// Using Api for Weather Data
const apiKey = '8d6454a89dff871786a0307b0dbebbee'
async function fetchWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch weather data. Given city's weather info is not available at the moment");
        }
        const data = await response.json();
        // console.log(data);
        // console.log(data.main.temp);
        // console.log(data.name);
        // console.log(data.wind.speed);
        // console.log(data.main.humidity);
        // console.log(data.visibility);
        updateWeatherUI(data);
    } catch (error) {
        alert(error);
    }
}
// fetchWeatherData();

function updateWeatherUI(data) {
    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility / 1000} km`;
    descriptionText.textContent = data.weather[0].description;
    
    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const city = inputElement.value;
    if (city !== "") {
        fetchWeatherData(city);
        inputElement.value = "";
    }
});

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };
    
    return iconMap[weatherCondition] || "help";
}
//default
cityElement.textContent = "Unknown City";
temperature.textContent = "?";
windSpeed.textContent = "?";
humidity.textContent = "?";
visibility.textContent = "?";
descriptionText.textContent = "?";

const currentDate = new Date();
date.textContent = currentDate.toDateString();

function capitalizeFirstLetter(element) {
    element.value = element.value.charAt(0).toUpperCase() + element.value.slice(1);
  }