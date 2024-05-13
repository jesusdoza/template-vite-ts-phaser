import { Scene } from "phaser";
import { config } from "../main";

class Preload extends Scene {
  // width = config?.width ? Number(config.width) : 500;
  // height = config?.height ? Number(config.height) : 500;

  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.setPath("assets");
    this.load.tilemapTiledJSON("map", "/maps/map.json");
    this.load.image("tileset1", "/maps/mapTileset.png");
  }

  //intialize game instances
  create() {
    this.scene.start("PlayScene");
  }
}

export default Preload;
