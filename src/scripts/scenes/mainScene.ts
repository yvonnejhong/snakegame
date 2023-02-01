import { GameObjects } from 'phaser'
import Apple from '../objects/Apple'
import Snake from '../objects/Snake'

export default class MainScene extends Phaser.Scene {
  private snake : Snake
  private background : Phaser.GameObjects.TileSprite
  private appleGroup : Phaser.GameObjects.Group
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.scene.run('game-ui')
    const width = this.scale.width*10
    const height = this.scale.height*10
    this.background = this.add.tileSprite(0,0, width, height, 'background').setOrigin(0)
    
    this.appleGroup = this.physics.add.group(
      {
        classType: Apple
      }
    )

    const left = width/2 - 1500
    const right = width/2 + 1500
    const top = height/2 - 1400
    const bottom = height/2 + 1400
    for (let n=0; n<300; n++)
    {
      this.appleGroup.get(Phaser.Math.Between(left, right), Phaser.Math.Between(top, bottom))
    }



    this.snake = new Snake(this, width/2, height/2)
    this.physics.add.collider(this.snake, this.appleGroup, this.handleSnakeAppleCollision, undefined, this)


    this.cameras.main.startFollow(this.snake, true)
    //this.cameras.main.centerOn(width/2, height/2)
  }

  private handleSnakeAppleCollision(obj1: GameObjects.GameObject, obj2: GameObjects.GameObject)
  {
    console.log('here')
    const snake = obj1 as Snake
    this.appleGroup.killAndHide(obj2)
    snake.enlarge(1)
  }

  update(t:number, dt:number) {
    //this.background.setTilePosition(this.cameras.main.scrollX/22, this.cameras.main.scrollY/2);
    this.snake.update(t, dt)
  }
}
