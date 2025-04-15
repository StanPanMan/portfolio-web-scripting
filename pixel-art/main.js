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
      if (brushMode === "1x1") {
      pixel.style.backgroundColor = colorPicker.value;
      } else if (brushMode === "3x3") {
        drawBrush3x3(i, 32)
      }
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

// Brush Size
let brushMode = '1x1'; // Default mode
const brush1x1Btn = document.getElementById('brush1x1');
const brush3x3Btn = document.getElementById('brush3x3');

brush1x1Btn.classList.add('active'); // Default active

// Toggle buttons
brush1x1Btn.addEventListener('click', () => {
  brushMode = '1x1';
  brush1x1Btn.classList.add('active');
  brush3x3Btn.classList.remove('active');
});

brush3x3Btn.addEventListener('click', () => {
  brushMode = '3x3';
  brush3x3Btn.classList.add('active');
  brush1x1Btn.classList.remove('active');
});

// function to draw in a 3x3 space
function drawBrush3x3(centerIndex, cols) {
  const pixels = document.querySelectorAll('.pixel');

  const row = Math.floor(centerIndex / cols); // divide the original pixel position by columns, once rounded this will give us the row the pixel is on
  const col = centerIndex % cols; // The remainder lets us find the column of the pixel

  // Loop over the range -1 to +1 in both directions to cover the 3x3 area
  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      const newRow = row + r;
      const newCol = col + c;

      // Make sure the drawing doesnt wrap around
      if (
        newRow >= 0 && newRow < cols &&
        newCol >= 0 && newCol < cols
      ) {
        const newIndex = newRow * cols + newCol;
        pixels[newIndex].style.backgroundColor = colorPicker.value;
      }
    }
  }
}
