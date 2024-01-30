class Yumi extends Phaser.GameObjects.Sprite {
    moveable = true
    setCollideWorldBounds = true

    constructor(){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
    }

    update(){
        if (cursors.right.isDown && this.moveable){
            if (this.x > game.config.width/3 +20){
                // move yumi up
                this.x -= game.settings.scrollSpeed/2
            }
        }
    }
}