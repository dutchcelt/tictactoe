export function gameOver(mark, boardSize, boardStateArray) {
    //	Creating an empty array so that we can create maps for each possible winning pattern.
    const constructorArray = new Array(boardSize).fill();
    return [
        //	rows
        (patternIndex) =>
            constructorArray.map(
                (empty, rowIndex) => patternIndex * boardSize + rowIndex
            ),
        //	columns
        (patternIndex) =>
            constructorArray.map(
                (empty, columnIndex) => columnIndex * boardSize + patternIndex
            ),
        //	backward diagonal
        (patternIndex) => patternIndex * boardSize + patternIndex,
        // forward diagonal
        (patternIndex) =>
            patternIndex * boardSize + boardSize - patternIndex - 1,
    ].some((patternFunction) => {
        const patternArray = constructorArray.map((empty, patternIndex) =>
            patternFunction(patternIndex)
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
                        boardStateArray.every((mark) => mark) ||
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
