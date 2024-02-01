// Phoebe Royer
// Yumi's Epic Adventure
// Endless runner for CMPM120


// NEED --------------------------------------------------------
// Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (1)
// Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (1)
// Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (1)
// Be theoretically endless (1)
// Be playable for at least 15 seconds for a new player of low to moderate skill (1)
// Run without significant crashes or errors (1)
// Include in-game credits for all roles, assets, music, etc. (1)
// --------------------------------------------------------------

// DONE ---------------------------------------------------------
// Properly transition between Scenes and allow the player to restart w/out having to reload the page (1)
// Use multiple Scene classes (dictated by your game's style) (1)
// Have looping background music* (1)
// Use a minimum of four sound effects for key mechanics, UI, and/or significant events appropriate to your game design (1)
// Simulate scrolling with a tileSprite (or equivalent means) (1)
// Implement proper collision detection (via Arcade Physics or a custom routine) (1)
// Include one or more animated characters that use a texture atlas* (1)
// Have some form of player input/control appropriate to your game design (1)
// --------------------------------------------------------------

          //     _   _
          //    /\\_//\
          //   / o _ o \
          //  /_   X   _\
          //    \_____/
          //    /  o  \
          //   /       \__
          //   \_(_|_)___ \
          //          (___/


let config = {
    type: Phaser.AUTO,
    render: {
      pixelArt: true
    },
    width: 640,
    height: 480,
    scene: [Loading, Title, Play, Ending, Credits],
    physics: {
      default: "arcade",
      arcade: {
          gravity: {y: 300},
          debug: false
          // debug: true (shows physics boxes)
      }
    }
  }

let game = new Phaser.Game(config);

// define globals
let keyRESET
let keyMenu
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
let cursors;

// play globals
let score
let speed
let carpet //ground
let couches //platform
let height
let yumiPlayer

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3


// music credits:

// Music from #Uppbeat (free for Creators!):
// https://uppbeat.io/t/peter-lainson/immaginare
// License code: O3NMYITZXNSGGQGJ

// favicon: https://www.favicon.cc/?action=icon&file_id=948156