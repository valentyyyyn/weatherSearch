async function fetchAPI() {

    // data to url fetch
    const apiKey = "fccac3c4c4d2fb293f635c5c8ec4be40";
    const city = document.getElementById("city-input").value;

    try {
        // API call	using fetch with data from input
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey);

        let error = document.querySelector("p.error"); 

        if (!response.ok) {

            // create a new error message if the city is not found
            if (!error) {
                errorMessage = document.createElement("p");
                errorMessage.classList.add("error"); 
                errorMessage.innerHTML = "CITY NOT FOUND";
                document.body.appendChild(errorMessage);
            }

            throw new Error("City not found");

        } else if (error) {

            // delete when the city is found again
            error.remove();
        }

        const weatherInfoFetch = await response.json();
        return weatherInfoFetch;
        
    } catch (error) {
        console.error("Error: ", error);
    }
}

// DOM MANAGMENT 

const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", async () => {
    const weatherInfo = await fetchAPI();
    
    if (weatherInfo) {
        const cityName = document.getElementById("city-name");
        const temperature = document.getElementById("temperature");
        const weather = document.getElementById("weather");
        
        cityName.innerHTML = weatherInfo.name + ", " + weatherInfo.sys.country;

        temperature.innerHTML = (weatherInfo.main.temp - 273.15).toFixed() + "°C";
        weather.innerHTML = weatherInfo.weather[0].description.charAt(0).toUpperCase() + weatherInfo.weather[0].description.slice(1);

        console.log(weatherInfo);
    }

});

