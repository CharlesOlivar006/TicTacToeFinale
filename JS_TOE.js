const board = document.getElementById('board');
const squares = document.getElementsByClassName('square');
const players = ['X', 'O'];
let currentPlayer = players[0];
let playerScores = {
    'X': 0,
    'O': 0
};
const endMessage = document.createElement('h2');
endMessage.textContent = `X's turn!`;
endMessage.style.fontFamily = 'sans-serif';
endMessage.style.marginTop = '300px';
endMessage.style.textAlign = 'center';
endMessage.style.color = '#ffffff';
board.after(endMessage);

const winning_combinations = [
    // Horizontal combinations
    [0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29],

    // Vertical Combinations
    [0, 6, 12, 18, 24],
    [1, 7, 13, 19, 25],
    [2, 8, 14, 20, 26],
    [3, 9, 15, 21, 27],
    [4, 10, 16, 22, 28],
    [5, 11, 17, 23, 29],

    // Diagonal Combinations
    // Two
    [1, 6],
    [4, 11],
    [18, 25],
    [23, 28],
    // Three
    [2, 7, 12],
    [3, 10, 17],
    [12, 19, 26],
    [17, 22, 27],
    // Four
    [3, 8, 13, 18],
    [2, 9, 16, 23],
    [6, 13, 20, 27],
    [11, 16, 21, 26],
    // Five
    [0, 7, 14, 21, 28],
    [1, 8, 15, 22, 29],
    [4, 9, 14, 19, 24],
    [5, 10, 15, 20, 25],
];

function updateScores() {
    const printElement = document.getElementById('print');
    printElement.textContent = `X: ${playerScores['X']} | O: ${playerScores['O']}`;
    printElement.style.color = '#ffffff';
    printElement.style.marginTop = '20px';
    printElement.style.fontSize = '30px'; // Set the font size here
}

// Display initial scores at the start of the game
updateScores();

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => {
        if (squares[i].textContent !== '') {
            return;
        }
        squares[i].textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            playerScores[currentPlayer]++;
            updateScores();
            if (playerScores[currentPlayer] === 5) {
                endMessage.textContent = `${currentPlayer} wins the game with 5 points!`;
                setTimeout(resetGame, 3000);
            } else {
                endMessage.textContent = `Game over! ${currentPlayer} wins this round!`;
                setTimeout(resetBoard, 1000);
            }
            return;
        }
        if (checkTie()) {
            endMessage.textContent = `Game is tied!`;
            setTimeout(resetBoard, 1000);
            return;
        }
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
        endMessage.textContent = `${currentPlayer}'s turn!`;
    });
}

function checkWin(currentPlayer) {
    for (let i = 0; i < winning_combinations.length; i++) {
        const combination = winning_combinations[i];
        let hasWin = true;

        for (let j = 0; j < combination.length; j++) {
            const squareIndex = combination[j];
            if (squares[squareIndex].textContent !== currentPlayer) {
                hasWin = false;
                break;
            }
        }

        if (hasWin) {
            return true;
        }
    }

    return false;
}

function checkTie() {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent === '') {
            return false;
        }
    }
    return true;
}

function resetBoard() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = '';
    }
    currentPlayer = players[0];
    endMessage.textContent = `${currentPlayer}'s turn!`;
}

function resetGame() {
    playerScores = {
        'X': 0, 'O': 0
    };
    updateScores();
    resetBoard();
    endMessage.textContent = `GAME START! ${currentPlayer}'s turn!`;
}

function goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      document.getElementById('page1').style.display = 'block';
      document.getElementById('page2').style.display = 'none';
      document.getElementById('aiDifficultyPopup').style.display = 'none';
    }
  }

// Add the following event listener for the reset button
document.getElementById('but').addEventListener('click', resetGame);
