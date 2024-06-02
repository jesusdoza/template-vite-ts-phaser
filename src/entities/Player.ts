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
    //allows this object to take in input
    this.setInteractive();

    this.setGravityY(this.gravity);
    this.cursors = this.scene.input.keyboard?.createCursorKeys();

    initAnimations(this.scene.anims);

    this.setCollideWorldBounds(true);
  }

  initEvents() {
    this.addListener(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      console.log("click");
    });
    //event listener for upate event
    //listen for update event and run update method on this class instance and this instance is the context
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update(): void {
    //cursor is valid
    if (this.cursors) {
      //destructure left and right and assign to let left and let right
      const { left, right, space, up } = this.cursors;

      if (left.isDown) {
        this.setVelocityX(-this.playerSpeed);
        this.setFlipX(true);
      } else if (right.isDown) {
        this.setVelocityX(this.playerSpeed);
        this.setFlipX(false);
      } else {
        this.setVelocityX(0);
      }

      //jump only if on floor
      if ((space.isDown || up.isDown) && this.isOnFloor()) {
        this.setVelocityY(-this.playerSpeed);
      }
    }

    //choose animation to play
    this.body?.velocity.x != 0
      ? this.play("run", true)
      : this.play("idle", true);
  }

  isOnFloor(): boolean {
    const body = this.body as Phaser.Physics.Arcade.Body;
    return body.onFloor();
  }
}

export default Player;
