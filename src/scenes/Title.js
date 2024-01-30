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
        if (Phaser.Input.Keyboard.JustDown(cursors.up)){
            this.scene.start('playScene')
        }
    }
}