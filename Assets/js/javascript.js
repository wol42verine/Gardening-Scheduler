$(document).foundation();
const plantSelect = document.getElementById("plant-select");
const infoBtn = document.querySelector(".display-info");
const outputDisplay = document.querySelector(".user-output-plant");
const outputDisplayWeather = document.querySelector('.user-output-weather');
const plantOption = document.getElementById("plant-option");
const plantSelectionEl = document.querySelector(".plant-section");
const subContainerEl = document.querySelector(".sub-container");

const plantUrl =
  "https://perenual.com/api/species-list?key=sk-nV5Y664fa6394ed345548";

function plantDisplay() {
  fetch(plantUrl)
    .then((response) => response.json())
    .then((PlantData) => {
      console.log(PlantData);
      PlantData.data.forEach((plant) => {
        const optionEl = document.createElement("option");
        optionEl.setAttribute("value", plant.id);
        optionEl.textContent = plant.common_name;
        plantSelect.appendChild(optionEl);
        
      });
    })
    .catch((error) => console.error("Error fetching plant data:", error));
}

plantDisplay();
outputDisplay.innerHTML = "";
function plantDetails() {
  const selectedPlantId = plantSelect.value;
  const existingError = document.querySelector(".pwarning");
  if (existingError) {
    existingError.remove();
  }
  if (!selectedPlantId) {
    const pVaridation = document.createElement("p");
    pVaridation.textContent = "Please select a plant";
    pVaridation.setAttribute("class", "pwarning");
    subContainerEl.appendChild(pVaridation);

    return;
  }

  fetch(
    `https://perenual.com/api/species/details/${selectedPlantId}?key=sk-nV5Y664fa6394ed345548`
  )
    .then((response) => response.json())
    .then((data) => {
      outputDisplay.innerHTML = ""; 

      const sunlightInfo = data.sunlight ? data.sunlight.join(", ") : "N/A";
      const pEl = document.createElement("p");
      pEl.textContent = `Sunlight: ${sunlightInfo}`;
      outputDisplay.appendChild(pEl);

      const plantImage = document.createElement("img");
      if (data.default_image && data.default_image.original_url) {
        plantImage.src = data.default_image.original_url;
        plantImage.alt = data.common_name || "N/A";
      } else {
        plantImage.src = ""; 
        plantImage.alt = "N/A";
      }
      outputDisplay.appendChild(plantImage);
      
const pElWatering = document.createElement('p');
      if (data.watering) {
        
        pElWatering.textContent = `Watering: ${data.watering}`;
      } else {
        pElWatering.textContent = "Watering: N/A";
      }
      outputDisplay.appendChild(pElWatering);
    })
    .catch((error) => console.error("Error fetching plant details:", error));
}

infoBtn.addEventListener("click", plantDetails);




// CITIES API
const cityApi = "https://countriesnow.space/api/v0.1/countries/population/cities";

fetch(cityApi)
  .then(response => response.json())
  .then(data => {
    const usCities = data.data
      .filter(cityData => cityData.country === 'United States of America')
      .map(cityData => {
        
        const cityName = cityData.city.split(' (')[0];
        return cityName.trim(); 
      });
    
    const weatherSelect = document.getElementById('weather-select');
    
    usCities.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      weatherSelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });



// WEATHER

document.addEventListener('DOMContentLoaded', function() {
    const weatherBtnEl = document.querySelector('.weather-btn');
    weatherBtnEl.addEventListener('click', getCityWeather);
});

function getCityWeather() {
    const selectedCity = document.getElementById('weather-select').value;
    if (selectedCity) {
        const APIKey = "6d91ac03912ea4111a6d0d3486084c05";
        const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${APIKey}&units=imperial`;

        fetch(queryURL)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const outputDisplayWeather = document.querySelector('.user-output-weather');
                if (outputDisplayWeather) {
                    outputDisplayWeather.innerHTML = ''; 
                    
                    const displayCityEl = document.createElement('h4');
                    displayCityEl.textContent = `Your garden's location: City of ${selectedCity}`;

                    const temperatureEl = document.createElement('p');
                    temperatureEl.textContent = `Temperature: ${data.main.temp} °F`;

                    const humidityEl = document.createElement('p');
                    humidityEl.textContent = `Humidity: ${data.main.humidity}%`;

                    const sunriseEl = document.createElement('p');
                    sunriseEl.textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;

                    const sunsetEl = document.createElement('p');
                    sunsetEl.textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;

                    const weatherDescriptionEl = document.createElement('p');
                    weatherDescriptionEl.textContent = `Description: ${data.weather[0].description}`;

                    outputDisplayWeather.appendChild(displayCityEl);
                    outputDisplayWeather.appendChild(temperatureEl);
                    outputDisplayWeather.appendChild(humidityEl);
                    outputDisplayWeather.appendChild(sunriseEl);
                    outputDisplayWeather.appendChild(sunsetEl);
                    outputDisplayWeather.appendChild(weatherDescriptionEl);
                } else {
                    console.error('Element with class "user-output-weather" not found.');
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }
}


