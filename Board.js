const {floor} = Math

export default class Board {
  constructor(board, cellSize = 18) {
    this.board = board
    this.cellSize = cellSize
    this.cols = floor(window.innerWidth / this.cellSize)
    this.rows = floor(window.innerHeight / this.cellSize - 1)
    this.generateCells(this.cols, this.rows)
    this.score = this.addElement(this.board, 'score')
  }

  generateCells(cols, rows) {
    this.cells = Array.from(Array(rows), (_, y) => {
      const row = this.addElement(this.board, 'row')
      return Array.from(Array(cols), (_, x) => this.addElement(row, 'cell'))
    })
  }

  addElement(parent, cls) {
    const el = parent.appendChild(document.createElement('div'))
    el.classList.add(cls)
    return el
  }

  clear() {
    this.cells.forEach(row => row.forEach(cell => {
      if (cell.classList.length > 1) cell.classList.value = 'cell'
    }))
  }

  set(pos, cls) {
    this.cells[pos.y]?.[pos.x]?.classList.add(cls)
  }

  updateScore(score) {
    this.score.innerText = score
  }
}
