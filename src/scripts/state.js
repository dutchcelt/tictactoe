import { gameObject } from './tictactoe.js';

export function gameOver(mark) {
    return gameObject.winningMoves.some(
        (pattern) =>
            // check if we have any moves left
            gameObject.boardStateArray.every((markOnBoard) => !!markOnBoard) ||
            // compare every pattern on the current board
            pattern.every(
                (positionIndex) =>
                    gameObject.boardStateArray[positionIndex] === mark
            )
    );
}
export function checkForWinner(mark) {
    // wrapping an asynchronous (setTimeout) function with a promise
    return new Promise((resolve) => {
        if (gameOver(mark)) {
            gameObject.winner =
                gameObject.turn === gameObject.boardStateArray.length
                    ? gameObject.TIE
                    : mark;
        }
        if (gameObject.winner) {
            gameObject.lock = true;
            setTimeout(() => {
                gameObject.elem.dataset[gameObject.REFERENCE] =
                    gameObject.winner;
                gameObject.lock = false;
                resolve();
            }, 1000);
        } else {
            resolve();
        }
    });
}
