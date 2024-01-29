// Phoebe Royer
// WIP TITLE
// Endless runner for CMPM120

let config = {
    type: Phaser.AUTO,
    render: {
      pixelArt: true
    },
    width: 640,
    height: 480,
    scene: [Loading, Title, Play, Ending]
  }

let game = new Phaser.Game(config);

// define globals
// reserve keyboard bindings --> CHANGE
let keyFIRE, keyRESET, keyLEFT, keyRIGHT