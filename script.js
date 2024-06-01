const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.querySelector('.restart-btn');
const message = document.querySelector('.message');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = [...cell.parentNode.children].indexOf(cell);

  if (gameBoard[cellIndex] !== '' || !gameActive) return;

  placeMark(cell, cellIndex);
  if (checkWin()) {
    gameActive = false;
    announceWinner();
    return;
  }
    if (checkDraw()) {
    gameActive = false;
    message.textContent = "It's a draw!";
    return;
  }

  switchPlayer();
}

function placeMark(cell, cellIndex) {
  cell.textContent = currentPlayer;
  gameBoard[cellIndex] = currentPlayer;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  return winningCombos.some(combo => {
    return combo.every(index => {
      return gameBoard[index] === currentPlayer;
    });
  });
}

function checkDraw() {
  return gameBoard.every(cell => {
    return cell !== '';
  });
}

function restart() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
  });
  message.textContent = '';
}

function announceWinner() {
  message.textContent = `Player ${currentPlayer} wins!`;
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restart); // Added this line to listen for restart button clicks
