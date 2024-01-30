class Ending extends Phaser.Scene {
    constructor(){
        super("endingScene")
    }

    create(score){
        //display game over screen w/ score

        // display score number
        let scoreConfig = {
            fontFamily: 'quicksand',
            fontSize: '16px',
            backgroundColor: '#b3325f',
            color: '#000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.add.text(game.config.width/2, game.config.height/2 + 64, `Score: ${score}`, scoreConfig).setOrigin(0.5)

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