import { Scene } from "phaser";
import { config } from "../main";

export class Flappy extends Scene {
  public bird: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  VELOCITY = 200;
  width = config?.width ? Number(config.width) : 500;
  height = config?.height ? Number(config.height) : 500;

  constructor() {
    super("Flappy");
    //load assets
  }

  preload() {
    this.load.setPath("assets");

    //load with key, filename
    this.load.image("sky", "sky.png");
    this.load.image("bird", "bird.png");
  }

  //intialize game instances
  create() {
    //add image at position x ,y and reference from above
    this.add.image(this.width / 2, this.height / 2, "sky");

    //add bird with physics body so it will have a body
    this.bird = this.physics.add
      .sprite(this.width / 10, this.height / 2, "bird")
      .setOrigin(0, 0);

    this.bird.body.velocity.x = this.VELOCITY; //velocity starts at 200 and stays there?

    console.log("bird.body.velocity", this.bird.body);
  }

  update(time, delta) {
    if (this.bird.x >= this.width - this.bird.width) {
      this.bird.body.velocity.x = -this.VELOCITY;
      console.log("this.bird.body.position", this.bird.body.position);
    } else if (this.bird.x <= 0) {
      this.bird.body.velocity.x = this.VELOCITY;
      console.log("this.bird.body.position", this.bird.body.position);
      return;
    }
  }
}
