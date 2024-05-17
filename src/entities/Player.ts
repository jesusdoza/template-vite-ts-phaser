import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
  gravity = 500;
  playerSpeed = 200;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    ///player is key of sprite loaded in preload scene
    super(scene, x, y, "player");

    //add current sprite 'this' instance to scene we pass in
    scene.add
      .existing(this)
      //add physics to this instance from the scene we pass in
      .scene.physics.add.existing(this);

    this.init();
  }

  init() {
    this.setGravityY(this.gravity);
    this.cursors = this.scene.input.keyboard?.createCursorKeys();
    if (this.body) {
      this.body.setSize(20, 30, true);
      this.setOffset(10, 30);
    }
    this.setCollideWorldBounds();
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    let left, right;

    //cursor is valid
    if (this.cursors) {
      ({ left, right } = this.cursors);

      if (left.isDown) {
        this.setVelocityX(-this.playerSpeed);
      } else if (right.isDown) {
        this.setVelocityX(this.playerSpeed);
      } else {
        this.setVelocityX(0);
      }
    }
  }
}

export default Player;
