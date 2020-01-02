import Phaser from "phaser";
import Bat from './Bat';
import Ball from './Ball';
import Impact from './Impact';

export default class Play extends Phaser.Scene {
	constructor() {
    super('Play')
    this.timer = 0;
  }

  init(data) {
    this.numPlayers = data.numPlayers
  }

  create () {
    this.configureInput();
    this.createTable();
    this.createObjects();
    this.addColliders();
  }

  scoreGoal(attacker, defender, effect) {
    this[attacker].score++;
    this.scoreEffect = this.add.image(400, 240, effect)
    
    let position;
    attacker === 'bat1' ? position = [340, 83] : position = [460, 83];
    
    if (this[attacker].isWinner()) {
      this.scene.start('GameOver');
    } else {
      this.timer = 12;
      this[`${attacker}Score`].destroy();
      this[`${attacker}Score`] = this.add.image(...position, `digit0${this[attacker].score}`);
    }
  }

  update () {
    if (this.ball.isOut()) {
      if (this.ball.isOutLeft()) {
        this.scoreGoal('bat2', 'bat1', 'effect1')
      } else {
        this.scoreGoal('bat1', 'bat2', 'effect2')
      }
      this.ball.kickOff()
    } else {
      if (this.timer > 0) {
        this.timer--;
      } else if (this.scoreEffect){
        this.scoreEffect.destroy();
      }
      this.objects.forEach(obj => obj.update(this.ball));
    }
  }

  configureInput() {
    this.keys = this.input.keyboard.addKeys({
      up: 'up',
      down: 'down',
      space: 'space',
      w: 'W',
      s: 'S'
    })
  }

  createTable() {
    this.halfWidth = 400;
    this.halfHeight = 240;
    this.add.image(400, 240, 'table');
    this.bat1Score = this.add.image(340, 83, 'digit00');
    this.bat2Score = this.add.image(460, 83, 'digit00');
  }

  createObjects() {
    if (this.numPlayers === 1) {
      this.bat1 = new Bat(this, 40, 240, 'left_bat', { up: this.keys.up, down: this.keys.down }).setDepth(1);
      this.bat2 = new Bat(this, 760, 240, 'right_bat').setDepth(1);
    } else if (this.numPlayers === 2) {
      this.bat1 = new Bat(this, 40, 240, 'left_bat', { up: this.keys.w, down: this.keys.s }).setDepth(1);
      this.bat2 = new Bat(this, 760, 240, 'right_bat', { up: this.keys.up, down: this.keys.down }).setDepth(1);
    }

    this.ball = new Ball(this, 400, 240, 'ball').setDepth(1);
    this.objects = [this.bat1, this.bat2, this.ball]
  }

  addColliders() {
    this.physics.add.collider(this.ball, this.bat1, this.collideBall, null, this);
    this.physics.add.collider(this.ball, this.bat2, this.collideBall, null, this);
    this.physics.world.checkCollision.left = false;
    this.physics.world.checkCollision.right = false;
  }

  collideBall(ball, bat) {
    new Impact(this, ball.x, ball.y, 'impact0');
    ball.collideWithBat(bat)
  }
}
