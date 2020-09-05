import Game from './Game.js'
import {v} from '../Vector.js'

export default class Snake extends Game {
  body = this.randomPositions(1)
  dir = v(1, 0)

  keys = addEventListener('keydown', e => {
    switch (e.code) {
      case 'ArrowLeft': return this.dir = v(-1, 0)
      case 'ArrowRight': return this.dir = v(1, 0)
      case 'ArrowUp': return this.dir = v(0, -1)
      case 'ArrowDown': return this.dir = v(0, 1)
    }
  })

  apples = this.randomPositions(30)

  moveApples() {
    this.apples.forEach(a => {
      const rx = Math.random()
      const ry = Math.random()
      this.move(a, v(rx > 0.9 ? 1 : rx < 0.1 ? -1 : 0, ry > 0.9 ? 1 : ry < 0.1 ? -1 : 0))
    })
  }

  step() {
    const head = this.newHead()
    this.body.unshift(head)
    const a = this.appleAt(head)
    if (a >= 0) this.eat(a)
    else this.body.pop()
    this.draw()
  }

  newHead() {
    return this.move(this.body[0].clone(), this.dir)
  }

  move(p, by) {
    return this.wrapBounds(p.add(by))
  }

  appleAt(p) {
    return this.apples.findIndex(a => a.x === p.x && a.y === p.y)
  }

  eat(i) {
    this.apples.splice(i, 1)
    this.score += 10
  }

  draw() {
    this.body.forEach(h => this.board.set(h, 'filled'))
    this.apples.forEach(a => this.board.set(a, 'apple'))
    this.moveApples()
  }
}
