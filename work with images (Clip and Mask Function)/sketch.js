let img;

function preload() {
  img = loadImage('f.jpeg');
}

function setup() {
  createCanvas(400, 400);
  // Set the image mode to center so the image is drawn from its center point
  imageMode(CENTER);
}

function draw() {
  background(220);
  
  // Define the shape of the mask
  let maskShape = createVector(width/2 + cos(frameCount * 0.05) * 100, height/2 + sin(frameCount * 0.05) * 100);
  
  // Create the mask
  let maskGraphic = createGraphics(width, height);
  maskGraphic.clear();
  maskGraphic.beginShape();
  maskGraphic.fill(255);
  maskGraphic.stroke(0);
  maskGraphic.strokeWeight(2);
  maskGraphic.ellipse(maskShape.x, maskShape.y, 200, 200); // You can change the shape and size of the mask
  maskGraphic.endShape(CLOSE);
  
  // Apply the mask
  img.mask(maskGraphic);
  
  // Display the masked image
  image(img, width/2, height/2);
}
