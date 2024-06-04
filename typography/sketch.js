let font;
let fontSize = 40;
let textColor;
let textToShow = "BATH SPA UNIVERSITY";
let x, y;
let xSpeed = 5;
let ySpeed = 5;
let particles = [];

function preload() {
  // Load the font
  font = loadFont('my.ttf');
}

function setup() {
  createCanvas(800, 400);

  // Create particles
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }

  // Set initial text position
  x = width / 2;
  y = height / 2;

  // Set initial text color
  textColor = color(random(255), random(255), random(255));
}

function draw() {
  // Background gradient
  setGradient(0, 0, width, height, color(255, 0, 0), color(0, 0, 255));

  // Update and display particles
  for (let particle of particles) {
    particle.update();
    particle.display();
  }

  // Set the text properties
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  fill(textColor);
  noStroke();

  // Set the font
  textFont(font);

  // Draw the text
  text(textToShow, x, y);

  // Bouncing effect
  x += xSpeed;
  y += ySpeed;

  if (x > width || x < 0) {
    xSpeed *= -1;
    textColor = color(random(255), random(255), random(255));
  }

  if (y > height || y < 0) {
    ySpeed *= -1;
    textColor = color(random(255), random(255), random(255));
  }
}

function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.size = random(2, 6);
    this.color = color(random(255), random(255), random(255), 150);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) {
      this.vx *= -1;
    }

    if (this.y < 0 || this.y > height) {
      this.vy *= -1;
    }
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}
