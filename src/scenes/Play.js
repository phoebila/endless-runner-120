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

        // add jump noise
        this.jumpSfx = this.sound.add('cat-squeak', {volume: .5})

        // add death noise
        this.death = this.sound.add('cat-angry', {volume: .5})

        // add scrolling bg
        this.bg = this.add.tileSprite(0,0, 640, 480, 'catBG').setOrigin(0,0).setScrollFactor(0,1)

        // Yumi (player) Creation
        yumiPlayer = new Yumi(this, 40, 385, 'yumi').setOrigin(0,0)

        // adding score keeping
        score = 0

        // display score
        let scoreConfig = {
            fontFamily: 'quicksand',
            fontSize: '28px',
            backgroundColor: '#b3325f',
            color: '#000',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        // adding score rectangle
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2).setOrigin(0, 0)
        // adding score text
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, score, scoreConfig)
        
        //adding pickup speed --> HOW/WHEN TO UPDATE?
        speed = 1

        // HOW 2 CREATE GROUP OF OBJECTS WITH PHYSICS?

        // carpet (ground) creation
        carpet = this.add.group()
        carpet.enableBody = true

        var carpetGr = carpet.create(320.5, h+400, "carpet")
        carpetGr.setScale(2, 2)
        carpetGr.setImmoveable = true

        // green couch platforms
        couches = this.add.group()
        couches.enableBody = true

        // adding randomized couch platforms
        for (let i = 0; i < 8; i++){
            let couchPlat = couches.create(Phaser.Math.Between(300, w),
            Phaser.Math.Between(h-100, h-300),
            "couch")

            couchPlat.setScale(Phaser.Math.Between(1, 10)/10, 1)
            couchPlat.setImmoveable = true
        }

        // set up cursor keys (up to jump)
        cursors = this.input.keyboard.createCursorKeys();
        // setting restart button
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

    }

    update(){ // HALP!!!

        // debugging --------------------------------------------------
        if (cursors.right.isDown){
            // console.log('this is hitting the right key');
            yumiPlayer.x += 15
        }

        if (cursors.left.isDown){
            yumiPlayer.x -= 15
        }

        if (cursors.up.isDown){
            yumiPlayer.y -= 5
            this.jumpSfx.play()
        }
        // --------------------------------------------------

        // checking if Yumi is blocked by couch
        var hitCouch = this.physics.collide(yumiPlayer, couches)
        
        // adding jump (just one)
        // if (cursors.up.isDown && yumiPlayer.body.touching.down && hitCouch){
        //     yumiPlayer.body.velocity.y = -500
        // }

        // check for collisions (couches and ground)
        // var onCouch = (this.physics.collide(yumiPlayer, couches) ||
        // this.physics.collide(yumiPlayer, carpet));
        
        // pushing yumiPlayer back
        // if (onCouch){
        //     yumiPlayer.x -= 50
        // }

        // checking if yumi is on the ground
        // var onCarpet = Yumi.body.touching.down

        //adding sound effects!
        // score celebration
        if (score%50 == 0 && score > 40){
            this.pointCelebrate.play()
        }

        // determining speed? speeds up with score inscrease, stops with collision with couch
        if (hitCouch == true){ // collision with couch, slow down
            speed--
        }
        else if (hitCouch != true && score >= 50){ //no collision with couch and increasing score
            if (speed == 1){ // speed can't get more than 2
                speed++
            }
        }
        
        // Basic side scrolling movement -------------------------------------------------------------------
        // Randomly generating green couches

        // how to get side scrolling effect?
        if (cursors.right.isDown && speed == 1){
            this.bg.tilePositionX -= 2
            // get anims working
            // Yumi.animations.play("walk")
            let height = 1

            // moving couches to left when yumi runs right
            couches.children.each(function(c){
                if (height > 3){
                    height = 1
                }
                if (c.x < -w/3){
                    c.x = Phaser.Math.Between(game.width, game.width + 300)
                    c.y = Phaser.Math.Between(0, h- (100 * height))
                    height++
                    score++
                    // update score
                    this.scoreLeft.text = score
                }
            })
            }

        // SPEEDING THINGS UP BUCKO -------------------------------------------------------------------
        if (cursors.right.isDown && speed == 2){
            this.bg.tilePositionX -= 3
            // get anims working
            // Yumi.animations.play("run")
            let height = 1

            couches.children.each(c => {
                if (height > 3){
                    height = 1
                }
                if (c.x < -w/3){
                    c.x = Phaser.Math.Between(game.width, game.width + 300)
                    c.y = Phaser.Math.Between(0, h- (100 * height))
                    height++
                    score++
                    // update score
                    this.scoreLeft.text = score
                }
            })

        }

        // slowing things down -------------------------------------------------------------------
        else if (cursors.right.isDown && speed == 0){
            this.bg.tilePositionX -= 1

            // get anims working
            // Yumi.animations.play("crawl")
            let height = 1

            couches.children.each(c => {
                if (height > 3){
                    height = 1
                }
                if (c.x < -w/3){
                    c.x = Phaser.Math.Between(game.width, game.width + 300)
                    c.y = Phaser.Math.Between(0, h- (100 * height))
                    height++
                    score++
                    // update score
                    this.scoreLeft.text = score
                }
            })

        }
        // not moving
        else if (speed < 0){
            // Yumi.animations.stop()
            // Yumi.frame = 0
            couches.children.each(c => {
                c.body.velocity.x = 0
            })
        }

        // death noise + end scene
        // on death --> this.scene.start('endingScene'), stop music
        if(yumiPlayer.x < 0 || yumiPlayer.y > 500 || speed < 0) { // player leaves screen, or gets too slow, then dies
            this.death.play();
            this.music.stop()
            // yumiPlayer.destroy()
            this.scene.start("endingScene", score);
        }

        // update background
        this.bg.setTilePosition(this.cameras.main.scrollX)
    }

}