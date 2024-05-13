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
    // this.add.image(this.width / 2, this.height / 2, "sky");

    let environment, platforms;
    const map = this.make.tilemap({ key: "map" });
    const tileset1 = map.addTilesetImage("mapTileset", "tileset1");

    //tilset can fail to load
    if (tileset1) {
      environment = map.createLayer("environment", tileset1);
      platforms = map.createLayer("platforms", tileset1);
    }
  }
}
