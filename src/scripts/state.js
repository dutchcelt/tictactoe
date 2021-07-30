export function gameOver(mark, boardSize, boardStateArray) {
    //	Creating an empty array so that we can create maps for each possible winning pattern.
    const constructorArray = new Array(boardSize).fill();
    return [
        //	row formula
        (patternIndex) =>
            constructorArray.map(
                (empty, rowIndex) => patternIndex * boardSize + rowIndex
            ),
        //	column formula
        (patternIndex) =>
            constructorArray.map(
                (empty, columnIndex) => columnIndex * boardSize + patternIndex
            ),
        //	backward diagonal formula
        (patternIndex) => patternIndex * boardSize + patternIndex,
        // forward diagonal formula
        (patternIndex) =>
            patternIndex * boardSize + boardSize - patternIndex - 1,
    ].some((formulaFunction) => {
        // create an array of patterns based on the formulas above
        const patternArray = constructorArray.map((empty, patternIndex) =>
            formulaFunction(patternIndex)
        );
        const checksum = patternArray.flat();
        if (checksum.length !== new Set(checksum).size) {
            throw 'Pattern returns duplicate positions ';
        }
        return (
            [patternArray]
                // Normalise the patternArray
                .flat(+Array.isArray(patternArray[0]))
                .some(
                    (pattern) =>
                        // check if we have any moves left
                        boardStateArray.every((mark) => mark) ||
                        // compare every pattern on the current board
                        pattern.every(
                            (positionIndex) =>
                                boardStateArray[positionIndex] === mark
                        )
                )
        );
    });
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
