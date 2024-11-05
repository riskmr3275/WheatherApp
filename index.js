const apiKey = "ae181789d3ebefdcc766939ecfabe572";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // Fixed 'matric' to 'metric'

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".wheatherIcon");
async function checkWeather(city="Mumbai") {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found"); // Error handling
        }
        const data = await response.json();
        console.log("data", data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Determine the weather condition and set the image source
        const weatherCondition = data.weather[0].main.toLowerCase();
        switch (weatherCondition) {
            case "clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "snow":
                weatherIcon.src = "images/snow.png";
                break;
            case "thunderstorm":
                weatherIcon.src = "images/thunderstorm.png";
                break;
            case "drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "mist":
                weatherIcon.src = "images/mist.png";
                break;
            default:
                weatherIcon.src = "images/default.png"; // Default icon for unhandled conditions
                break;
        }

        weatherIcon.alt = data.weather[0].description; // Set alt text for the image
    } catch (error) {
        console.error(error);
        document.querySelector(".city").innerHTML = "Error: " + error.message; // Display error
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim(); // Trim any extra whitespace
    if (city) {
        checkWeather(city);
        searchBox.value = ""; // Clear the input after searching
    } else {
        alert("Please enter a city name!"); // Alert if input is empty
    }
});

 