const {floor} = Math

export default class Board {
  constructor(target, cellSize = 18) {
    this.cols = floor(target.clientWidth / cellSize)
    this.rows = floor(target.clientHeight / cellSize - 1)
    this.generateCells(target, this.cols, this.rows)
    this.score = this.addElement(target, 'score')
  }

  generateCells(target, cols, rows) {
    this.cells = Array.from(Array(rows), (_, y) => {
      const row = this.addElement(target, 'row')
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

  wrapBounds(pos) {
    if (pos.x >= this.cols) pos.x = 0
    else if (pos.x < 0) pos.x = this.cols
    if (pos.y >= this.rows) pos.y = 0
    else if (pos.y < 0) pos.y = this.rows
    return pos
  }

  updateScore(score) {
    this.score.innerText = score
  }
}
