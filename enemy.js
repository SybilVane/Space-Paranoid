class Enemy {
  constructor(ctx, gameW, gameH) {
    this.ctx = ctx;
    this.framesPerShot = 50;
    this.lastShotFrame = 0;
    this.gameW = gameW;
    this.gameH = gameH;
    this.width = 50;
    this.height = 50;
    this.image = new Image();
    this.image.src = this.randomizer();
    this.posX = Math.random() * (gameW - 70) + 10;
    this.posY = -50;
    this.speedY = Math.random() * (5 - 2.5) + 1;
    this.speedX = Math.random() * (2 - 1) + 1;
    this.bullets = [];
  }
  draw() {
    this.bullets.forEach((bullet) => {
      bullet.draw();
    });
    this.clearBullets();
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
    if (this.lastShotFrame === this.framesPerShot) {
      this.shoot();
      this.lastShotFrame = 0;
    } else {
      this.lastShotFrame += 1;
    }
  }

  shoot() {
    this.bullets.push(
      new EnemyBullet(this.ctx, this.posX, this.posY, this.width, this.height)
    );
  }

  clearBullets() {
    this.bullets = this.bullets.filter(
      (bullet) => bullet.enemyPosY < this.gameH
    );
  }

  randomizer() {
    let randomizer = Math.random() * (99 - 1) + 1;
    let sourceImage = '';
    if (randomizer <= 33) sourceImage = './img/enemy.png';
    if (randomizer > 33 && randomizer <= 66)
      sourceImage = './img/enemypink.png';
    if (randomizer > 66) sourceImage = './img/enemyyellow.png';
    return sourceImage;
  }
}
