document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("pixelGrid");
  const colorPicker = document.getElementById("colorPicker");

  // Create grid - loop makes many pixels to be added to grid
  // Change griSize & .css file grid columns and rows - perhaps pixel size as well
  const gridSize = 32
  for (let i = 0; i < gridSize * gridSize; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    
    // Change color on click
    pixel.addEventListener("click", () => {
      undoSaveState();
      pixel.style.backgroundColor = colorPicker.value;
      //pixel.style.border = colorPicker.value;
    });

    grid.appendChild(pixel);
  }
});

// Select the buttons
const saveButton = document.getElementById('saveButton');
const loadButton = document.getElementById('loadButton');
const undoButton = document.getElementById('undoButton');
const redoButton = document.getElementById('redoButton');
const eraser = document.getElementById('eraser');
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

// eraser tool
let prevColor = "#000000";
function eraserTool() {
  if (colorPicker.value !== "#ffffff") {
    prevColor = colorPicker.value
    colorPicker.value = "#ffffff"
    eraser.classList.add("active");
  }
  else {
    colorPicker.value = prevColor;
    eraser.classList.remove("active");
  }
}

eraser.addEventListener('click', eraserTool);

const undoStack = [];
const redoStack = [];


function getCurrentGridState() {
  const pixels = [...document.querySelectorAll('.pixel')];
  return pixels.map(pixel => pixel.style.backgroundColor);
}

function applyGridState(state) {
  const pixels = [...document.querySelectorAll('.pixel')];
  state.forEach((color, index) => {
    pixels[index].style.backgroundColor = color;
  });
}

// Save state before each change
function undoSaveState() {
  undoStack.push(getCurrentGridState());
  
  // Optional: limit how many undo states there are & remove the oldest state
  if (undoStack.length > 30) {
    undoStack.shift(); 
  }
  // Clear redo stack on new action
  redoStack.length = 0;
}

// Undo button
function undo() {
  if (undoStack.length > 0) {
    redoStack.push(getCurrentGridState());
    applyGridState(undoStack.pop());
  }
}

// Redo button
function redo() {
  if (redoStack.length > 0) {
    const currentState = getCurrentGridState();
    undoStack.push(currentState);
    const nextState = redoStack.pop();
    applyGridState(nextState);
  }
}

undoButton.addEventListener('click', undo);
redoButton.addEventListener('click', redo);