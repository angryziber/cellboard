const {floor} = Math

export default class Board {
  constructor(board, cellSize = 18) {
    this.board = board
    this.cellSize = cellSize
    this.cols = floor(window.innerWidth / this.cellSize)
    this.rows = floor(window.innerHeight / this.cellSize - 1)
    this.generateCells(this.cols, this.rows)
  }

  generateCells(cols, rows) {
    this.cells = []
    let row
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (!this.cells[y]) {
          this.cells[y] = []
          row = this.createElement(this.board, 'row')
        }
        this.cells[y][x] = this.createElement(row, 'cell')
      }
    }
    this.score = this.createElement(this.board, 'score')
  }

  createElement(parent, cls) {
    const el = document.createElement('div')
    el.classList.add(cls)
    parent.appendChild(el)
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

  showScore(score) {
    this.score.innerText = score
  }
}
