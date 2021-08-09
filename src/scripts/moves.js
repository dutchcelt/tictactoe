//	A function that creates an empty array so that we can create maps corresponding with the size of the board.
const constructorArray = (boardSize) => new Array(boardSize).fill();

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
const getEveryWinningMove = (boardSize) => {
    const formulaArray = getFormulas(boardSize);
    const winningOptionsArray = formulaArray.map((formulaFunction) =>
        // create an array of patterns based on the formula array above
        getPatternArray(boardSize, formulaFunction)
    );
    return winningOptionsArray.flat(1);
};

export { getEveryWinningMove as default };
