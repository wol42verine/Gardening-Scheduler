const inputCity = document.querySelector('#cityName');
const submitBtn = document.querySelector('#submit');
const APIKey = "6d91ac03912ea4111a6d0d3486084c05";
let date;
let city;
let state;
let country;

// get location for the Weather request

submitBtn.addEventListener('click', function () {
    city = inputCity.value;
    console.log(city);
    // date = 
});

// get API info

const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

fetch(queryURL)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
});

