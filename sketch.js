let PERLIN_SCALE = 200;
let TILE_SIZE = 10;
let SPRITE_SIZE = 32;

let grassImage;
let sandImage;
let waterImage;

let flowerImage;
let bushImage;

function preload() {
  grassImage = loadImage("assets/tiles/grass2.png");
  sandImage = loadImage("assets/tiles/sand1.png");
  waterImage = loadImage("assets/tiles/water1.png");

  flowerImage = loadImage("assets/sprites/flower.png");
  bushImage = loadImage("assets/sprites/bush.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();

  let centralX = width / 2;
  let centralY = height / 2;

  // Tiles
  for (let x = 0; x < width; x = x + TILE_SIZE) {
    for (let y = 0; y < height; y = y + TILE_SIZE) {
      let altitude = computeAltitude(x, y, centralX, centralY);

      // Assegniamo il colore
      let seaLevel = 0.2;
      let beachLevel = 0.28;

      // Tiles
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

  // Sprites
  for (let x = 0; x < width; x = x + TILE_SIZE) {
    for (let y = 0; y < height; y = y + TILE_SIZE) {
      let altitude = computeAltitude(x, y, centralX, centralY);

      // Assegniamo il colore
      let seaLevel = 0.2;
      let beachLevel = 0.28;

      // Flower
      let flow;
      if (random() < 0.1 && altitude > beachLevel) {
        image(flowerImage, x, y, SPRITE_SIZE, SPRITE_SIZE);
      }
    }
  }
}

function computeAltitude(x, y, centralX, centralY) {
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

  return altitude;
}
