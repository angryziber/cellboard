import Game from '../core/Game.js'
import {v} from '../core/Vector.js'

export default class GameOfLife extends Game {
  alive = this.randomPositions(100)
  drawing = false

  mouse = [
    addEventListener('mousedown', e => {
      if (!e.target.pos) return
      this.drawing = true
      this.drawNewCell(e.target.pos)
      this.stop()
    }),
    addEventListener('mousemove', e => {
      if (!this.drawing || !e.target.pos) return
      this.drawNewCell(e.target.pos)
    }),
    addEventListener('mouseup', e => {
      if (!this.drawing) return
      this.drawing = false
      this.start()
    })
  ]

  drawNewCell(c) {
    this.alive.push(c)
    this.drawAliveCells()
  }

  gameTurn() {
    const next = []
    for (let y = 0; y < this.board.rows; y++) {
      for (let x = 0; x < this.board.cols; x++) {
        const c = v(x, y)
        const a = this.isAlive(c)
        const n = this.numNeighbors(c)
        if (a && (n === 2 || n === 3) || !a && n === 3) next.push(c)
      }
    }
    this.alive = next
    this.drawAliveCells()
  }

  isAlive(c) {
    c = this.board.wrapBounds(c)
    return this.alive.find(p => p.equals(c))
  }
  
  numNeighbors(c) {
    const n = (x, y) => this.isAlive(v(x, y)) ? 1 : 0
    return n(c.x - 1, c.y - 1) + n(c.x, c.y - 1) + n(c.x + 1, c.y - 1) +
           n(c.x - 1, c.y) + n(c.x + 1, c.y) +
           n(c.x - 1, c.y + 1) + n(c.x, c.y + 1) + n(c.x + 1, c.y + 1)
  }

  drawAliveCells() {
    this.alive.forEach(c => this.board.set(c, 'filled'))
  }
}