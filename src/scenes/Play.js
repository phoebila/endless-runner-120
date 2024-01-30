class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create(){
        //set up audio
        // adding music WORKS!!!
        this.music = this.sound.add('bg-music', {volume: .1});
        this.music.setLoop(true);
        this.music.play();

        // add scrolling bg
        this.bg = this.add.tileSprite(0,0, 640, 480, 'catBG').setOrigin(0,0).setScrollFactor(0,1)

        // REV PHYSICS ENGINE
        game.physics.startSystem(Phaser.Physics.ARCADE)

        // adding score keeping
        score = 0

        // display score
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
        this.scoreTop = this.add.text(0, 0, score, scoreConfig)

        //adding pickup speed
        speed = 1

        // carpet (ground) creation
        carpet = game.add.group()
        carpet.enableBody = true

        var carpetGr = carpet.create(0, game.world.height - 64, "carpet")
        carpetGr.scale.setTo(2, 2)
        carpetGr.body.immovable = true
        

        // green couch platforms
        couches = game.add.group()
        couches.enableBody = true

        // adding randomized couch platforms
        for (let i = 0; i < 8; i++){
            let couchPlat = couches.create(game.rnd.integerInRange(300, game.stage.width),
            game.rnd.integerInRange(game.height-100, game.height-300),
            "couch")

            couchPlat.scale.setTo(game.rnd.integerInRange(1, 10)/10, 1)
            couchPlat.body.immovable = true
        }

        // set up cursor keys (up to jump)
        cursors = this.input.keyboard.createCursorKeys();
        // setting restart button
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

    }

    update(){
        
        // check for collisions
        var onCouch = (game.physics.arcade.collide(Yumi, couches) ||
        game.physics.arcade.collide(Yumi, carpet));

        var onCarpet = Yumi.body.touching.down

        // update background
        this.bg.setTilePosition(this.cameras.main.scrollX)
    }

    //other functions for:
        // level bump
        //collisions

    // on death --> this.scene.start('endingScene'), stop music
}