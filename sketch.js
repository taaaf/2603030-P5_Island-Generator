let PERLIN_SCALE = 200;
let TILE_SIZE = 32;

let grassImage;
let sandImage;
let waterImage;

function preload() {
  grassImage = loadImage("tiles/grass1.png");
  sandImage = loadImage("tiles/sand1.png");
  waterImage = loadImage("tiles/water1.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();

  let centralX = width / 2;
  let centralY = height / 2;

  for (let x = 0; x < width; x = x + TILE_SIZE) {
    for (let y = 0; y < height; y = y + TILE_SIZE) {
      // Calcolo distanza dal centro
      let distanceFromCenter = dist(centralX, centralY, x, y);
      let normDistanceFromCenter = distanceFromCenter / (width / 2); // 0 - 1

      // Calcolo altitudine
      let altitude = 1 - normDistanceFromCenter;

      // Perlin
      noiseDetail(6);
      let perlin = noise(x / PERLIN_SCALE, y / PERLIN_SCALE);
      altitude *= perlin;
      altitude += perlin;
      altitude -= 0.5;

      // Assegniamo il colore
      let seaLevel = 0.2;
      let beachLevel = 0.28;

      let img;
      if (altitude < seaLevel) {
        img = waterImage;
      } else if (altitude < beachLevel) {
        img = sandImage;
      } else {
        img = grassImage;
      }

      image(img, x, y, TILE_SIZE, TILE_SIZE);
    }
  }
}
