let mic;
let circles = [];
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  noStroke();
}

function draw() {
  background(0, 10);

  let vol = mic.getLevel();
  let circleSize = map(vol, 0, 1, 10, 200);
  
  let newCircle = new Circle(mouseX, mouseY, circleSize);
  circles.push(newCircle);
  
  for (let i = circles.length - 1; i >= 0; i--) {
    circles[i].update();
    circles[i].display();
    if (circles[i].alpha <= 0) {
      circles.splice(i, 1);
    }
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}

class Circle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color(random(255), random(255), random(255), 150);
    this.alpha = 255;
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 1;
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(1, 3);
    this.alpha = 255;
    this.color = color(random(200, 255), random(100), random(100), this.alpha);
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 2;
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

function mouseMoved() {
  let particleCount = int(random(5, 10));
  for (let i = 0; i < particleCount; i++) {
    let newParticle = new Particle(mouseX, mouseY);
    particles.push(newParticle);
  }
}
