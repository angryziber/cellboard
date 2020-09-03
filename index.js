import Board from './Board.js'
import Snake from './games/Snake.js'

const board = new Board(document.getElementById('board')).generateCells()
new Snake(board).start(100)
