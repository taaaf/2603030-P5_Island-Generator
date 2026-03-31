function setup() {
  createCanvas(200, 200);

  background(255, 0, 0);
  noStroke();

  let centralX = width / 2;
  let centralY = height / 2;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // Calcolo distanza dal centro
      let distanceFromCenter = dist(centralX, centralY, x, y);
      let normDistanceFromCenter = distanceFromCenter / (width / 2); // 0 - 1

      let altitude = 1 - normDistanceFromCenter;

      fill(altitude * 255);
      rect(x, y, 1, 1);
    }
  }
}
