
declare global
{
    namespace Phaser.GameObjects
    {
        interface Arc
        {
        }
    }
}

const REFRESH_RATE = 6
export default class Snake extends Phaser.GameObjects.Container {


  private cursors: Phaser.Types.Input.Keyboard.CursorKeys

  private snakeHead: Phaser.GameObjects.Arc
  private snakeLength: number
  private snakeBody : Phaser.GameObjects.Arc[]
  private frameCount: number
  private normalVelocityX: number
  private normalVelocityY: number

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y)
    this.cursors = scene.input.keyboard.createCursorKeys()

    this.snakeLength = 20

    this.snakeBody = []

    for(var i=this.snakeLength-1; i>=0; i--)
    {
      const oneBody = scene.add.circle(x, y, 15, 0x00cc00)
      oneBody.setStrokeStyle(2, 0x00ff00)
      scene.physics.add.existing(oneBody)
      this.snakeBody.push(oneBody)
    }
    this.snakeHead = scene.add.circle(x, y, 15, 0xdd0000)
    this.snakeHead.setStrokeStyle(3, 0xff0000)
    scene.physics.add.existing(this)
    const body = this.body as Phaser.Physics.Arcade.Body
    body.setSize(this.snakeHead.width, this.snakeHead.height)
    //body.setOffset(this.snakeHead.width*-0.5, this.snakeHead.height*-0.5)
    this.frameCount = 1

    body.setVelocity(100, 100)
    this.normalVelocityX = 100
    this.normalVelocityY = 100
  }

  update(t, dt)
  {

    const width = this.scene.scale.width
    const height = this.scene.scale.height
    const body = this.body as Phaser.Physics.Arcade.Body
    const pointer = this.scene.input.mousePointer
    const vec = new Phaser.Math.Vector2(pointer.x - width / 2, pointer.y - height / 2)

    const angle = vec.angle()
    var velocity = 100
    if (pointer.isDown)
    {
      velocity = 200
    }

    body.setVelocity(velocity*Math.cos(angle),  velocity*Math.sin(angle))
    

    if (this.cursors.right?.isDown)
    {
      body.setVelocity(velocity, 0)
    }
    else if (this.cursors.down?.isDown)
    {
      body.setVelocity(0, velocity)
    }
    else if (this.cursors.up?.isDown)
    {
      body.setVelocity(0, -velocity)
    }
    else if (this.cursors.left?.isDown)
    {
      body.setVelocity(-velocity, 0)
    }
    else if (this.cursors.space?.isDown)
    {
      body.setVelocity(0,0)
    }

    this.snakeHead.setPosition(body.position.x, body.position.y)

    for(var i=this.snakeBody.length-1; i>=0; i--)
    {
      const bodyPart = this.snakeBody[i] as Phaser.GameObjects.Arc
      const bodyBody = bodyPart.body as Phaser.Physics.Arcade.Body
      if (i == 0)
      {
        const vec = new Phaser.Math.Vector2(this.snakeHead.x - bodyPart.x, this.snakeHead.y - bodyPart.y)
        const theta = vec.angle()
        bodyBody.setVelocity(velocity * Math.cos(theta), velocity * Math.sin(theta))
        
      }
      else
      {
        const prevBody = this.snakeBody[i-1] as Phaser.GameObjects.Arc
        const vec = new Phaser.Math.Vector2(prevBody.x - bodyPart.x, prevBody.y - bodyPart.y)
        const theta = vec.angle()
        bodyBody.setVelocity(velocity * Math.cos(theta), velocity * Math.sin(theta))
      }
    }
  }
}
