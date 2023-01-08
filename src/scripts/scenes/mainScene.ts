import FpsText from '../objects/fpsText'
import Snake from '../objects/Snake'

export default class MainScene extends Phaser.Scene {
  private fpsText: FpsText
  private snake : Snake
  private background : Phaser.GameObjects.TileSprite
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    const width = this.scale.width
    const height = this.scale.height
    this.background = this.add.tileSprite(0,0, width, height, 'background').setOrigin(0)
    this.fpsText = new FpsText(this)
    this.snake = new Snake(this, width/2, height/2)

    this.cameras.main.startFollow(this.snake)
    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#FFFFFF',
        fontSize: '24px'
      })
      .setOrigin(1, 0)
  }

  update() {
    this.background.setTilePosition(this.cameras.main.scrollX, this.cameras.main.scrollY);
    this.fpsText.update()
    this.snake.preUpdate()
  }
}
