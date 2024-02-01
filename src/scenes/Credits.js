class Credits extends Phaser.Scene {
    constructor(){
        super("creditsScene")
    }

    create() {
        this.ending =  this.add.tileSprite(0, 0, 640, 480, 'gameOver').setOrigin(0, 0)

        // display score number
        let creditConfig = {
            fontFamily: 'quicksand',
            fontSize: '16px',
            color: '#ff9814',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2, "BG Music: https://uppbeat.io/t/peter-lainson/immaginare", creditConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 64, `Assets are made by me! (Phoebe)`, creditConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 128, "Press M for menu", creditConfig).setOrigin(0.5)

        keyMenu = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyMenu)){
            this.scene.start('titleScene')
        }
    }
}