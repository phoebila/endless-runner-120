class Yumi extends Phaser.GameObjects.Sprite {
    moveable = true
    setCollideWorldBounds = true
    enableBody = true

    constructor(){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
    }

    update(){ //fix?
        if (cursors.right.isDown && this.moveable){
            if (this.x > game.config.width/3 +20){
                // move yumi right
                this.x -= game.settings.scrollSpeed/2
            }
        }
    }
}