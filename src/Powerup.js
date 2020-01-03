import Phaser from "phaser";

export default class Powerup extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, key, width = 48, height = 48) {
    super(scene, x, y, key)
    scene.add.existing(this); // add the impact to the scene
    scene.physics.add.existing(this, 0)
    this.velocities = [-40, 40];
    // scene.objects.push(this); // add the impact to the list of objects to update
    this.setVelocity(this.velocities[Math.floor(Math.random() * this.velocities.length)], this.velocities[Math.floor(Math.random() * this.velocities.length)]);
    this.setCollideWorldBounds(true);
    this.setBounce(1)
    this.setSize(width, height)
  }
}
