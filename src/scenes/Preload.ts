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

    ///map file
    this.load.tilemapTiledJSON("map", "/maps/map.json");

    ///tile map
    this.load.image("mapTileSet", "/maps/mapTileset.png");

    ///player sprite idle
    // this.load.image("player", "/player/movements/idle01.png");

    ///player sprite movement
    this.load.spritesheet("player", "/player/move_sprite_1.png", {
      frameWidth: 32,
      frameHeight: 38,
      spacing: 32, //take of empty space till next frame in sprite sheet
    });
  }

  //intialize game instances
  create() {
    this.scene.start("PlayScene");
  }
}

export default Preload;
