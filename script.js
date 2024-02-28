document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const announce = (type) => {
        announcer.innerText = type;
        announcer.classList.remove('hide');
    };

    const isValidAction = (cell) => cell.innerText === '';

    const updateBoard = (index) => board[index] = currentPlayer;

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const handleResultValidation = () => {
        for (const condition of winningConditions) {
            const [a, b, c] = condition.map(i => board[i]);
            if (a && a === b && b === c) {
                announce(`Player ${currentPlayer} Won`);
                isGameActive = false;
                return;
            }
        }

        if (!board.includes('')) announce('Draw');
    };

    const userAction = (cell, index) => {
        if (!isGameActive || !isValidAction(cell)) return;
        cell.innerText = currentPlayer;
        cell.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    };

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');
        if (currentPlayer === 'O') changePlayer();
        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('playerX', 'playerO');
        });
    };

    cells.forEach((cell, index) => cell.addEventListener('click', () => userAction(cell, index)));
    resetButton.addEventListener('click', resetBoard);
});
