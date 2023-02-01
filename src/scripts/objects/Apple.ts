const colors = ["blue", "green", "red", "white", "yellow"]
export default class Apple extends Phaser.Physics.Arcade.Image
{
    constructor(scene: Phaser.Scene, x: number, y:number)
    {
        super(scene, x, y, 'apple')
        this.setPosition(x, y)
        this.setTexture(colors[Phaser.Math.Between(0, 4)])
        this.setBlendMode(Phaser.BlendModes.COLOR_BURN)
        scene.physics.add.existing(this)
        this.scene.add.existing(this)
    }
}