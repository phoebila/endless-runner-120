class Couch extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity){
        super(scene, w, Phaser.Math.Between(1, 10)/10, "couch")

        this.parentScene = scene

        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable(); 
        this.enableBody = true

        this.newCouch = true;
    }

    update() {
        // adding a new couch when halfway through scroll
        if (this.newCouch && this.x < centerX){
            // recursively call new creation of couch
            this.parentScene.addBarrier(this.parent, this.velocity);
            this.newCouch = false;
        }

        // if the couch goes out of bounds --> kill him
        if (this.x < -this.width){
            this.kill()
        }
    }

}