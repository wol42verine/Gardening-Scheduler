const APIKey = "6d91ac03912ea4111a6d0d3486084c05";
const inputCity = document.querySelector('#cname');
const submitBtn = document.querySelector('#cnsubmit');
const wRes = document.querySelector('#weatherRes');

let city;

// get location for the Weather request

submitBtn.addEventListener('click', function () {
  //event.preventDefault();
    city = inputCity.value;
    console.log(city);
});

// get info for API request URL

// get query string values from URL
// sorce: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript

const urlParams = new URLSearchParams(window.location.search); 
city = urlParams.get('cname');

// If city has a value then do request to API

if (city!==null) {

let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

fetch(queryURL)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);

  const resCity = document.createElement('p');
  const resTemprtr = document.createElement('p');
  const resWeather = document.createElement('p');

    resCity.textContent = data.name;
    resTemprtr.textContent = data.main.temp;
    resWeather.textContent = data.weather[0].main;

    wRes.appendChild(resCity);
    wRes.appendChild(resTemprtr);
    wRes.appendChild(resWeather);  

});
};