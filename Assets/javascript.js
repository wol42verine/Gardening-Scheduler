$(document).foundation();

const apiUrl = 'https://perenual.com/api/species-list?key=sk-nV5Y664fa6394ed345548&page=1';

$(document).ready(function() {
    // Event listener for modal button
    $('button[data-open="plant-modal"]').on('click', function() {
        fetchPlantData();
    });

    // Event listener for plant selection
    $('#plant-select').on('change', function() {
        const plantId = $(this).val();
        if (plantId) {
            fetchPlantDetails(plantId);
        }
    });

    // Event listener for dismiss button using event delegation
    $(document).on('click', '.dismiss-button', function() {
        const plantId = $(this).closest('.plant-info').data('plant-id');
        removePlantData(plantId);
        $(this).closest('.plant-info').remove(); // Remove the closest parent with class 'plant-info'
    });

    // Load plant data from localStorage when the page is loaded
    loadSavedPlantData();

    // Load saved note from localStorage when the page is loaded
    loadNote();

    // Event listener for save note button
    $('#saveNote').on('click', function() {
        saveNote();
    });
});

// Function to fetch plant data
function fetchPlantData() {
    // Existing code...
}

// Function to populate the plant select dropdown
function populatePlantSelect(plants) {
    // Existing code...
}

// Function to fetch and display plant details
function fetchPlantDetails(plantId) {
    // Existing code...
}

// Function to save plant data in localStorage
function savePlantData(plant) {
    // Existing code...
}

// Function to remove plant data from localStorage
function removePlantData(plantId) {
    // Existing code...
}

// Function to load plant data from localStorage
function loadSavedPlantData() {
    // Existing code...
}

// Function to display plant information
function displayPlantInfo(plant) {
    // Existing code...
}

// Weather API

const APIKey = "6d91ac03912ea4111a6d0d3486084c05";
const inputCity = document.querySelector('#cname');
const submitBtn = document.querySelector('#cnsubmit');
const wRes = document.querySelector('#weatherRes');

let city;

// get location for the Weather request

submitBtn.addEventListener('click', function () {
    city = inputCity.value;
    console.log(city);
});

// get info for API request URL

const urlParams = new URLSearchParams(window.location.search); 
city = urlParams.get('cname');

// If city has a value then do request to API

if (city !== null) {
    let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

    fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        const resCity = document.createElement('p');
        const resTemp = document.createElement('p');
        const resWeather = document.createElement('p');

        const kelvinTemp = data.main.temp;
        const celsiusTemp = kelvinTemp - 273.15;
        const fahrenheitTemp = (kelvinTemp - 273.15) * 9/5 + 32;

        resCity.textContent = `${data.name}, ${data.sys.country}`;
        resTemp.textContent = `Temperature: ${celsiusTemp.toFixed(2)} °C / ${fahrenheitTemp.toFixed(2)} °F`;
        resWeather.textContent = `Weather: ${data.weather[0].main}`;

        wRes.appendChild(resCity);
        wRes.appendChild(resTemp);
        wRes.appendChild(resWeather);  
    });
}

// Function to save note to localStorage
function saveNote() {
    const noteText = $('#noteText').val();
    localStorage.setItem('note', noteText);
}

// Function to load note from localStorage
function loadNote() {
    const savedNote = localStorage.getItem('note');
    if (savedNote) {
        $('#noteText').val(savedNote);
    }
}
