const apiKey = "ae181789d3ebefdcc766939ecfabe572";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // Fixed 'matric' to 'metric'

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
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

 