import { gameObject } from './tictactoe.js';

//	A function that creates an empty array so that we can create maps corresponding with the size of the board.
export const constructorArray = (boardSize) => new Array(boardSize).fill();

const getFormulas = (boardSize) => [
    //	row formula
    (patternIndex) =>
        constructorArray(boardSize).map(
            (empty, rowIndex) => patternIndex * boardSize + rowIndex
        ),
    //	column formula
    (patternIndex) =>
        constructorArray(boardSize).map(
            (empty, columnIndex) => columnIndex * boardSize + patternIndex
        ),
    //	backward diagonal formula
    (patternIndex) => patternIndex * boardSize + patternIndex,
    // forward diagonal formula
    (patternIndex) => patternIndex * boardSize + boardSize - patternIndex - 1,
];

const getPatternArray = (boardSize, formulaFunction) => {
    const patternArray = constructorArray(boardSize).map(
        (empty, patternIndex) => formulaFunction(patternIndex)
    );
    const checksum = patternArray.flat();
    if (checksum.length !== new Set(checksum).size) {
        throw 'Pattern returns duplicate positions ';
    }
    return (
        [patternArray]
            // Normalise the patternArray
            .flat(+Array.isArray(patternArray[0]))
    );
};

export const getEveryWinningMove = (boardSize) => {
    const formulaArray = getFormulas(boardSize);
    const winningOptionsArray = formulaArray.map((formulaFunction) =>
        // create an array of patterns based on the formula array above
        getPatternArray(boardSize, formulaFunction)
    );
    return winningOptionsArray.flat(1);
};

export function gameOver(
    mark,
    boardSize = gameObject.boardSize,
    boardStateArray = gameObject.boardStateArray
) {
    return getEveryWinningMove(boardSize).some(
        (pattern) =>
            // check if we have any moves left
            boardStateArray.every((markOnBoard) => !!markOnBoard) ||
            // compare every pattern on the current board
            pattern.every(
                (positionIndex) => boardStateArray[positionIndex] === mark
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
