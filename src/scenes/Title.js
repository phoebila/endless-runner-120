class Title extends Phaser.Scene {
    constructor() {
        super("titleScene")
    }

    create() {
        // display main menu
        this.mainMenu =  this.add.tileSprite(0, 0, 640, 480, 'yumiMenu').setOrigin(0, 0)

        // animation config

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();  

        // play sound
        this.playSound = this.sound.add('cat-mew',{volume: .5} )
    }

    update() {
        // update based on title input
        if (Phaser.Input.Keyboard.JustDown(cursors.up)){
            this.playSound.play()
            this.scene.start('playScene')
        }
    }
}