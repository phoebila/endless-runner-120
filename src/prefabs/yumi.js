class Yumi extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)

        this.setCollideWorldBounds = true
        this.enableBody = true

        this.moveSpeed = speed
    }

    update(){
        // right movement
        if (cursors.right.isDown){
            if (this.x >= borderUISize + this.width){
                // move yumi right
                this.x -= 40
            }
        }

        // jump movement
        if (cursors.up.isDown && this.y >= borderUISize * 3 + borderPadding){
            this.y -= 20
        }
    }
}