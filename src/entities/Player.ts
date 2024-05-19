import Phaser from "phaser";

import initAnimations from "./playerAnims";

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
    this.initEvents();
  }

  init() {
    this.setGravityY(this.gravity);
    this.cursors = this.scene.input.keyboard?.createCursorKeys();

    initAnimations(this.scene.anims);

    this.setCollideWorldBounds();
  }

  initEvents() {
    //event listener for upate event
    //listen for update event and run update method on this class instance and this instance is the context
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update(): void {
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

    //dont play run animation if its already playing
    //ignore if playing "true"
    // 'run' name of animation
    this.play("idle", true);
  }
}

export default Player;
