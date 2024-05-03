// import { Boot } from "./scenes/NOT USED/Boot";
// import { Game as MainGame } from "./scenes/NOT USED/Game";
// import { GameOver } from "./scenes/NOT USED/GameOver";
// import { MainMenu } from "./scenes/NOT USED/MainMenu";
// import { Preloader } from "./scenes/NOT USED/Preloader";

import { Game, Types } from "phaser";
import { Flappy } from "./scenes/Flappy";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig

export const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  // width: window.innerWidth,
  height: 600,
  physics: {
    //arcade physics plugin manages physics simultations
    default: "arcade",
    arcade: {
      // gravity: { x: 0, y: 200 },
    },
  },
  parent: "game-container",
  backgroundColor: "#028af8",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  // scene: [Boot, Preloader, MainMenu, MainGame, GameOver],//defining multiple scens each with its own preload, create, update methods

  //single scene defined and using the functions below
  scene: [Flappy],
};

export default new Game(config);
