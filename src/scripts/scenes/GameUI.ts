export default class GameUI extends Phaser.Scene {
  constructor() 
  {
    super({key:'game-ui'})
  }

  private fpsLabel
  private mousePos
  create()
  {
    this.fpsLabel = this.add.text(10, 10, 'fps',  { color: 'white', fontSize: '18px' })
    this.mousePos = this.add.text(10, 30, 'x: y:', { color: 'white', fontSize: '18px' })
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
    this.mousePos.setText(`x:${this.input.mousePointer.x} y:${this.input.mousePointer.y}`)
  }
}
