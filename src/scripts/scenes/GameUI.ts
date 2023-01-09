export default class GameUI extends Phaser.Scene {
  constructor() 
  {
    super({key:'game-ui'})
  }

  private fpsLabel
  create()
  {
    this.fpsLabel = this.add.text(10, 10, 'fps',  { color: 'white', fontSize: '28px' })
        // display the Phaser.VERSION
    this.add
    .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
      color: '#FFFFFF',
      fontSize: '24px'
    })
    .setOrigin(1, 0)
  }

  public update() {
    
    this.fpsLabel.setText(`fps: ${Math.floor(this.game.loop.actualFps)}`)
  }
}
