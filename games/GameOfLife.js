import Game from '../core/Game.js'
import {v} from '../core/Vector.js'

export default class GameOfLife extends Game {
  alive = this.randomPositions(100)

  mouse = addEventListener('click', e => {
    if (!e.target.pos) return
    this.alive.push(e.target.pos)
  })

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
    (this.alive = next).forEach(c => this.board.set(c, 'filled'))
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
}