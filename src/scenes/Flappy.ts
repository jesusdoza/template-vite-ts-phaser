import { Scene } from "phaser";
import { config } from "../main";

export class Flappy extends Scene {
  public bird: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

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
    const width = config?.width ? Number(config.width) : 500;
    const height = config?.height ? Number(config.height) : 500;

    //add image at position x ,y and reference from above
    this.add.image(width / 2, height / 2, "sky");

    //bird with just display and no physics
    // const bird = this.add.sprite(width / 10, height / 2, "bird").setOrigin(0);

    //add bird with physics body so it will have a body
    this.bird = this.physics.add
      .sprite(width / 10, height / 2, "bird")
      .setOrigin(0);
    console.log("bird.body", this.bird.body);

    // this.bird.body.velocity.y = 200; //velocity starts at 200 and stays there?
  }

  //update called every frame
  //normally 60fps so 60 times per second called
  //time is currenty time
  //delta time since last frame
  update(time, delta) {}
}
