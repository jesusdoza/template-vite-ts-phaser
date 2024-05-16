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
    const map = this.createMap();
    const layers = this.createLayers(map);
    const player = this.createPlayer();

    try {
      if (!layers?.platforms) throw Error("platform layer missing");
      this.physics.add.collider(player, layers.platforms);
    } catch (error) {
      console.log("loading player to platform collicder", error);
    }
  }

  //METHODS
  createPlayer() {
    const player = this.physics.add.sprite(100, 50, "player");
    player.body.setGravityY(500);
    player.setCollideWorldBounds(true);

    return player;
  }
  createMap() {
    const map = this.make.tilemap({ key: "map" });

    return map;
  }

  createLayers(map: Phaser.Tilemaps.Tilemap) {
    const tileset1 = map.addTilesetImage("mapTileset", "tileset1");
    let environment;
    let platforms;
    //tileset can fail to load checking tileset is loaded
    if (tileset1) {
      environment = map.createLayer("environment", tileset1);
      platforms = map.createLayer("platforms", tileset1);

      platforms?.setCollisionByExclusion([-1], true);
    }

    return { environment, platforms };
  }
}
