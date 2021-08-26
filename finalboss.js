class FinalBoss {
  constructor(ctx, gameW, gameH) {
    this.ctx = ctx;

    this.width = 200;
    this.height = 200;

    this.image = new Image();
    this.image.src = './img/enemy.png';

    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.posX = 20;
    this.posY = 20;
    this.framesPerShot = 30;
    this.lastShotFrame = 0;

    this.velY = 1;
    this.velX = 1;

    this.bullets = [];
    this.moveUp = false;
    this.moveDown = false;
    this.moveLeft = false;
    this.moveRight = false;
  }

  draw() {
      
      this.ctx.drawImage(
          this.image,
          this.posX,
          this.posY,
          this.width,
          this.height
      );
      this.bullets.forEach((bullet) => {

              bullet.draw();
              console.log(bullet);
          });
          this.clearBullets();
          this.move();
  }

    move() {
        if (this.moveUp) this.posY -= this.velY;
        if (this.moveDown) this.posY += this.velY;
        if (this.moveLeft) this.posX -= this.velX;
        if (this.moveRight) this.posX += this.velX;
      
        if (this.posX === 20 && this.posY === 20) {
            this.moveRight = true;
            this.moveUp = false;
      } 
        if (this.posX === 230 && this.posY === 20) {
            this.moveDown = true;
            this.moveRight = false;
        }
        if (this.posX === 230 && this.posY === 300) {
            this.moveLeft = true;
            this.moveDown = false;
      }
        if (this.posX === 20 && this.posY === 300) {
            this.moveUp = true;
            this.moveLeft = false;
      }

    if (this.lastShotFrame === this.framesPerShot) {
    this.shoot();
      this.lastShotFrame = 0;
    } else {
      this.lastShotFrame += 1;
    }
  }
  shoot() {
     this.bullets.push(
        //  new FinalBullet(this.ctx, this.posX, this.posY, this.width, this.height)
         new EnemyBullet(this.ctx, this.posX, this.posY, this.width, this.height)
     );
    //   console.log(this.bullets);
  }

    clearBullets() {
   
    this.bullets = this.bullets.filter(
        (bullet) => bullet.enemyPosY <= this.gameHeight
        
    );
  }
}
