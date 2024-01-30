class Ending extends Phaser.Scene {
    constructor(){
        super("endingScene")
    }

    create(){
        //display game over screen

        //set up cursor keys
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    }

    update(){

        // key input to restart --> back to playScene
        if (Phaser.Input.Keyboard.JustDown(keyRESET)){
             this.scene.start('playScene')
        }
    }
}