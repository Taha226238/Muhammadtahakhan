let img;

function preload() {
  // Load your image
  img = loadImage('th.jpeg');
}

function setup() {
  createCanvas(img.width, img.height);
  background(255);
  img.loadPixels();
  
  // Define the size of the points
  let pointillize = 10;
  
  for (let y = 0; y < img.height; y += pointillize) {
    for (let x = 0; x < img.width; x += pointillize) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      
      // Draw a point at (x, y) with the color of the pixel at that location
      fill(r, g, b);
      noStroke();
      ellipse(x, y, pointillize, pointillize);
    }
  }
}

function draw() {
  // No need for draw loop since everything is done in setup
}
