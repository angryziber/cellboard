import Game from '../core/Game.js'
import {v} from '../core/Vector.js'

export default class GameOfLife extends Game {
  live = this.randomPositions(100)

  mouse = addEventListener('click', e => {
    if (!e.target.pos) return
    this.live.push(e.target.pos)
  })

  gameTurn() {
    for (let y = 0; y < this.board.rows; y++) {
      for (let x = 0; x < this.board.cols; x++) {
        const c = v(x, y)
        const a = this.liveIndex(c)
        const n = this.numNeighbors(c)
        if (a >= 0 && (n < 2 || n > 3)) this.live.splice(a, 1)
        if (a < 0 && n === 3) this.live.push(c)
      }
    }

    this.drawLiveCells()
  }

  liveIndex(c) {
    c = this.board.wrapBounds(c)
    return this.live.findIndex(p => p.equals(c))
  }
  
  numNeighbors(c) {
    const n = (x, y) => this.liveIndex(v(x, y)) >= 0 ? 1 : 0
    return n(c.x - 1, c.y - 1) + n(c.x, c.y - 1) + n(c.x + 1, c.y - 1) +
           n(c.x - 1, c.y) + n(c.x + 1, c.y) +
           n(c.x - 1, c.y + 1) + n(c.x, c.y + 1) + n(c.x + 1, c.y + 1)
  }

  drawLiveCells() {
    this.live.forEach(c => this.board.set(c, 'filled'))
  }
}