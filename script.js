document.addEventListener("DOMContentLoaded", () =>{
    let cityInput = document.getElementById("city-input");
    let getWeatherBtn = document.getElementById("get-weather-btn");
    let weatherInfo = document.getElementById("weather-info");
    let cityNameDisplay = document.getElementById("city-name");
    let temperatureDisplay = document.getElementById("temperature");
    let description = document.getElementById("description");
    let errorMessage = document.getElementById("error-message");

const API_KEY = "76c9701714a624f06c27a18213486d58"

   getWeatherBtn.addEventListener("click", async ()=> {
     let city = cityInput.value.trim();
     if(!city) return;

     try {
        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData);
     } catch (error) {
        showError();
     }
   })

   async function fetchWeatherData(city){
       const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

       const response = await fetch(url);
       console.log(typeof response);
       console.log(response);

       if(!response.ok){
         throw new Error("city not found")
       }

       const data = await response.json()
       return data;
   }
   function displayWeatherData(data){
      console.log(data)
      const {name,main,weather} = data;
      cityNameDisplay.textContent = name;
      temperatureDisplay.textContent = `Temperature : ${main.temp}`;
      description.textContent = `Weather : ${weather[0].description}`;

      weatherInfo.classList.remove("hidden")
      errorMessage.classList.add("hidden")
   }

   function showError(){
       errorMessage.classList.remove("hidden");
       weatherInfo.classList.remove("hidden");
   }
});