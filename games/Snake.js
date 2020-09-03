import Game from './Game.js'

export default class Snake extends Game {
  body = [{x: 10, y: 10}, {x: 9, y: 10}, {x: 8, y: 10}]
  dir = {x: 1, y: 0}

  keys = addEventListener('keydown', e => {
    switch (e.code) {
      case 'ArrowLeft': return this.left()
      case 'ArrowRight': return this.right()
      case 'ArrowUp': return this.up()
      case 'ArrowDown': return this.down()
    }
  })

  left() {
    this.dir = {x: -1, y: 0}
  }

  right() {
    this.dir = {x: 1, y: 0}
  }

  up() {
    this.dir = {x: 0, y: -1}
  }

  down() {
    this.dir = {x: 0, y: 1}
  }

  step() {
    const h = {...this.body[0]}
    h.x += this.dir.x
    h.y += this.dir.y
    this.body.unshift(h)
    this.body.pop()
    this.draw()
  }

  draw() {
    this.body.forEach(h => this.board.set(h, 'filled'))
  }
}
