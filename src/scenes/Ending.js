class Ending extends Phaser.Scene {
    constructor(){
        super("endingScene")
    }

    create(score){
        //display game over screen w/ score
        this.ending =  this.add.tileSprite(0, 0, 640, 480, 'gameOver').setOrigin(0, 0)

        // display score number
        let scoreConfig = {
            fontFamily: 'quicksand',
            fontSize: '28px',
            color: '#ff9814',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2 + 64, `Score: ${score}`, scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 128, `Press R to restart`, scoreConfig).setOrigin(0.5)

        // play sound
        this.playSound = this.sound.add('cat-mew',{volume: .5} )

        //set up cursor keys
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    }

    update(){

        // key input to restart --> back to playScene
        if (Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.playSound.play()
            this.scene.start('playScene')
        }
    }
}