import Phaser from "phaser";

export default class MainMenu extends Phaser.Scene {
	constructor() {
		super('MainMenu')
		this.numPlayers = 1;
	}

	preload() {
    this.load.image('table', 'src/assets/images/table_test.png');
    this.load.image('left_bat', 'src/assets/images/bat.png');
		this.load.image('right_bat', 'src/assets/images/bat.png');
		this.load.image('menu1', 'src/assets/images/menu1.png');
		this.load.image('menu2', 'src/assets/images/menu2.png');
		this.load.image('game-over', 'src/assets/images/game-over.png');

		this.load.image('effect1', 'src/assets/images/effect1.png');
    this.load.image('effect2', 'src/assets/images/effect2.png');
    this.load.image('ball', 'src/assets/images/ball_white.png');

    for (let i = 0; i < 10; i++) {
      this.load.image(`digit0${i}`, `src/assets/images/digit0${i}.png`);
    };

    for (let i = 0; i < 5; i++) {
      this.load.image(`impact${i}`, `src/assets/images/impact${i}.png`);
		};
		
		this.load.audio('hit_slow0', 'src/assets/sounds/hit_slow0.ogg');
    this.load.audio('hit_medium0', 'src/assets/sounds/hit_medium0.ogg');
    this.load.audio('hit_fast0', 'src/assets/sounds/hit_fast0.ogg');
    this.load.audio('hit_veryfast0', 'src/assets/sounds/hit_veryfast0.ogg');
    this.load.audio('hit_synth0', 'src/assets/sounds/hit_synth0.ogg');
	}

	create() {
		this.keys = this.input.keyboard.createCursorKeys();
		this.add.image(400, 240, 'table');
		this.add.image(40, 240, 'left_bat');
		this.add.image(760, 240, 'right_bat');
		this.menu1 = this.add.image(400, 240, 'menu1');
		this.menu2 = this.add.image(400, 240, 'menu2').setVisible(false);
		this.menus = [this.menu1, this.menu2];
	}

	update() {
		this.keys.space.isDown ? this.startGame() : this.toggleMenu();
	}

	startGame() {
		this.scene.start('Play', { numPlayers: this.numPlayers });
	}

	toggleMenu() {
		if (this.shouldToggleMenu()) {
			this.toggleVisibleMenu();
			this.numPlayers = this.numPlayers === 1 ? 2 : 1;
		}
	}

	shouldToggleMenu() {
		return (this.keys.down.isDown && this.menu1.visible) || (this.keys.up.isDown && this.menu2.visible);
	}

	toggleVisibleMenu() {
		this.menus.forEach(menu => menu.setVisible(!menu.visible));
	}
}
