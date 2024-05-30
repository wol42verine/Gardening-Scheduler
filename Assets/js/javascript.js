$(document).foundation();
const plantSelect = document.getElementById("plant-select");
const infoBtn = document.querySelector(".display-info");
const outputDisplay = document.querySelector(".user-output-plant");
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





// WHETHER SIDE
