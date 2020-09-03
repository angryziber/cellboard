export default class Game {
  constructor(board) {
    this.board = board
  }

  step() {}

  start(speed = 300) {
    this.timer = setInterval(() => {
      this.board.clear()
      this.step()
    }, speed)
  }

  stop() {
    clearInterval(this.timer)
  }
}