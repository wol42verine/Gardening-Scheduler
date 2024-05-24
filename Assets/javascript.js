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