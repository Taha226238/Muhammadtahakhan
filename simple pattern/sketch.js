let rows = 10;
let cols = 10;
let cellSize;
let colors = [];
let currentColorIndex = 0;

function setup() {
  createCanvas(400, 400);
  cellSize = width / cols;

  // Initialize colors
  colors.push(color(255, 0, 0)); // Red
  colors.push(color(0, 255, 0)); // Green
  colors.push(color(0, 0, 255)); // Blue

  // Draw pattern
  drawPattern();
}

function drawPattern() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let randomColor = color(random(255), random(255), random(255));
      let randomSize = random(cellSize * 0.8, cellSize * 1.2);
      fill(randomColor);
      ellipse(j * cellSize + cellSize / 2, i * cellSize + cellSize / 2, randomSize, randomSize);
    }
  }
}

function mouseDragged() {
  let col = floor(mouseX / cellSize);
  let row = floor(mouseY / cellSize);
  if (col >= 0 && col < cols && row >= 0 && row < rows) {
    colors[currentColorIndex] = color(random(255), random(255), random(255));
    drawPattern();
  }
}
