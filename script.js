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
      if (shaderFlag) {
        console.log("shader flag event");
        let opacity = Number(event.target.style.opacity);
        event.target.style.opacity = opacity >= 1 ? "1" : opacity + 0.1 + "";
      }
      if (lightenFlag) {
        console.log("lighten flag event");
        let opacity = Number(event.target.style.opacity);
        event.target.style.opacity = opacity > 1 ? "1" : opacity - 0.1 + "";
      }
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
  if (eraserFlag) {
    eraserFlag = false;
    eraserBtn.classList.remove("buttonsOn");
  }
  if (lightenFlag) {
    lightenFlag = false;
    lightenBtn.classList.remove("buttonsOn");
  }
  if (shaderFlag) {
    console.log("shader flag disabled after clicking rainbow btn");
    shaderFlag = false;
    shaderBtn.classList.remove("buttonsOn");
  }
  if (rainbowFlag) {
    rainbowFlag = false;
    brushColor = colorInput.value;
    rainbowBrush.classList.remove("buttonsOn");
  } else {
    rainbowFlag = true;
    rainbowBrush.classList.add("buttonsOn");
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
  if (rainbowFlag) {
    rainbowFlag = false;
  } else if (shaderFlag) {
    shaderFlag = false;
  } else if (lightenFlag) {
    lightenFlag = false;
  }
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

const eraserBtn = document.querySelector("#eraserBtn");
eraserBtn.addEventListener("click", eraser);

let eraserFlag = false;
function eraser() {
  if (rainbowFlag) {
    rainbowFlag = false;
    rainbowBrush.classList.remove("buttonsOn");
  }
  if (shaderFlag) {
    shaderFlag = false;
    shaderBtn.classList.remove("buttonsOn");
  }
  if (lightenFlag) {
    lightenFlag = false;
    lightenBtn.classList.remove("buttonsOn");
  }
  if (eraserFlag) {
    eraserFlag = false;
    eraserBtn.classList.remove("buttonsOn");
    brushColor = colorInput.value;
  } else {
    eraserFlag = true;
    brushColor = "white";
    eraserBtn.classList.add("buttonsOn");
  }
}
const shaderBtn = document.querySelector("#shaderBtn");
shaderBtn.addEventListener("click", shader);

let shaderFlag = false;
function shader() {
  if (eraserFlag) {
    eraserFlag = false;
    eraserBtn.classList.remove("buttonsOn");
  }
  if (lightenFlag) {
    lightenFlag = false;
    lightenBtn.classList.remove("buttonsOn");
  }
  if (rainbowFlag) {
    rainbowFlag = false;
    rainbowBrush.classList.remove("buttonsOn");
  }
  if (shaderFlag) {
    console.log("shader flag disabled");
    shaderFlag = false;
    shaderBtn.classList.remove("buttonsOn");
  } else {
    console.log("shader flag enabled");
    shaderFlag = true;
    shaderBtn.classList.add("buttonsOn");
  }
}

const lightenBtn = document.querySelector("#lightenBtn");
let lightenFlag = false;

lightenBtn.addEventListener("click", lighten);

function lighten() {
  if (eraserFlag) {
    eraserFlag = false;
    eraserBtn.classList.remove("buttonsOn");
  }
  if (rainbowFlag) {
    rainbowFlag = false;
    rainbowBrush.classList.remove("buttonsOn");
  }
  if (shaderFlag) {
    shaderFlag = false;
    shaderBtn.classList.remove("buttonsOn");
  }
  if (lightenFlag) {
    lightenFlag = false;
    lightenBtn.classList.remove("buttonsOn");
  } else {
    lightenFlag = true;
    lightenBtn.classList.add("buttonsOn");
  }
}
function clearGrid() {
  grid.innerHTML = "";
  makeGrid(DEFAULT_SIZE, DEFAULT_SIZE);
  brushColor = "black";
  colorInput.value = "#000000";
  value.textContent = `${DEFAULT_SIZE} x ${DEFAULT_SIZE}`;
  input.value = "16";
  rainbowFlag = false;
  rainbowBrush.classList.remove("buttonsOn");
  shaderFlag = false;
  shaderBtn.classList.remove("buttonsOn");
  lightenFlag = false;
  lightenBtn.classList.remove("buttonsOn");
  eraserFlag = false;
  eraserBtn.classList.remove("buttonsOn");
}

window.onload = () => {
  makeGrid(DEFAULT_SIZE, DEFAULT_SIZE);
};
