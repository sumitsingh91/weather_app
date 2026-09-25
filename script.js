// ==========================================
// OPENWEATHERMAP API KEY
// ==========================================

// Replace this with your actual API key
const API_KEY = "1f94f192820a3be008d87f364e7a38cc";


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const date = document.getElementById("date");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const weatherIcon = document.getElementById("weatherIcon");


// ==========================================
// GET WEATHER FUNCTION
// ==========================================

async function getWeather(city) {

    // Check if input is empty
    if (city.trim() === "") {
        alert("Please enter a city name.");
        return;
    }

    try {

        // API URL
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;


        // Fetch data from OpenWeatherMap
        const response = await fetch(url);


        // Check API response
        if (!response.ok) {

            if (response.status === 401) {
                throw new Error("Invalid API key.");
            }

            if (response.status === 404) {
                throw new Error("City not found.");
            }

            throw new Error("Something went wrong.");
        }


        // Convert response into JSON
        const data = await response.json();


        // ==========================================
        // DISPLAY CITY
        // ==========================================

        cityName.textContent =
            `${data.name}, ${data.sys.country}`;


        // ==========================================
        // DISPLAY TEMPERATURE
        // ==========================================

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;


        // ==========================================
        // DISPLAY DESCRIPTION
        // ==========================================

        description.textContent =
            data.weather[0].description;


        // ==========================================
        // DISPLAY HUMIDITY
        // ==========================================

        humidity.textContent =
            `${data.main.humidity}%`;


        // ==========================================
        // DISPLAY WIND SPEED
        // ==========================================

        wind.textContent =
            `${Math.round(data.wind.speed * 3.6)} km/h`;


        // ==========================================
        // DISPLAY FEELS LIKE TEMPERATURE
        // ==========================================

        feelsLike.textContent =
            `${Math.round(data.main.feels_like)}°C`;


        // ==========================================
        // DISPLAY CURRENT DATE
        // ==========================================

        const currentDate = new Date();

        date.textContent =
            currentDate.toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            });


        // ==========================================
        // WEATHER ICON
        // ==========================================

        const weatherCondition =
            data.weather[0].main.toLowerCase();


        if (weatherCondition.includes("clear")) {

            weatherIcon.textContent = "☀️";

        } else if (weatherCondition.includes("cloud")) {

            weatherIcon.textContent = "☁️";

        } else if (weatherCondition.includes("rain")) {

            weatherIcon.textContent = "🌧️";

        } else if (weatherCondition.includes("drizzle")) {

            weatherIcon.textContent = "🌦️";

        } else if (weatherCondition.includes("thunderstorm")) {

            weatherIcon.textContent = "⛈️";

        } else if (weatherCondition.includes("snow")) {

            weatherIcon.textContent = "❄️";

        } else if (
            weatherCondition.includes("mist") ||
            weatherCondition.includes("fog") ||
            weatherCondition.includes("haze")
        ) {

            weatherIcon.textContent = "🌫️";

        } else {

            weatherIcon.textContent = "🌤️";
        }

    }

    catch (error) {

        // Show error in console
        console.error(error);

        // Show error to user
        alert(error.message);
    }
}


// ==========================================
// SEARCH BUTTON
// ==========================================

searchBtn.addEventListener("click", function () {

    const city = cityInput.value;

    getWeather(city);
});


// ==========================================
// PRESS ENTER TO SEARCH
// ==========================================

cityInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        const city = cityInput.value;

        getWeather(city);
    }
});


// ==========================================
// LOAD DEFAULT CITY
// ==========================================

// getWeather("New Delhi");