document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("pixelGrid");
  const colorPicker = document.getElementById("colorPicker");

  // Create 16x16 grid - loop makes many pixels to be added to grid
  for (let i = 0; i < 16 * 16; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    
    // Change color on click
    pixel.addEventListener("click", () => {
      pixel.style.backgroundColor = colorPicker.value;
      //pixel.style.border = colorPicker.value;
    });

    grid.appendChild(pixel);
  }
});

// Select the buttons
const saveButton = document.getElementById('saveButton');
const loadButton = document.getElementById('loadButton');
const pixelGrid = document.getElementById('pixelGrid');

// Function to save the current grid state to localStorage
function saveGridState() {
  const pixels = [...document.querySelectorAll('.pixel')];
  const gridState = pixels.map(pixel => pixel.style.backgroundColor);
  localStorage.setItem('pixelGridState', JSON.stringify(gridState));
  alert('Grid saved!');
}

// Function to load the grid state from localStorage
function loadGridState() {
  const savedState = localStorage.getItem('pixelGridState');
  if (savedState) {
    const gridState = JSON.parse(savedState);
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel, index) => {
      pixel.style.backgroundColor = gridState[index] || ''; // Restore color or reset if undefined
    });
    alert('Grid loaded!');
  } else {
    alert('No saved grid found!');
  }
}

// listeners for save and load buttons
saveButton.addEventListener('click', saveGridState);
loadButton.addEventListener('click', loadGridState);

// Optional: auto image load on page load
//window.addEventListener('load', loadGridState);
