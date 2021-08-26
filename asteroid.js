class Asteroid {
  constructor(ctx, gameW, gameH) {
    this.ctx = ctx;
    this.framesPerShot = 30;
    this.lastShotFrame = 0;
    this.gameW = gameW;
    this.gameH = gameH;
    this.width = 20;
    this.height = 20;
    this.image = new Image();
    this.image.src = './img/asteroid1.png';
    this.posX = Math.random() * (gameW - 70) + 10;
    this.posY = -30;
    this.speedY = 7;
    this.speedX = Math.random() * 10 - 5;
  }
  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    this.move();
  }

  move() {
    this.posY += this.speedY;
    this.posX += this.speedX;
    // if (this.lastShotFrame === this.framesPerShot) {
    //   this.shoot();
    //   this.lastShotFrame = 0;
    // } else {
    //   this.lastShotFrame += 1;
    // }
  }
}
