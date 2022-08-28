class Player {
    constructor(ctx, gameW, gameH) {
        this.ctx = ctx;

        this.width = 30;
        this.height = 30;

        this.image = new Image();
        this.image.src = './img/ship.png';

        this.gameWidth = gameW;
        this.gameHeight = gameH;

        this.posX = gameW / 2 - this.width / 2;
        this.posY = gameH - this.height - 20;
        this.framesPerShot = 30;
        this.lastShotFrame = 0;

        this.velY = 5;
        this.velX = 5;

        this.keys = [];
        this.usingTouch = false;
        this.touchKeys = new Set();
        this.touchY = '';
        this.touchX = '';
        this.touchThresholdY = 0;
        this.touchThresholdX = 0;

        this.gamepadConnected = navigator.getGamepads()[0];
        this.gamepadA = undefined;

        this.bullets = [];
        this.powerShot = false;

        this.setListeners();
        this.setTouchListeners();
    }

    draw() {
        this.bullets.forEach((bullet) => bullet.draw());
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
        if (this.keys.length > 0) this.usingTouch = false;
        if (this.touchKeys.size > 0) {
            this.usingTouch = true;
            this.framesPerShot = 15
        }

        if (this.gamepadConnected) {
            this.gamepadA = navigator.getGamepads()[0].buttons[0].pressed;
            if (this.gamepadA) this.keys[1] = true;
            if (!this.gamepadA) {
                this.lastShotFrame = 30;
                delete this.keys[1];
            }
        }

        if (
            (this.keys[38] && this.posY >= 10) ||
            (this.keys[87] && this.posY >= 10) ||
            (this.touchKeys.has('swipe up') && this.posY >= 10)
        ) {
            //up
            this.posY -= this.velY;
        }
        if (
            (this.keys[40] && this.posY <= this.gameHeight - this.height - 5) ||
            (this.keys[83] && this.posY <= this.gameHeight - this.height - 5) ||
            (this.touchKeys.has('swipe down') && this.posY <= this.gameHeight - this.height - 5)
        ) {
            //down
            this.posY += this.velY;
        }
        if (
            (this.keys[37] && this.posX >= 5) ||
            (this.keys[65] && this.posX >= 5) ||
            (this.touchKeys.has('swipe left') && this.posX >= 5)
        ) {
            //left
            this.posX -= this.velX;
        }
        if (
            (this.keys[39] && this.posX <= this.gameWidth - this.width - 5) ||
            (this.keys[68] && this.posX <= this.gameWidth - this.width - 5) ||
            (this.touchKeys.has('swipe right') && this.posX <= this.gameWidth - this.width - 5)
        ) {
            //right
            this.posX += this.velX;
        }

        if (this.powerShot === false) {
            if (this.keys[32] || this.keys[1] || this.usingTouch) this.shoot();
        }

        if (this.powerShot === true) {
            if (this.keys[32] || this.keys[1] || this.usingTouch) this.powerShoot();
        }
    }

    shoot() {
        if (this.lastShotFrame === this.framesPerShot) {
            this.bullets.push(
                new Bullet(this.ctx, this.posX, this.posY, this.width, this.height)
            );
            this.lastShotFrame = 0;
        } else {
            this.lastShotFrame += 1;
        }
    }

    powerShoot() {
        this.bullets.push(
            new Bullet(this.ctx, this.posX, this.posY, this.width, this.height)
        );
    }

    clearBullets() {
        this.bullets = this.bullets.filter(
            (bullet) => bullet.posY <= this.gameHeight
        );
    }

    setListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.keyCode] = true;
        });

        document.addEventListener('keyup', (e) => {
            this.lastShotFrame = 30;
            delete this.keys[e.keyCode];
        });
    }

    setTouchListeners() {
        window.addEventListener('touchstart', (e) => {
            this.touchY = e.changedTouches[0].pageY;
            this.touchX = e.changedTouches[0].pageX;

        });
        window.addEventListener('touchmove', (e) => {
            const swipeDistanceY = e.changedTouches[0].pageY - this.touchY;
            const swipeDistanceX = e.changedTouches[0].pageX - this.touchX;
            if (
                swipeDistanceX < -this.touchThresholdX &&
                !this.touchKeys.has('swipe left')
            )
                this.touchKeys.add('swipe left');
            if (
                swipeDistanceX > this.touchThresholdX &&
                !this.touchKeys.has('swipe right')
            )
                this.touchKeys.add('swipe right');
            if (
                swipeDistanceY < -this.touchThresholdY &&
                !this.touchKeys.has('swipe up')
            )
                this.touchKeys.add('swipe up');
            if (
                swipeDistanceY > this.touchThresholdY &&
                !this.touchKeys.has('swipe down')
            ) {
                this.touchKeys.add('swipe down');
            }
        });
        window.addEventListener('touchend', () => {
            this.touchKeys.delete('swipe up');
            this.touchKeys.delete('swipe down');
            this.touchKeys.delete('swipe left');
            this.touchKeys.delete('swipe right');
        });
    }
}
