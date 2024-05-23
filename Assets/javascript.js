$(document).foundation();

const apiUrl = 'https://openfarm.cc/api/v1/crops/';

$(document).ready(function() {
    // Fetch the list of plants from OpenFarm API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('network response was not ok' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Data:', data);
            const plants = data.data;
            console.log('Plants:', plants);
            populatePlantSelect(plants);
        })
        .catch(error => console.error('Error fetching plant data:', error));
    
    // Event listener for plant selection
    $('#plant-select').on('change', function() {
        const plantId = $(this).val();
        console.log('Selected Plant ID:',plantId)
        if (plantId) {
            fetchPlantDetails(plantId);
        }
    });
});

// Function to populate the plant select dropdown
function populatePlantSelect(plants) {
    const select = $('#plant-select');
    select.append('<option value="">Select a plant</option>');
    plants.forEach(plant => {
        console.log('Plant:',plant);
        select.append(`<option value="${plant.id}">${plant.attributes.name}</option>`);
    });
}

// Function to fetch and display plant details
function fetchPlantDetails(plantId) {
    fetch(`${apiUrl}${plantId}`)
        .then(response => response.json())
        .then(data => {
            const plant = data.data.attributes;
            console.log('Plant Details:',plant);
            displayPlantInfo(plant);
        })
        .catch(error => console.error('Error fetching plant details:', error));
}

// Function to display plant information
function displayPlantInfo(plant) {
    const infoDiv = $('#plant-info');
    infoDiv.html(`
        <h3>${plant.name}</h3>
        <p><strong>Description:</strong> ${plant.description}</p>
        <p><strong>Sun Requirements:</strong> ${plant.sun_requirements}</p>
        <p><strong>Sowing Method:</strong> ${plant.sowing_method}</p>
        <img src="${plant.main_image_path}" alt="${plant.name}">
    `);
}

