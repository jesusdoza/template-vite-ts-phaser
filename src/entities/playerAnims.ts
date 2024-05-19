export default (anims: Phaser.Animations.AnimationManager) => {
  ///animation
  anims.create({
    key: "idle",
    frameRate: 8,
    repeat: -1,
    frames: anims.generateFrameNumbers("player", {
      start: 0, // what frame in spritsheet to start
      end: 8,
    }),
  });

  anims.create({
    key: "run",
    frameRate: 8,
    repeat: -1,
    frames: anims.generateFrameNumbers("player", {
      start: 11, // what frame in spritsheet to start
      end: 16,
    }),
  });
};
