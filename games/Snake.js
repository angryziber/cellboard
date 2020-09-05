import Game from '../core/Game.js'
import {v} from '../core/Vector.js'
const {random} = Math

export default class Snake extends Game {
  help = 'Use arrow keys to control the snake'
  snake = this.randomPositions(1)
  direction = v(1, 0)
  apples = this.randomPositions(30)

  keys = addEventListener('keydown', e => {
    switch (e.code) {
      case 'ArrowLeft': return this.direction = v(-1, 0)
      case 'ArrowRight': return this.direction = v(1, 0)
      case 'ArrowUp': return this.direction = v(0, -1)
      case 'ArrowDown': return this.direction = v(0, 1)
    }
  })

  gameTurn() {
    this.moveApples()
    this.moveSnake()
    this.drawSnake()
    this.drawApples()
  }

  moveSnake() {
    const head = this.newHead()
    this.snake.unshift(head)
    const a = this.appleIndexAt(head)
    if (a >= 0) this.eatApple(a)
    else this.snake.pop()
  }

  newHead() {
    return this.move(this.snake[0].clone(), this.direction)
  }

  move(p, by) {
    return this.board.wrapBounds(p.add(by))
  }

  appleIndexAt(p) {
    return this.apples.findIndex(a => a.equals(p))
  }

  eatApple(i) {
    this.apples.splice(i, 1)
    this.addScore(10)
  }

  moveApples() {
    this.apples.forEach(a => {
      const rx = random(), ry = random()
      this.move(a, v(rx > 0.9 ? 1 : rx < 0.1 ? -1 : 0, ry > 0.9 ? 1 : ry < 0.1 ? -1 : 0))
    })
  }

  drawSnake() {
    this.snake.forEach(h => this.board.set(h, 'snake'))
  }

  drawApples() {
    this.apples.forEach(a => this.board.set(a, 'apple'))
  }
}
