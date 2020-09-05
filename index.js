import Board from './Board.js'
import Snake from './games/Snake.js'

const board = new Board(document.getElementById('board'))
new Snake(board).start()
