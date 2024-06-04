let img;
let slider;

function preload() {
  // Load your image
  img = loadImage('th.jpeg');
}

function setup() {
  createCanvas(img.width, img.height);
  
  // Create a slider to control the number of colors
  slider = createSlider(2, 16, 4); // Adjust the range and default value as needed
  slider.position(10, height + 10);
}

function draw() {
  background(255);
  
  // Display the original image
  image(img, 0, 0);
  
  // Apply the posterize filter
  let colors = slider.value(); // Number of colors
  posterize(colors);
}

function posterize(colors) {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];
    
    // Convert to posterized colors
    r = round(map(r, 0, 255, 0, colors) / (colors - 1)) * (255 / (colors - 1));
    g = round(map(g, 0, 255, 0, colors) / (colors - 1)) * (255 / (colors - 1));
    b = round(map(b, 0, 255, 0, colors) / (colors - 1)) * (255 / (colors - 1));
    
    // Update pixel array
    pixels[i] = r;
    pixels[i + 1] = g;
    pixels[i + 2] = b;
  }
  updatePixels();
}
