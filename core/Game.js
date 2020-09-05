import {v} from './Vector.js'
const {random, floor} = Math

/**
 * Base abstract class that games can inherit.
 * Method step() is called on every turn
 */
export default class Game {
  score = 0
  eventHandlers = []

  constructor(board, speed = 100) {
    this.board = board
    this.board.updateScore(this.score)
    this.speed = speed
  }

  commonKeys = this.on('keydown', e => {
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
    return this
  }

  stop() {
    clearTimeout(this.timer)
    this.timer = undefined
  }

  on(type, handler) {
    window.addEventListener(type, handler)
    this.eventHandlers.push({type, handler})
  }

  finish() {
    this.stop()
    this.eventHandlers.forEach(e => window.removeEventListener(e.type, e.handler))
  }

  randomPositions(n) {
    return Array.from(Array(n), () => v(floor(random() * this.board.cols), floor(random() * this.board.rows)))
  }

  addScore(inc) {
    this.score += inc
    this.board.updateScore(this.score)
  }
}