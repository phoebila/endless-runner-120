class Title extends Phaser.Scene {
    constructor() {
        super("titleScene")
    }

    create() {
        // display main menu
        // animation config

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update() {
        // update based on title input
        // END --> this.scene.start('playScene')
    }
}