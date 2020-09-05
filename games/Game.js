import {v} from '../Vector.js'

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

  randomPositions(n) {
    return Array(n).fill(0).map(() =>
      (v(Math.floor(Math.random() * this.board.cols), Math.floor(Math.random() * this.board.rows))))
  }

  wrapBounds(p) {
    if (p.x > this.board.cols) p.x = 0
    if (p.x < 0) p.x = this.board.cols
    if (p.y > this.board.rows) p.y = 0
    if (p.y < 0) p.y = this.board.rows
    return p
  }
}