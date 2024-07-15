let font;
let timer = 0;
let Loading = false;

function preload() {
  font = loadFont('assets/Ustroke-Regular.ttf');
}

function setup() {
  createCanvas(500, 500);
  textFont(font);
  textSize(48);
}

function draw() {
  background(0);

  if(Loading = !Loading){
    timer ++;
  }

  let centerX = width - 380;
  let centerY = height / 2;
  drawGlitchedText("Data Vermin", centerX, centerY); // Draw the text at the center of the canvas

  let x = 90;
  let y = 200;

  push();
  fill('Yellow');
  textSize(20);
  text("Loading", x, y);
  pop();

  push();
  fill('Yellow');
  textSize(50);
  if(timer < 10){
    text(".", x + 100, y);
  } else if(timer < 20){
    text("..", x + 100, y);
  } else if(timer < 30){
    text("...", x + 100, y);
  } else if(timer > 40){
    text(" ", x + 100, y)
    timer = 0;
    Loading = !Loading;
  }
  pop();

  // Apply CRT effect over the entire canvas
  applyCRTEffect();
}

function drawGlitchedText(texT, x, y) {
  let letters = texT.split('');
  let xoffset = 0;

  for (let i = 0; i < letters.length; i++) {
    let currentLetter = letters[i];
    let letterWidth = textWidth(currentLetter);
    let xpos = x + xoffset;
    let ypos = y;
    if (currentLetter === 'V') {
      fill(255, 0, 0); // Red color for 'V'
    } else {
      fill(255); // White color for other letters
    }

    text(currentLetter, xpos, ypos);

    if (random() < 0.05) {
      let glitchX = random(-5, 5);
      let glitchY = random(-5, 5);
      if (currentLetter === 'V') {
        fill(255, 0, 0); // Red color for glitched 'V'
      } else {
        fill(255); // White color for glitched letters
      }
      text(currentLetter, xpos + glitchX, ypos + glitchY);
    }

    xoffset += letterWidth;
  }
}

function applyCRTEffect() {
  // Draw scanlines
  for (let j = 0; j < height; j += 2) {
    stroke(50); // Adjust the scanline color
    line(0, j, width, j);
  }

  // Apply color bleeding
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] += random(-50, 50); // Adjust red channel
    pixels[i + 1] += random(-50, 50); // Adjust green channel
    pixels[i + 2] += random(-50, 50); // Adjust blue channel
  }
  updatePixels();
}
