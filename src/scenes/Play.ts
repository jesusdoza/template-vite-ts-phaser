import { Scene } from "phaser";
import { config } from "../main";

export class Play extends Scene {
  VELOCITY = 200;
  width = config?.width ? Number(config.width) : 500;
  height = config?.height ? Number(config.height) : 500;

  constructor() {
    super("PlayScene");
    //load assets
  }

  //intialize game instances
  create() {
    //add image at position x ,y and reference from above
    this.add.image(this.width / 2, this.height / 2, "sky");
  }

  update(time, delta) {}
}
