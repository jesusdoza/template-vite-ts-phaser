import { Scene } from "phaser";
import { config } from "../main";

class Preload extends Scene {
  width = config?.width ? Number(config.width) : 500;
  height = config?.height ? Number(config.height) : 500;

  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.setPath("assets");

    //load with key, filename
    this.load.image("sky", "sky.png");
  }

  //intialize game instances
  create() {
    this.scene.start("PlayScene");
  }

  update() {}
}

export default Preload;
