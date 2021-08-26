class Background {
  constructor(ctx, w, h, imgSource) {
    this.ctx = ctx;
    this.width = w;
    this.height = h;

    this.image = new Image();
    this.image.src = imgSource;

    this.posX = 0;
    this.posY = 0;

    this.velY = 3;
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY - this.height,
      this.width,
      this.height
    );
    this.move();
  }

  move() {
    if (this.posY >= this.height) {
      this.posY = 0;
    }
    this.posY += this.velY;
  }
}
