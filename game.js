const Game = {
	canvas: undefined,
	ctx: undefined,
	width: undefined,
	height: undefined,
	FPS: 60,
	framesCounter: 0,
	background: undefined,
	player: undefined,
	enemies: [],
	asteroids: [],
	hearts: [],
	powerShots: [],
	explosions: [],
	finalBoss: undefined,
	powershotCounter: 0,
	heartCounter: 0,
	score: 0,
	MAX_LIVES: 50,
	lives: undefined,
	finalboss_lives: 1500,
	COUNTER_LONG: 60,
	COUNTER_SHORT: 5,
	initialCounter: undefined,
	initialCounterPowershot: undefined,
	initialCounterHeart: undefined,
	soundtrack: undefined,
	collisionSound: undefined,
	explosionSound: undefined,
	gameOverSound: undefined,
	powerupSound: undefined,
	

	init() {
		this.canvas = document.getElementById('myCanvas');
		this.ctx = this.canvas.getContext('2d');
		this.setDimensions();

		this.start();

	},

	setDimensions() {
		this.width = 450;
		this.height = 600;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	},

	start() {
		this.reset();
		this.soundtrack = new Audio('./snd/paranoid.mp3');
		this.soundtrack.play();
		this.collisionSound = new Audio('./snd/collision.mp3');
		this.explosionSound = new Audio('./snd/enemyexp.mp3');
		this.powerupSound = new Audio('./snd/powerup.mp3');
		this.gameOverSound = new Audio('./snd/gameover.mp3');
		this.finalboss_lives = 1000;

		this.interval = setInterval(() => {
			if (this.framesCounter > this.initialCounter) {
				this.framesCounter = 0;
				this.enemies.push(new Enemy(this.ctx, this.width, this.height));
				this.asteroids.push(new Asteroid(this.ctx, this.width, this.height));
			} else this.framesCounter++;

			if (this.powershotCounter > this.initialCounterPowershot) {
				this.powershotCounter = 0;
				this.powerShots.push(new Powershot(this.ctx, this.width, this.height));
			} else this.powershotCounter++;
			if (this.score === 1000)
				this.finalBoss = new FinalBoss(
					this.ctx,
					this.width,
					this.height,
				);
			if (this.heartCounter > this.initialCounterHeart) {
				this.heartCounter = 0;
				this.hearts.push(new Heart(this.ctx, this.width, this.height));

			} else this.heartCounter++;



			this.clear();
			this.drawAll();
			this.scoreCounter()
			this.collisionPlayerEnemy();
			this.collisionPlayerAsteroid();
			this.collisionBulletsEnemies();
			this.clearEnemyOutOfCanvas();
			this.collisionPlayerBullet();
			this.collisionPlayerHeart();
			this.collisionPlayerPowershot();
			this.increaseDifficulty();
			this.deadOrAlive();
			this.lifeBar();
			this.collisionPlayerFinalBossBullet();
			this.collisionPlayerBulletsBoss()
			if (this.finalBoss) {this.finalBoss.animateSprite(this.framesCounter)}
			

		}, 1000 / this.FPS);
	},

	reset() {
		this.background = new Background(
			this.ctx,
			this.width,
			this.height,
			'./img/sky.png'
		);
		this.player = new Player(
			this.ctx,
			this.width,
			this.height,
			this.keys,
		);


		this.lives = this.MAX_LIVES;
		this.initialCounter = this.COUNTER_LONG;
		this.enemies = [];
		this.asteroids = [];
		this.score = 0;
		this.initialCounterHeart = 10 * this.FPS
	    this.initialCounterPowershot = 20 * this.FPS
	},

	scoreCounter() {
		this.ctx.font = "30px 'Press Start 2P'";
		this.ctx.textAlign = 'right';
		this.ctx.fillStyle = 'white';
		this.ctx.fillText(`${this.score}`, 437, 45)

	},

	increaseDifficulty() {
	

		switch (true) {
			case (this.score < 200):
				this.initialCounter = 55
				break;
			case (this.score >= 200 && this.score <= 300):
				this.initialCounter = 45
				break;
			case (this.score >= 300 && this.score <= 500):
				this.initialCounter = 35
				break;
			case (this.score >= 500 && this.score <= 800):
				this.initialCounter = 30
				break;
			case (this.score >= 800 && this.score <= 1000):
				this.initialCounter = 20
				break;
			case (this.score > 1000):
				this.initialCounter = undefined
				this.initialCounterPowershot = undefined
				this.initialCounterHeart = undefined
				
				break;
		}
	},


	lifeBar() {


		if (this.lives >= this.MAX_LIVES * .75) {
			this.ctx.fillStyle = '#2BF601';
		} else if (this.lives >= this.MAX_LIVES * .50) {
			this.ctx.fillStyle = '#ffe600';
		} else if (this.lives >= this.MAX_LIVES * .25) {
			this.ctx.fillStyle = '#ff8000';
		} else if (this.lives >= 0) {
			this.ctx.fillStyle = '#ff0000';
		}


		this.ctx.fillRect(22, 18, 200 / this.MAX_LIVES * this.lives, 20)
		this.ctx.strokeStyle = 'white';
		this.ctx.lineWidth = 2;
		this.ctx.strokeRect(22, 18, 200, 20)

	},


	drawAll() {
		this.background.draw();
		this.player.draw();
		this.enemies.forEach((enemy) => enemy.draw());
		this.asteroids.forEach((asteroid) => asteroid.draw());
		this.powerShots.forEach((power) => power.draw());
		this.hearts.forEach((power) => power.draw());
		this.explosions.forEach((explosion) => explosion.draw());
		this.finalBoss?.draw();

	},

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	},

	deadOrAlive() {
		if (this.lives <= 0) this.gameOver()
	},



	collisionPlayerEnemy() {
		this.enemies.forEach((en) => {
			if (this.player.posX + 10 < en.posX + 10 + en.width - 10 &&
				this.player.posX + 10 + this.player.width - 10 > en.posX + 10 &&
				this.player.posY + 10 < en.posY + 10 + en.height - 10 &&
				this.player.posY + 10 + this.player.height - 10 > en.posY + 10) {

				this.collisionSound.play();
				this.lives -= 1;
			};
		});
	},

	collisionPlayerAsteroid() {
		this.asteroids.forEach((asteroid) => {
			if (this.player.posX + 10 < asteroid.posX + 10 + asteroid.width - 10 &&
				this.player.posX + 10 + this.player.width - 10 > asteroid.posX + 10 &&
				this.player.posY + 10 < asteroid.posY + 10 + asteroid.height - 10 &&
				this.player.posY + 10 + this.player.height - 10 > asteroid.posY + 10) {

				this.collisionSound.play();
				this.lives -= 1;
			};
		});
	},


	collisionBulletsEnemies() {
		this.player.bullets.forEach((bullet) => {
			this.enemies.forEach((enemy, i) => {
				if (
					bullet.posX + 5 < enemy.posX + 5 + enemy.width - 5 &&
					bullet.posX + 5 + bullet.width - 5 > enemy.posX + 5 &&
					bullet.posY + 5 < enemy.posY + 5 + enemy.height - 5 &&
					bullet.posY + 5 + bullet.height - 5 > enemy.posY + 5
				) {

					this.explosionSound.play();
					this.score += 10;
					this.enemies.splice(i, 1);
					let explosion = new Explosion(this.ctx, enemy.posX, enemy.posY, enemy.width, enemy.height)
					this.explosions.push(explosion)

					setTimeout(() => {
						this.explosions.pop()
					}, 50);

					delete enemy

				}
			});
		});
	},

	clearEnemyOutOfCanvas() {

		this.enemies.forEach((enemy, i) => {
			if (enemy.posY - enemy.height * 2 > this.height || enemy.posY + enemy.height * 2 < 0 || enemy.posX > this.width || enemy.posX < 0) {
				this.enemies.splice(i, 1)
				delete enemy
			}
		});
		this.asteroids.forEach((asteroid, i) => {
			if (asteroid.posY - asteroid.height * 2 > this.height || asteroid.posY + asteroid.height * 2 < 0 || asteroid.posX > this.width || asteroid.posX < 0) {
				this.asteroids.splice(i, 1)
				delete asteroid
			}
		});
	},

	collisionPlayerBullet() {
		this.enemies.forEach(enemy => enemy.bullets.forEach((enemyBullet) => {
			if (
				enemyBullet.enemyPosX < this.player.posX + this.player.width - 5 &&
				enemyBullet.enemyPosX + enemyBullet.width > this.player.posX + 5 &&
				this.player.posY + 10 < enemyBullet.enemyPosY + enemyBullet.height &&
				this.player.posY + this.player.height - 5 > enemyBullet.enemyPosY
			) {

				this.collisionSound.play();
				this.lives -= 1;
			}
		}));
	},


	collisionPlayerPowershot() {
		this.powerShots.forEach((coffee, i) => {
			if (this.player.posX + 10 < coffee.posX + 10 + coffee.width - 10 &&
				this.player.posX + 10 + this.player.width - 10 > coffee.posX + 10 &&
				this.player.posY + 10 < coffee.posY + 10 + coffee.height - 10 &&
				this.player.posY + 10 + this.player.height - 10 > coffee.posY + 10) {



				this.powerupSound.play();
				this.player.powerShot = true;
				setTimeout(() => {
					this.player.powerShot = false;
				}, 5000);
				this.powerShots.splice(i, 1)
				delete coffee

			};
		});
	},

	collisionPlayerHeart() {
		this.hearts.forEach((heart, i) => {
			if (this.player.posX + 10 < heart.posX + 10 + heart.width - 10 &&
				this.player.posX + 10 + this.player.width - 10 > heart.posX + 10 &&
				this.player.posY + 10 < heart.posY + 10 + heart.height - 10 &&
				this.player.posY + 10 + this.player.height - 10 > heart.posY + 10) {


				this.powerupSound.play();
				if (this.lives <= this.MAX_LIVES - 10) this.lives += 10;
				this.hearts.splice(i, 1)
				delete heart

			};
		});
	},
	collisionPlayerFinalBossBullet() {
		this.finalBoss?.bullets.forEach((bossBullet) => {
			if (
				bossBullet.enemyPosX < this.player.posX + this.player.width - 5 &&
				bossBullet.enemyPosX + bossBullet.width > this.player.posX + 5 &&
				this.player.posY + 10 < bossBullet.enemyPosY + bossBullet.height &&
				this.player.posY + this.player.height - 5 > bossBullet.enemyPosY
			) {
				this.collisionSound.play();
				this.lives -= 1;
			}
		});
	},

	collisionPlayerBulletsBoss() {
		
		this.player?.bullets.forEach((bullet) => {
			if (
				this.finalBoss &&
				bullet.posX < this.finalBoss.posX  + this.finalBoss.width  &&
				bullet.posX + bullet.width > this.finalBoss.posX  &&
				bullet.posY < this.finalBoss.posY  + this.finalBoss.height &&
				bullet.posY + bullet.height  > this.finalBoss.posY 
			) {

				this.explosionSound.play();
				this.finalboss_lives -= 1;

				if (this.finalboss_lives <= 0) {
					this.player.bullets = []
					let explosion = new Explosion(this.ctx, this.finalBoss.posX, this.finalBoss.posY, this.finalBoss.width, this.finalBoss.height)
				this.explosions.push(explosion)

				setTimeout(() => {
					this.explosions.pop()
					this.gameWon()
				}, 50);

				delete this.finalBoss

					
				}
				
				

			}
		});

	},

	gameOver() {
		clearInterval(this.interval);
		reload = true;
		this.gameOverSound.play();
		this.soundtrack.pause();
		this.soundtrack.currentTime = 0;
		
		delete this.finalBoss
	},
	gameWon() {
        clearInterval(this.interval);
		reload = true;
		
		this.gameOverSound.play();
		this.soundtrack.pause();
		this.soundtrack.currentTime = 0;

	}
}