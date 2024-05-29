$(document).foundation();
const plantSelect = document.getElementById("plant-select");
const fetchBtn = document.getElementById("button-plant");
const infoBtn = document.querySelector('.display-info');

function plantDisplay() {
  const plantUrl =
    "https://perenual.com/api/species-list?key=sk-4WzR665567151aa035680&page=1";

  fetch(plantUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (PlantData) {
      console.log(PlantData);
      for (let i = 0; i < PlantData.data.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.setAttribute("value", "plants");
        optionEl.textContent = PlantData.data[i].common_name;
        plantSelect.appendChild(optionEl);
        
      }
    });
}

infoBtn.addEventListener("click", plantDisplay);




function plantDetails(){
    const plantImage =document.createElement('img');
    plantImage.setAttribute('src','plantData.data' )
}



infoBtn.addEventListener('click',plantDetails);


