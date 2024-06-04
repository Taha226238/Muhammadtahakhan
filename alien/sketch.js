let xPos, yPos; // Position variables for the alien
let bodyColor, eyeColor; // Colors for the body and eyes

function setup() {
  createCanvas(400, 400);
  xPos = width / 2;
  yPos = height / 2;
  bodyColor = color(100, 200, 100); // Greenish color for the body
  eyeColor = color(0); // Black color for the eyes
}

function draw() {
  // Draw the space background
  background(0);
  drawStars(200); // Draw 200 stars
  
  // Draw the alien body
  fill(bodyColor);
  ellipse(xPos, yPos + 150, 100, 200); // Main body
  
  // Draw the alien head
  fill(bodyColor);
  ellipse(xPos, yPos, 120, 120); // Head
  
  // Draw the eyes
  fill(eyeColor);
  ellipse(xPos - 30, yPos - 10, 30, 20); // Left eye
  ellipse(xPos + 30, yPos - 10, 30, 20); // Right eye
  
  // Draw the mouth
  stroke(255);
  strokeWeight(4);
  noFill();
  arc(xPos, yPos + 20, 60, 40, 0, PI); // Mouth
  
  // Draw the hands
  fill(bodyColor);
  ellipse(xPos - 60, yPos + 120, 40, 80); // Left hand
  ellipse(xPos + 60, yPos + 120, 40, 80); // Right hand
  
  // Draw the scary teeth
  noStroke();
  fill(255);
  for(let i = 0; i < 10; i++) {
    rect(xPos - 20 + i * 5, yPos + 20, 3, 10);
  }
}

function drawStars(numStars) {
  fill(255);
  for (let i = 0; i < numStars; i++) {
    let x = random(width);
    let y = random(height);
    ellipse(x, y, 2, 2); // Draw a small ellipse as a star
  }
}

function keyPressed() {
  // Move the alien with arrow keys
  if (keyCode === UP_ARROW) {
    yPos -= 10;
  } else if (keyCode === DOWN_ARROW) {
    yPos += 10;
  } else if (keyCode === LEFT_ARROW) {
    xPos -= 10;
  } else if (keyCode === RIGHT_ARROW) {
    xPos += 10;
  }
}
