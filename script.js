const container = document.getElementById("container");
const grid = document.getElementById("grid");
const DEFAULT_SIZE = 16;
let brushColor = "black";
let isDrawing = false;
function makeGrid(rows, cols) {
  grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  for (i = 0; i < rows * cols; i++) {
    let cell = document.createElement("div");
    grid.appendChild(cell).className = "grid-element";
  }

  const cells = document.querySelectorAll(".grid-element");

  // For each cell add a mouseup, mousedown and mouseover event, this means when the user presses down on a cell, the isDrawing flag is set to true
  // if the isDrawing flag is true, then the mouseover event will also begin, meaning the user can click and hold to draw, when the user
  // lets go of their mouse click, the mouseup event will play, which will set the isDrawing flag to false, stopping the mouseover event from running.

  cells.forEach((div) => {
    div.addEventListener("mouseup", (event) => {
      isDrawing = false;
    });

    div.addEventListener("mousedown", (event) => {
      event.target.style.backgroundColor = brushColor;
      isDrawing = true;
    });

    div.addEventListener("mouseover", (event) => {
      if (isDrawing) {
        if (rainbowFlag) {
          brushColor = randomColor();
          event.target.style.backgroundColor = brushColor;
        } else {
          event.target.style.backgroundColor = brushColor;
        }
      }
    });
  });
}

function changeGridSize(value) {
  makeGrid(value, value);
}
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", clearGrid);

let rainbowFlag = false;
const rainbowBrush = document.querySelector("#rainbowBtn");
rainbowBrush.addEventListener("click", (event) => {
  if (rainbowFlag) {
    rainbowFlag = false;
  } else {
    rainbowFlag = true;
  }
});

function randomColor() {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  return `rgb(${randomR}, ${randomG}, ${randomB})`;
}
const colorValue = document.querySelector("#color");
const colorInput = document.querySelector("#colorPicker");
colorInput.addEventListener("input", (event) => {
  brushColor = event.target.value;
});
const value = document.querySelector("#value");
const input = document.querySelector("#gridSizeSlider");
value.textContent = `${input.value} x ${input.value}`;
input.addEventListener("input", (event) => {
  value.textContent = `${event.target.value} x ${event.target.value}`;
});

input.addEventListener("mouseup", (event) => {
  grid.innerHTML = "";
  makeGrid(event.target.value, event.target.value);
});

function clearGrid() {
  grid.innerHTML = "";
  makeGrid(DEFAULT_SIZE, DEFAULT_SIZE);
  brushColor = "black";
  colorInput.value = "#000000";
  value.textContent = `${DEFAULT_SIZE} x ${DEFAULT_SIZE}`;
  input.value = "16";
}

window.onload = () => {
  makeGrid(DEFAULT_SIZE, DEFAULT_SIZE);
};
