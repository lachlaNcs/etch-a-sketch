const container = document.getElementById("container");
const grid = document.getElementById("grid");

function makeRows(rows, cols) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);

  for (i = 0; i < rows * cols; i++) {
    let cell = document.createElement("div");
    grid.appendChild(cell).className = "grid-element";
  }
}

function clearGrid() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = "white";
  }
}

const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", clearGrid);
makeRows(16, 16);

const cells = document.querySelectorAll(".grid-element");

let isDrawing = false;

// For each cell add a mouseup, mousedown and mouseover event, this means when the user presses down on a cell, the isDrawing flag is set to true
// if the isDrawing flag is true, then the mouseover event will also begin, meaning the user can click and hold to draw, when the user
// lets go of their mouse click, the mouseup event will play, which will set the isDrawing flag to false, stopping the mouseover event from running.

cells.forEach((div) => {
  div.addEventListener("mouseup", (event) => {
    isDrawing = false;
  });

  div.addEventListener("mousedown", (event) => {
    event.target.style.backgroundColor = "blue";
    isDrawing = true;
  });

  div.addEventListener("mouseover", (event) => {
    if (isDrawing) {
      event.target.style.backgroundColor = "blue";
    }
  });
});
