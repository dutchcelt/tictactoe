//	Creating an empty array so that we can create maps corresponding with the size of the board.
export const constructorArray = (boardSize) => new Array(boardSize).fill();

const getFormulas = (boardSize, boardStateArray) => [
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

export const getGameChecks = (boardSize, boardStateArray) => {
    const formulaArray = getFormulas(boardSize, boardStateArray);
    const gameArray = [];
    formulaArray.forEach((formulaFunction) => {
        // create an array of patterns based on the formula array above
        gameArray.push(getPatternArray(boardSize, formulaFunction));
    });
    return gameArray.flat(1);
};

export function gameOver(mark, boardSize, boardStateArray) {
    return getGameChecks(boardSize, boardStateArray).some(
        (pattern) =>
            // check if we have any moves left
            boardStateArray.every((mark) => mark) ||
            // compare every pattern on the current board
            pattern.every(
                (positionIndex) => boardStateArray[positionIndex] === mark
            )
    );
}
export function checkForWinner(mark) {
    // wrapping an asynchronous (setTimeout) function with a promise
    return new Promise((resolve) => {
        if (gameOver(mark, this.boardSize, this.boardStateArray)) {
            this.winner = this.turn === this.NUMBEROFSQUARES ? this.TIE : mark;
        }
        if (this.winner) {
            this.lock = true;
            setTimeout(() => {
                this.elem.dataset[this.REFERENCE] = this.winner;
                this.lock = false;
                resolve();
            }, 1000);
        } else {
            resolve();
        }
    });
}
