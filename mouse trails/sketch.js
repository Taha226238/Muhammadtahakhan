let trail = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255, 50);
  strokeWeight(2);
  noFill();
}

function draw() {
  background(0, 50); // Semi-transparent background for fading effect
  trail.push(new Trail(mouseX, mouseY)); // Add new points to the trail
  for (let i = 0; i < trail.length; i++) {
    trail[i].update();
    trail[i].display();
  }
  // Limit the number of points in the trail
  if (trail.length > 50) {
    trail.splice(0, 1);
  }
}

class Trail {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.alpha = 255;
    this.radius = 40; // Initial radius - larger size
  }

  update() {
    this.alpha -= 5; // Fade out effect
    this.radius -= 0.5; // Decrease radius over time
    if (this.radius < 0) {
      this.radius = 0; // Ensure radius doesn't become negative
    }
  }

  display() {
    stroke(255, this.alpha); // Apply alpha for fading effect
    ellipse(this.x, this.y, this.radius * 2); // Draw ellipse with doubled radius
  }
}
