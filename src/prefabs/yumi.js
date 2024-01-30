class Yumi extends Phaser.GameObjects.Sprite {
    constructor(){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)

        this.moveable = true
        this.setCollideWorldBounds = true
        this.enableBody = true
    }

    update(){
        // right movement
        if (cursors.right.isDown && this.moveable){
            if (this.x > this.x >= borderUISize + this.width){
                // move yumi right
                this.x += game.settings.scrollSpeed/2
            }
        }

        // jump movement
        if (cursors.up.isDown && this.y >= borderUISize * 3 + borderPadding){
            this.y -= 20
        }
    }
}