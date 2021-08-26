class Bullet {
  constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight) {
    this.ctx = ctx;
    this.posX = playerPosX + playerWidth / 2 - 5;
    this.posY = playerPosY - 30;

    this.playerHeight = playerHeight;
    this.width = 10;
    this.height = 50;
    this.image = new Image();
    this.image.src = './img/bullet.png';

    //this.radius = Math.random() * (3 - 1) + 1;
    this.velY = Math.random() * (20 - 10) + 10;
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
    this.posY -= this.velY;
  }
}
