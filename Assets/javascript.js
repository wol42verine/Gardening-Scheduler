<<<<<<< HEAD
const plantsEl = document.getElementById('select-plants');



// Fetching Plants Data from APIs

// source: https://docs.trefle.io/docs/guides/getting-started : has been blocked by CORS policy/

const myToken = 'q18aYXqN_Tn4RstV7MB0VEp0xt9dPd2IlE-Xd9SuXAQ';
    const url = `https://trefle.io/api/v1/plants?token=${myToken}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const selectElement = document.getElementById('select-plants');
        selectElement.innerHTML = ''; // Clear the "Loading plants..." option

        const plants = data.data;
        for (let i = 0; i < plants.length; i++) {
          const plant = plants[i];
          const option = document.createElement('option');
          option.value = plant.id;
          option.textContent = plant.common_name || plant.scientific_name; // Use common name if available, otherwise scientific name
          selectElement.appendChild(option);
        }
      })
      .catch(error => {
        console.error('Error fetching plant data:', error);
        const selectElement = document.getElementById('select-plants');
        selectElement.innerHTML = '<option value="">Failed to load plants</option>';
      });
=======
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
});

// Function to fetch plant data
function fetchPlantData() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const plants = data.data;
            populatePlantSelect(plants);
        })
        .catch(error => console.error('Error fetching plant data:', error));
}

// Function to populate the plant select dropdown
function populatePlantSelect(plants) {
    const select = $('#plant-select');
    select.empty(); // Clear existing options
    select.append('<option value="">Select a plant</option>');
    plants.forEach(plant => {
        select.append(`<option value="${plant.id}">${plant.common_name}</option>`);
    });
}

// Function to fetch and display plant details
function fetchPlantDetails(plantId) {
    fetch(`https://perenual.com/api/species/details/${plantId}?key=sk-nV5Y664fa6394ed345548`)
        .then(response => response.json())
        .then(data => {
            if (data && data.id) {
                displayPlantInfo(data);
                // Store plant data in local storage
                savePlantData(data);
            } else {
                console.error('Unexpected plant details data structure:', data);
            }
        })
        .catch(error => console.error('Error fetching plant details:', error));
}

// Function to save plant data in localStorage
function savePlantData(plant) {
    let savedPlantData = JSON.parse(localStorage.getItem('plantData')) || [];
    savedPlantData.push(plant);
    localStorage.setItem('plantData', JSON.stringify(savedPlantData));
}

// Function to remove plant data from localStorage
function removePlantData(plantId) {
    let savedPlantData = JSON.parse(localStorage.getItem('plantData')) || [];
    const updatedPlantData = savedPlantData.filter(plant => plant.id !== plantId);
    localStorage.setItem('plantData', JSON.stringify(updatedPlantData));
}

// Function to load plant data from localStorage
function loadSavedPlantData() {
    const savedPlantData = JSON.parse(localStorage.getItem('plantData'));
    if (savedPlantData && savedPlantData.length > 0) {
        savedPlantData.forEach(plant => {
            displayPlantInfo(plant);
        });
    }
}

// Function to display plant information
function displayPlantInfo(plant) {
    const infoDiv = $('#plant-info-main');
    const plantInfo = `
        <div class="plant-info" data-plant-id="${plant.id}">
            <h3>${plant.common_name || 'N/A'}</h3>
            <p><strong>Scientific Name:</strong> ${plant.scientific_name ? plant.scientific_name.join(', ') : 'N/A'}</p>
            <p><strong>Other Names:</strong> ${plant.other_name ? plant.other_name.join(', ') : 'N/A'}</p>
            <p><strong>Cycle:</strong> ${plant.cycle || 'N/A'}</p>
            <p><strong>Sunlight:</strong> ${plant.sunlight ? plant.sunlight.join(', ') : 'N/A'}</p>
            <p><strong>Watering:</strong> ${plant.watering || 'N/A'}</p>
            <img src="${plant.default_image ? plant.default_image.original_url : ''}" alt="${plant.common_name || 'N/A'}">
            <button class="dismiss-button">Dismiss</button>
        </div>
    `;
    infoDiv.append(plantInfo);
}
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

>>>>>>> main
