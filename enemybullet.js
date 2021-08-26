class EnemyBullet {
  constructor(ctx, enemyPosX, enemyPosY, enemyWidth, enemyHeight) {
    this.ctx = ctx;
    this.enemyPosX = enemyPosX + enemyWidth / 2 - 6;
    this.enemyPosY = enemyPosY + 50;
    this.enemyWidth = enemyWidth;
    this.enemyHeight = enemyHeight;
    this.width = 10;
    this.height = 10;
    this.image = new Image();
    this.image.src = './img/enemybullet.png';

    this.velY = Math.random() * (5 - 2.5) + 2.5;
    this.velX = Math.random() * 5 - 2.5;
  }
  draw() {
    
    this.ctx.drawImage(
      this.image,
      this.enemyPosX,
      this.enemyPosY,
      this.width,
      this.height
    );
    this.move();
  }
  move() {
    this.enemyPosY += this.velY;
    this.enemyPosX += this.velX;
  }
}

