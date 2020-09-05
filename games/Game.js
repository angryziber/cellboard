export default class Game {
  constructor(board, speed = 80) {
    this.board = board
    this.speed = speed
  }

  commonKeys = addEventListener('keydown', e => {
    switch (e.code) {
      case 'Space': return this.timer ? this.stop() : this.start()
      case 'Period': return this.speed -= 10
      case 'Comma': return this.speed += 10
    }
  })

  step() {}

  start() {
    this.timer = setTimeout(() => {
      this.board.clear()
      this.step()
      this.start()
    }, this.speed)
  }

  stop() {
    clearTimeout(this.timer)
    this.timer = undefined
  }
}