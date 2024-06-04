// Sketch to create an attractive animated clip with text inside the first rotating rectangle

let angle = 0;
let colors = [];
let message = "i love Bath Spa";

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(32);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < 10; i++) {
    colors.push(color(random(255), random(255), random(255)));
  }
}

function draw() {
  background(0);
  
  // Draw rotating rectangles
  push();
  translate(width / 2, height / 2);
  for (let i = 0; i < colors.length; i++) {
    push();
    rotate(angle + TWO_PI * i / colors.length);
    fill(colors[i]);
    rect(-150, -150, 300, 300);
    pop();
  }
  pop();

  // Draw text inside the first rectangle
  push();
  translate(width / 2, height / 2);
  rotate(angle);
  fill(255);
  text(message, 0, 0);
  pop();

  angle += 0.01;
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
