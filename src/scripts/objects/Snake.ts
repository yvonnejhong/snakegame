export default class Snake extends Phaser.GameObjects.Container {

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys

  constructor(scene: Phaser.Scene, x: number | undefined, y: number | undefined) {
    super(scene, x, y)
    this.cursors = scene.input.keyboard.createCursorKeys()

    scene.add.circle(x, y, 15, 0xff0000)

    scene.physics.add.existing(this)
  }

  preUpdate()
  {
    const body = this.body as Phaser.Physics.Arcade.Body

    if (this.cursors.right?.isDown)
    {
      body.setVelocity(100, 0)
    }
    else if (this.cursors.down?.isDown)
    {
      body.setVelocity(0, 100)
    }
    else if (this.cursors.up?.isDown)
    {
      body.setVelocity(0, -100)
    }
    else if (this.cursors.left?.isDown)
    {
      body.setVelocity(-100, 0)
    }

  }
}
