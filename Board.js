export default class Board {
  constructor(board, size = 18) {
    this.board = board
    this.size = size
  }

  generateCells(cols = innerWidth / this.size, rows = innerHeight / this.size - 1) {
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
    return this
  }

  createElement(parent, cls) {
    const cell = document.createElement('div')
    cell.classList.add(cls)
    parent.appendChild(cell)
    return cell
  }

  clear() {
    this.cells.forEach(row => row.forEach(cell => cell.setAttribute('class', 'cell')))
  }

  set(pos, cls) {
    this.cells[pos.y][pos.x].classList.add(cls)
  }
}
