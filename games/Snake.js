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
      case 'Space': return this.timer ? this.stop() : this.start()
      case 'Period': return this.speed -= 10
      case 'Comma': return this.speed += 10
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
    const head = this.newHead()
    this.body.unshift(head)
    const a = this.appleAt(head)
    if (a >= 0) this.eat(a)
    else this.body.pop()
    this.draw()
  }

  newHead() {
    const h = {...this.body[0]}
    h.x += this.dir.x
    if (h.x > this.board.cols) h.x = 0
    if (h.x < 0) h.x = this.board.cols
    h.y += this.dir.y
    if (h.y > this.board.rows) h.y = 0
    if (h.y < 0) h.y = this.board.rows
    return h
  }

  appleAt(p) {
    return this.apples.findIndex(a => a.x === p.x && a.y === p.y)
  }

  eat(i) {
    this.apples.splice(i, 1)
  }

  draw() {
    this.body.forEach(h => this.board.set(h, 'filled'))
    this.apples.forEach(a => this.board.set(a, 'apple'))
  }
}
