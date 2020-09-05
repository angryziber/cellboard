import {v} from './Vector.js'
const {random, floor} = Math

/**
 * Base abstract class that games can inherit.
 * Method step() is called on every turn
 */
export default class Game {
  score = 0

  constructor(board, speed = 100) {
    this.board = board
    this.board.updateScore(this.score)
    this.speed = speed
  }

  commonKeys = addEventListener('keydown', e => {
    switch (e.code) {
      case 'Space': return this.timer ? this.stop() : this.start()
      case 'Period': return this.speed -= 10
      case 'Comma': return this.speed += 10
    }
  })

  gameTurn() {}

  start() {
    this.timer = setTimeout(() => {
      this.board.clear()
      this.gameTurn()
      this.start()
    }, this.speed)
  }

  stop() {
    clearTimeout(this.timer)
    this.timer = undefined
  }

  randomPositions(n) {
    return Array.from(Array(n), () => v(floor(random() * this.board.cols), floor(random() * this.board.rows)))
  }

  addScore(inc) {
    this.score += inc
    this.board.updateScore(this.score)
  }
}