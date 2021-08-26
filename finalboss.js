class FinalBoss {
  constructor(ctx, gameW, gameH) {
    this.ctx = ctx;

    this.width = 200;
    this.height = 200;

    this.image = new Image();
    this.image.src = './img/finalboss.png';
    this.image.frames = 14;
    this.image.framesIndex = 0;

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
    // this.ctx.drawImage(
    //   this.image,
    //   this.posX,
    //   this.posY,
    //   this.width,
    //   this.height
    // );
    this.moving();
    this.bullets.forEach((bullet) => {
      bullet.draw();
    });
    this.clearBullets();
    this.move();
  }

  moving() {
    this.ctx.drawImage(
      this.image,
      this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
      0,
      Math.floor(this.image.width / this.image.frames),
      this.image.height,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }

  animateSprite(framesCounter) {
    if (framesCounter % 10 == 0) {
      this.image.framesIndex++;
    }
    if (this.image.framesIndex >= this.image.frames) {
      this.image.framesIndex = 0;
    }
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
      new FinalBullet(this.ctx, this.posX, this.posY, this.width, this.height)
    );
  }

  clearBullets() {
    this.bullets = this.bullets.filter(
      (bullet) => bullet.enemyPosY <= this.gameHeight
    );
  }
}
