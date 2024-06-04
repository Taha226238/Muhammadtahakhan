let carX = 50;
let carY = 300;
let carSpeed = 2;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  // Draw background
  background(25, 25, 112); // Dark blue sky (night)

  // Draw stars
  drawStars();

  // Draw moon
  drawMoon();

  // Draw ground
  drawGround();

  // Draw car
  drawCar();

  // Move car
  carX += carSpeed;
  if (carX > width + 100) {
    carX = -100;
  }
}

function drawStars() {
  fill(255); // White
  noStroke();
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height / 2);
    ellipse(x, y, 2, 2);
  }
}

function drawMoon() {
  fill(255, 255, 204); // Light yellow
  noStroke();
  ellipse(500, 100, 80, 80); // Moon
}

function drawGround() {
  fill(34, 139, 34); // Dark green
  rect(0, height - 50, width, 50); // Ground
}

function drawCar() {
  // Car body
  fill(65, 105, 225); // Metallic blue
  beginShape();
  vertex(carX + 20, carY);
  vertex(carX + 100, carY);
  vertex(carX + 120, carY + 40);
  vertex(carX, carY + 40);
  endShape(CLOSE);

  // Windows
  fill(150);
  rect(carX + 30, carY + 10, 40, 20);
  rect(carX + 75, carY + 10, 20, 20);
  fill(200);
  rect(carX + 15, carY + 15, 15, 10);

  // Headlights
  fill(255, 255, 200); // Light yellow
  ellipse(carX + 110, carY + 20, 10, 10);

  // Taillights
  fill(255, 0, 0); // Red
  ellipse(carX + 10, carY + 20, 10, 10);

  // Side mirrors
  fill(200);
  rect(carX + 115, carY + 5, 5, 15);

  // Windshield
  fill(200);
  beginShape();
  vertex(carX + 30, carY);
  vertex(carX + 70, carY - 20);
  vertex(carX + 90, carY - 20);
  vertex(carX + 120, carY + 10);
  endShape(CLOSE);

  // Wheels
  fill(50);
  ellipse(carX + 30, carY + 40, 30, 30);
  ellipse(carX + 90, carY + 40, 30, 30);

  // Highlight
  fill(255, 215, 0);
  ellipse(carX + 30, carY + 40, 10, 10);
  ellipse(carX + 90, carY + 40, 10, 10);
}
