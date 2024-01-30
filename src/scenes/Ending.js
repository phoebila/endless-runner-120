class Ending extends Phaser.Scene {
    constructor(){
        super("endingScene")
    }

    create(score){
        //display game over screen w/ score

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