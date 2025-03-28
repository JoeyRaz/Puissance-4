const board = document.getElementById('game-board');
const turnDisplay = document.getElementById('turn');
const resetButton = document.getElementById('reset');

let grid = [];
let currentPlayer = 1;
let gameOver = false;

function createBoard() {
    for (let row = 0; row < 6; row++) {
        grid[row] = [];
        for (let col = 0; col < 7; col++) {
            grid[row][col] = 0;
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => play(col));
            board.appendChild(cell);
        }
    }
}

function play(col) {
    if (gameOver) return;
    for (let row = 5; row >= 0; row--) {
        if (grid[row][col] === 0) {
            grid[row][col] = currentPlayer;
            const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
            cell.classList.add(currentPlayer === 1 ? 'red' : 'yellow');
            if (checkWin(row, col)) {
                gameOver = true;
                turnDisplay.textContent = `Joueur ${currentPlayer} a gagné!`;
                return;
            }
            if (checkDraw()) {
                gameOver = true;
                turnDisplay.textContent = 'Match nul!';
                return;
            }
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            turnDisplay.textContent = `Tour du joueur ${currentPlayer}`;
            return;
        }
    }
}

function checkWin(row, col) {
    const directions = [
        [0, 1], [1, 0], [1, 1], [1, -1]
    ];
    for (let [dx, dy] of directions) {
        let count = 1;
        for (let i = 1; i < 4; i++) {
            const newRow = row + dx * i;
            const newCol = col + dy * i;
            if (newRow >= 0 && newRow < 6 && newCol >= 0 && newCol < 7 && grid[newRow][newCol] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }
        for (let i = 1; i < 4; i++) {
            const newRow = row - dx * i;
            const newCol = col - dy * i;
            if (newRow >= 0 && newRow < 6 && newCol >= 0 && newCol < 7 && grid[newRow][newCol] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }
        if (count >= 4) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            if (grid[row][col] === 0) {
                return false;
            }
        }
    }
    return true;
}

function resetGame() {
    grid = [];
    currentPlayer = 1;
    gameOver = false;
    board.innerHTML = '';
    turnDisplay.textContent = `Tour du joueur ${currentPlayer}`;
    createBoard();
}

resetButton.addEventListener('click', resetGame);

createBoard();
turnDisplay.textContent = `Tour du joueur ${currentPlayer}`;