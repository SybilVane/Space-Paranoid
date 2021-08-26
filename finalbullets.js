class FinalBullet extends EnemyBullet {
  constructor(ctx, enemyPosX, enemyPosY, enemyWidth, enemyHeight) {
    super(ctx, enemyPosX, enemyPosY + 25, enemyWidth, enemyHeight);
    //   this.image = new Image();
    this.image.src = './img/finalbullet.png';
    this.width = 20;
    this.height = 20;
  }
}
