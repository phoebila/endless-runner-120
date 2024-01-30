class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create(){
        //set up audio

        //create barriers

        //make game

        // set up cursor keys (up to jump)
        cursors = this.input.keyboard.createCursorKeys();
        // setting restart button
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

    }

    update(){
        // check for player input
        // check for collisions
    }

    //other functions for:
        // level bump
        //collisions

    // on death --> this.scene.start('endingScene')
}