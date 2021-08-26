class Powerup {
  constructor(ctx, gameW, gameH) {
    this.ctx = ctx;
    this.gameW = gameW;
    this.gameH = gameH;
    this.width = 20;
    this.height = 20;
    this.image = new Image();
    this.posX = Math.random() * (gameW - 70) + 10;
    this.posY = 50;
    this.speedY = 1;
    this.speedX = Math.random() * 3 - 2;
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
  }
}

