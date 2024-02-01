class Loading extends Phaser.Scene {
    constructor() {
        super("loadingScene")
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xbf7f35, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        // load graphical assets
        this.load.path = './assets/';

        //main menu screen
        this.load.image('yumiMenu', 'sprite/yumiMenu.png')

        //background --> gradient background with various cattoys
        this.load.image('catBG', 'sprite/cat_BG.png')

        // game over screen --> cat butthole?
        this.load.image('gameOver', 'sprite/yumiEnding.png')


        // ground --> pink carpet
        this.load.image('carpet', 'sprite/pinkcarpet.png')

        // assets
            // yumi cat
        this.load.spritesheet('yumi', 'sprite/yumi.png', { //FIX SPRITESHEET
            frameWidth: 31,
            frameHeight: 16,
            startFrame: 0,
            endFrame: 2
        })
            // green couch platforms
        this.load.image('couch', 'sprite/couch.png')

        // sign for controls
        this.load.image('controls', '/sprite/signPlay.png')

        // treat incentive
        this.load.image('treat', '/sprite/treat.png')

        
        //load audio
            // start (cat squeak)
        this.load.audio('cat-squeak', 'audio/cat_squeak.mp3')
            // jump sound -> mew (meowing)
        this.load.audio('cat-mew', 'audio/cat_mew.mp3')
            // landing sound -> collision (purr)
        this.load.audio('cat-purr', 'audio/cat_purr.mp3')
            // death -> angry 
        this.load.audio('cat-angry', 'audio/cat_angry.mp3')

            // looping background music
        this.load.audio('bg-music', "audio/immaginare-peter-lainson.mp3")
    }

    create() {
        // START TITLE !!!
        this.scene.start('titleScene');

        // debugging only
        // this.scene.start('playScene')
    }
}