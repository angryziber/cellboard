import Board from './core/Board.js'
import Snake from './games/Snake.js'
import GameOfLife from './games/GameOfLife.js'

const games = [Snake, GameOfLife]

const help = document.getElementById('help')
const board = new Board(document.getElementById('board'), document.getElementById('score'))

const gameSelect = document.getElementById('game')
games.forEach(game => {
  gameSelect.appendChild(document.createElement('option')).innerText = game.name
})

let currentGame
gameSelect.onchange = () => {
  location.hash = '#' + gameSelect.selectedIndex
  startGame(games[gameSelect.selectedIndex])
}

function startGame(game) {
  if (currentGame) currentGame.finish()
  currentGame = new game(board).start()
  help.innerText = currentGame.help
}

gameSelect.selectedIndex = parseInt(location.hash.substring(1)) || 0
startGame(games[gameSelect.selectedIndex])
