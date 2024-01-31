class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create(){
        //set up audio ---------------------------------------
        this.music = this.sound.add('bg-music', {volume: .1});
        this.music.setLoop(true);
        this.music.play();

        // add point celebration noise
        this.pointCelebrate = this.sound.add('cat-purr',{volume: .5} )

        // add jump noise
        this.jumpSfx = this.sound.add('cat-squeak', {volume: .5})

        // add death noise
        this.death = this.sound.add('cat-angry', {volume: .5})

        // add scrolling bg
        this.bg = this.add.tileSprite(0,0, 640, 480, 'catBG').setOrigin(0,0)

        // Yumi (player) Creation ------------------------------
        yumiPlayer = this.physics.add.sprite(100, 425, "yumi")
        yumiPlayer.setBounce(0.1)
        yumiPlayer.setColliderWorldBounds = true

        // yumi animation setup
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('yumi', {start: 0, end: 2}),
            frameRate: 7,
            repeat: -1
        })

        // adding score keeping
        score = 0

        // display score -------------------------------------
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
        
        speed = 1

        // green couch platforms ---------------------------------
        couches = this.physics.add.group()
        couches.enableBody = true

        // adding randomized couch platforms
        for (let i = 0; i < 8; i++){
            couches.create(Phaser.Math.Between(300, w),
            Phaser.Math.Between(h-50, h-300),
            "couch").setScale(Phaser.Math.Between(3, 12)/10, 1).setImmovable(true)
        }

        for (const couch of couches.getChildren()){ // making sure the platforms don't fall through scene
            couch.body.setAllowGravity(false)
        }
        
        // carpet (ground) creation ------------------------------
        carpet = this.physics.add.staticGroup()
        carpet.create(320.5, h+200, "carpet").refreshBody()
        

        this.physics.add.collider(yumiPlayer, carpet);
        this.physics.add.collider(yumiPlayer, couches);
        this.physics.add.collider(couches, carpet);

        // set up cursor keys (up to jump) --------------------------
        cursors = this.input.keyboard.createCursorKeys();
        // setting restart button
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

    }

    update(){ // HALP!!!

        // debugging --------------------------------------------------
        // if (cursors.right.isDown){
            // console.log('this is hitting the right key');
            // yumiPlayer.setVelocityX(160)
            // yumiPlayer.anims.play('walk', true)
        // }
        // checking if Yumi is blocked by couch
        var hitCouch = this.physics.collide(yumiPlayer, couches)
        if (hitCouch == true){
            console.log('couch has been collided with by yumi');
        }
        // --------------------------------------------------
        
        // adding jump (just one)
        if (cursors.up.isDown && yumiPlayer.body.touching.down){
            yumiPlayer.body.velocity.y = -250
            this.jumpSfx.play()
        }

        //adding sound effects!
        // score celebration
        if (score%50 == 0 && score > 40){
            this.pointCelebrate.play()
        }
        
        // Basic side scrolling movement -------------------------------------------------------------------
        // Randomly generating green couches

        if (cursors.right.isDown && speed == 1){
            this.bg.tilePositionX += 2
            let height = 1

            yumiPlayer.anims.play('walk', true)

            // moving couches to left when yumi runs right
            for (const couch of couches.getChildren()){
                couch.body.velocity.x = -400
                if (height > 3){
                    height = 1
                }

                if (couch.x < -w/2){ // fix couch coord generation
                    couch.x = Phaser.Math.Between(w, w + 300)
                    couch.y = Phaser.Math.Between(0, h-(100 * height))
                    height++
                    score++
                    // update score
                    this.scoreLeft.text = score
                }
            }
        }
        // not moving
        else {
            yumiPlayer.anims.stop()
            couches.children.each(c => {
                c.body.velocity.x = 0
            })
        }

        // death noise + end scene
        if(yumiPlayer.x < 0 || yumiPlayer.y > 500) { // player leaves screen, or gets too slow, then dies
            this.death.play();
            this.music.stop()
            yumiPlayer.destroy()
            this.scene.start("endingScene", score);
        }
    }
}

// help with:
    // get couches to move left
    // get yumi physics