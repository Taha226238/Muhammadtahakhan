let img;

function preload() {
  // Load an image
  img = loadImage('rr.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
  // Display the image
  image(img, 0, 0);
}

function draw() {
  // Load the pixels of the image
  loadPixels();
  // Loop through each pixel
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Calculate the pixel index
      let index = (x + y * width) * 4;
      // Get the color of the current pixel
      let r = pixels[index];
      let g = pixels[index + 1];
      let b = pixels[index + 2];
      // Manipulate the color values
      // For example, invert the colors
      r = 255 - r;
      g = 255 - g;
      b = 255 - b;
      // Update the pixel with the new color values
      pixels[index] = r;
      pixels[index + 1] = g;
      pixels[index + 2] = b;
    }
  }
  // Update the canvas with the modified pixels
  updatePixels();
}
