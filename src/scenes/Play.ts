import { Scene } from "phaser";
import { config } from "../main";

export class Play extends Scene {
  VELOCITY = 200;
  width = config?.width ? Number(config.width) : 500;
  height = config?.height ? Number(config.height) : 500;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
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
    this.player = this.createPlayer();

    //add platform colliders
    try {
      if (!layers?.platformColliders) {
        throw Error("platformColliders layer missing");
      }
      this.physics.add.collider(this.player, layers.platformColliders);
    } catch (error) {
      console.log("error loading platformColliders", error);
    }

    this.playerSpeed = 200;

    //keyboard controls
    this.cursors = this.input.keyboard?.createCursorKeys();
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

  update() {
    let left, right;

    //cursor is valid
    if (this.cursors) {
      ({ left, right } = this.cursors);

      if (left.isDown) {
        this.player.setVelocityX(-this.playerSpeed);
      } else if (right.isDown) {
        this.player.setVelocityX(this.playerSpeed);
      } else {
        this.player.setVelocityX(0);
      }
    }
  }
}
