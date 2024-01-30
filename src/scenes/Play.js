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

        // add point celebration noise
        this.pointCelebrate = this.sound.add('cat-squeak',{volume: .5} )

        // add death noise
        this.death = this.sound.add('cat-angry', {volume: .5})


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

        // seeing if Yumi is blocked by couch
        var hitCouch = (game.physics.arcade.collide(Yumi, couches))
        // adding jump (just one)
        if (cursors.up.isDown && Yumi.body.touching.down && hitCouch){
            Yumi.body.velocity.y = -500
        }


        // check for collisions
        var onCouch = (game.physics.arcade.collide(Yumi, couches) ||
        game.physics.arcade.collide(Yumi, carpet));
        
        // pushing yumi back
        if (onCouch){
            Yumi.x = 50
        }

        var onCarpet = Yumi.body.touching.down

        //adding sound effects!
        // score celebration
        if (score%50 == 0 && score > 40){
            this.pointCelebrate.play()
        }
        // death noise + end scene
        if(Yumi.x < 0 || Yumi.y > 500) { // player leaves screen and dies
            this.death.play();
            this.scene.start("endingScene", score);
        }

        // animation styles (YIPPEE)
        if (cursors.right.isDown && speed == 1){
            this.bg.tilePosition.x -= 2
            Yumi.animations.play("walk")
            let height = 1

            // moving couches to left when yumi runs right
            couches.forEach(function(c){
                c.body.velocity.x = -800
                if (height > 3){
                    height = 1
                }
                if (c.x < -game.stage.width/3){
                    c.x = game.rnd.integerInRange(game.width, game.width + 300)
                    c.y = game.rnd.integerInRange(0, game.height- (100 * height))
                    height++
                    score++
                }
            })
            }

        // SPEEDING THINGS UP BUCKO
        if (cursors.right.isDown && speed == 2){
            this.bg.tilePosition.x -= 3
            Yumi.animations.play("run")
            let height = 1

            couches.forEach(function(c){
                c.body.velocity.x = -1000
                if (height > 3){
                    height = 1
                }
                if (c.x < -game.stage.width/3){
                    c.x = game.rnd.integerInRange(game.width, game.width + 300)
                    c.y = game.rnd.integerInRange(0, game.height- (100 * height))
                    height++
                    score++
                }
            })

        }

        // slowing things down
        else if (cursors.right.isDown && speed == 0){
            this.bg.tilePosition.x -= 1
            Yumi.animations.play("crawl")
            let height = 1

            couches.forEach(function(c){
                c.body.velocity.x = -600
                if (height > 3){
                    height = 1
                }
                if (c.x < -game.stage.width/3){
                    c.x = game.rnd.integerInRange(game.width, game.width + 300)
                    c.y = game.rnd.integerInRange(0, game.height- (100 * height))
                    height++
                    score++
                }
            })

        }
        // not moving
        else {
            Yumi.animations.stop()
            Yumi.frame = 0
            couches.forEach(function(c){
                c.body.velocity.x = 0
            })
        }

        // update background
        this.bg.setTilePosition(this.cameras.main.scrollX)
    }

    // on death --> this.scene.start('endingScene'), stop music
}