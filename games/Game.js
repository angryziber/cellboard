export default class Game {
  constructor(board, speed = 80) {
    this.board = board
    this.speed = speed
  }

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
  }
}