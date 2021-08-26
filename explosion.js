class Explosion {
  constructor(ctx, posX, posY, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = './img/explosion2.png';
    this.posX = posX;
    this.posY = posY;
  }
  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }
}
