const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let gameState = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
let isZeroStep = false;
let isGameOver = false;

startGame();
addResetListener();

function startGame() {
    renderGrid(3);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);

    if (isGameOver){
        return;
    }

    const step = isZeroStep ? ZERO : CROSS;
    if (gameState[row][col] !== EMPTY) {
        return;
    }

    renderSymbolInCell(step, row, col);
    gameState[row][col] = step;
    isZeroStep = !isZeroStep;

    if (isTie()) {
        alert('Победила дружба');
        isGameOver = true;
        return;
    }

    if (isWin()) {
        alert(`Победили ${step}`);
        isGameOver = true;
    }
}

function isTie() {
    for (const row of gameState) {
        for (const cell of row) {
            if (cell === EMPTY) {
                return false;
            }
        }
    }

    return true;
}

function isWin() {
    return checkRows() || checkCols() || checkDiagonals();
}

function checkRows() {
    for (const row of gameState) {
        if (row.every(cell => cell === CROSS) || row.every(cell => cell === ZERO)) {
            return true;
        }
    }

    return false;
}

function checkCols() {
    for (let i = 0; i < gameState.length; i++) {
        if (gameState.every(row => row[i] === CROSS) || gameState.every(row => row[i] === ZERO)) {
            return true;
        }
    }

    return false;
}

function checkDiagonals() {
    const mainDiagonal = [];
    const sideDiagonal = [];

    for (let i = 0; i < gameState.length; i++) {
        mainDiagonal.push   (gameState[i][i]);
        sideDiagonal.push(gameState[i][gameState.length - 1 - i]);
    }

    return mainDiagonal.every(cell => cell === CROSS) || mainDiagonal.every(cell => cell === ZERO) ||
        sideDiagonal.every(cell => cell === CROSS) || sideDiagonal.every(cell => cell === ZERO);
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    console.log('reset!');
}


/* Test Function */

/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}
