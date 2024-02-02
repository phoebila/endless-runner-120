// Phoebe Royer
// Yumi's Epic Adventure
// Approx game development: ~15-20 hrs
// Creative tilt:
  // technically interesting: went to office hours to get help on
  // generating couch platforms, but instead realized instead of generating
  // platforms, I just reuse the assets creating the 'scrolling' effect.

  // visual style: I created all visual assets from scratch, I'm learning aesprite as a beginner,
  // and figured out how to animate sprites (yumi) and create a tiled background.

// Endless runner for CMPM120

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
let treat

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3


// music credits:
// Music from #Uppbeat (free for Creators!):
// https://uppbeat.io/t/peter-lainson/immaginare
// License code: O3NMYITZXNSGGQGJ

// favicon: https://www.favicon.cc/?action=icon&file_id=948156

// THANK YOU SO MUCH DANI!!!!
  // game heavily inspired by: https://scareoset.itch.io/endless-runner
  