export default class Game {
  constructor(board, speed = 80) {
    this.board = board
    this.speed = speed
  }

  score = 0

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
      this.board.showScore(this.score)
      this.start()
    }, this.speed)
  }

  stop() {
    clearTimeout(this.timer)
    this.timer = undefined
  }

  randomPoints(n) {
    const apples = Array(n)
    for (let i = 0; i < n; i++)
      apples[i] = {x: Math.floor(Math.random() * this.board.cols), y: Math.floor(Math.random() * this.board.rows)}
    return apples
  }
}