import Game from './Game.js'

export default class Snake extends Game {
  body = [{x: 10, y: 10}, {x: 9, y: 10}, {x: 8, y: 10}]
  dir = {x: 1, y: 0}

  keys = addEventListener('keydown', e => {
    switch (e.code) {
      case 'ArrowLeft': return this.dir = {x: -1, y: 0}
      case 'ArrowRight': return this.dir = {x: 1, y: 0}
      case 'ArrowUp': return this.dir = {x: 0, y: -1}
      case 'ArrowDown': return this.dir = {x: 0, y: 1}
    }
  })

  apples = this.generateApples(30)

  generateApples(n) {
    const apples = Array(n)
    for (let i = 0; i < n; i++)
      apples[i] = {x: Math.floor(Math.random() * this.board.cols), y: Math.floor(Math.random() * this.board.rows)}
    return apples
  }

  step() {
    const h = this.moveHead()
    this.body.unshift(h)
    const a = this.apples.findIndex(a => a.x === h.x && a.y === h.y)
    if (a >= 0) this.apples.splice(a, 1)
    else this.body.pop()
    this.draw()
  }

  moveHead() {
    const h = {...this.body[0]}
    h.x += this.dir.x
    if (h.x >= this.board.cols) h.x = 0
    if (h.x < 0) h.x = this.board.cols
    h.y += this.dir.y
    if (h.y >= this.board.rows) h.y = 0
    if (h.y < 0) h.y = this.board.rows
    return h
  }

  draw() {
    this.body.forEach(h => this.board.set(h, 'filled'))
    this.apples.forEach(a => this.board.set(a, 'apple'))
  }
}
