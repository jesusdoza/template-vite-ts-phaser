import { Scene } from "phaser";
import { config } from "../main";
import Player from "../entities/Player";

export class Play extends Scene {
  VELOCITY = 200;
  width = config?.width ? Number(config.width) : 500;
  height = config?.height ? Number(config.height) : 500;

  playerSpeed: number = 0;
  constructor() {
    super("PlayScene");
  }

  //intialize game instances
  create() {
    //add image at position x ,y and reference from above
    // this.add.image(this.width / 2, this.height / 2, "sky");
    const map = this.createMap();
    const layers = this.createLayers(map);

    const player = this.createPlayer();

    //add platform colliders
    try {
      if (!layers?.platformColliders) {
        throw Error("platformColliders layer missing");
      }
      this.physics.add.collider(player, layers.platformColliders);
    } catch (error) {
      console.log("error loading platformColliders", error);
    }

    this.playerSpeed = 200;
  }

  //METHODS
  createPlayer() {
    return new Player(this, 100, 50);
  }

  createMap() {
    const map = this.make.tilemap({ key: "map" });

    return map;
  }

  createLayers(map: Phaser.Tilemaps.Tilemap) {
    const mapTileSet = map.addTilesetImage("mapTileset", "mapTileSet");
    let environment;
    let platforms;
    let platformColliders;

    //tileset can fail to load checking tileset is loaded
    try {
      if (!mapTileSet) throw Error("map tileset not loaded");

      environment = map.createLayer("environment", mapTileSet);
      platformColliders = map.createLayer("platform_colliders", mapTileSet);
      platforms = map.createLayer("platforms", mapTileSet);
    } catch (error) {
      console.log("error creatring layers ", error);
    }

    //add collision rules
    try {
      if (!platformColliders) throw Error("missing platformColliders");

      //any index of equal values will not be collided with
      platformColliders.setCollisionByExclusion([-1], true);
    } catch (error) {
      console.log("error with platformColliders layer ", error);
    }

    return { environment, platforms, platformColliders };
  }
}
