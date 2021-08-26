class Powershot extends Powerup {
  constructor(ctx, gameW, gameH) {
    super(ctx, gameW, gameH);
    this.image.src = './img/powershot.png';

    this.width = 30;
    this.height = 30;
  }
}

