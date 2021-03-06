import Phaser from "phaser";

export default class Bat extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, keys = undefined, width = 16, height = 120) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this)
    this.isLeft = (x < scene.halfWidth);
    this.speed = 8;
    this.position = key
    this.halfSpeed = this.speed / 2;
    this.score = 0;
    this.aiOffset = 0;
    this.anchor
    this.keys = keys
    this.setCollideWorldBounds(true);
    this.setImmovable(1)
    this.setSize(width, height)
    this.time = 0;
    this.setDepth(1);
  }


  update(ball) {
    this.countDownTimer();

    let movement = 0;
    if (this.keys) {
      if (this.keys.up.isDown) { movement = -this.speed; };
      if (this.keys.down.isDown) { movement = this.speed; };

      this.y = Math.min(410, Math.max(70, this.y + movement))
    } else {
      const xDistance = Math.abs(ball.x - this.x)
      const targetY1 = this.scene.halfWidth;
      const targetY2 = ball.y + this.aiOffset;
      const weight1 = Math.min(1, xDistance / 360); //returns 1 if the ball is on the opposite side of the screen as the AI bat
      const weight2 = 1 - weight1; // returns 0 if the ball is on the opposite side of the screen to the AI bat
      const targetY = (weight1 * targetY1) + (weight2 * targetY2);

      if (targetY < this.y - this.halfSpeed) { // prevents the bat from glitching as just targetY < this.y can cause the bat to always be above or below the center
        movement = -this.speed
      } else if (targetY > this.y + this.halfSpeed) {
        movement = this.speed;
      }

      this.y = Math.min(this.scene.halfHeight, Math.max(80, this.y + movement))
    }
  }

  changeOffset() {
    this.aiOffset = this.integerBetween(-50, 50);
  }

  integerBetween(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min) + min)
  }

  isWinner() {
    return this.score >= 10;
  }

  countDownTimer() {
    if (this.timer > 0) {
      this.timer--;
    } else if (this.texture.key != this.position){
      this.setTexture(this.position)
    }
  }

  displayImage(type, time = 4) {
    this.timer = time;
    this.setTexture(`${this.position}_${type}`)
  }
}
