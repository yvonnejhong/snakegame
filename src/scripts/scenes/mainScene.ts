import Snake from '../objects/Snake'

export default class MainScene extends Phaser.Scene {
  private snake : Snake
  private background : Phaser.GameObjects.TileSprite
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.scene.run('game-ui')
    const width = this.scale.width*10
    const height = this.scale.height*10
    this.background = this.add.tileSprite(0,0, width, height, 'background').setOrigin(0)
    this.snake = new Snake(this, width/2, height/2)

    this.cameras.main.startFollow(this.snake, true)
    //this.cameras.main.centerOn(width/2, height/2)
  }

  update(t:number, dt:number) {
    this.background.setTilePosition(this.cameras.main.scrollX, this.cameras.main.scrollY);
    this.snake.update(t, dt)
  }
}
