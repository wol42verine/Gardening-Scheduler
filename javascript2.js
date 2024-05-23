$(document).foundation();

const apiUrl = 'https://perenual.com/api/species-list?key=sk-nV5Y664fa6394ed345548&page=1';

$(document).ready(function() {
    // Fetch the list of plants from Perenual API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Data:', data);
            const plants = data.data; // Assuming the API returns data in this format
            console.log('Plants:', plants);
            populatePlantSelect(plants);
        })
        .catch(error => console.error('Error fetching plant data:', error));
    
    // Event listener for plant selection
    $('#plant-select').on('change', function() {
        const plantId = $(this).val();
        console.log('Selected Plant ID:', plantId);
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
        console.log('Plant:', plant);
        select.append(`<option value="${plant.id}">${plant.common_name}</option>`);
    });
}

// Function to fetch and display plant details
function fetchPlantDetails(plantId) {
    fetch(`https://perenual.com/api/species/details/${plantId}?key=sk-nV5Y664fa6394ed345548`)
        .then(response => response.json())
        .then(data => {
            console.log('Plant Details Data:', data); // Log the response structure
            // Check if the data structure is as expected
            if (data && data.id) {
                displayPlantInfo(data); // Pass the correct data object
                $('#plant-modal').foundation('close'); // Close the modal when a plant is selected
            } else {
                console.error('Unexpected plant details data structure:', data);
            }
        })
        .catch(error => console.error('Error fetching plant details:', error));
}

// Function to display plant information
function displayPlantInfo(plant) {
    console.log('Displaying Plant Info:', plant); // Log the plant details for debugging
    const infoDiv = $('#plant-info-main');
    infoDiv.html(`
        <h3>${plant.common_name || 'N/A'}</h3>
        <p><strong>Scientific Name:</strong> ${plant.scientific_name ? plant.scientific_name.join(', ') : 'N/A'}</p>
        <p><strong>Other Names:</strong> ${plant.other_name ? plant.other_name.join(', ') : 'N/A'}</p>
        <p><strong>Cycle:</strong> ${plant.cycle || 'N/A'}</p>
        <p><strong>Sunlight:</strong> ${plant.sunlight ? plant.sunlight.join(', ') : 'N/A'}</p>
        <p><strong>Watering:</strong> ${plant.watering || 'N/A'}</p>
        <img src="${plant.default_image ? plant.default_image.original_url : ''}" alt="${plant.common_name || 'N/A'}">
    `);
}
