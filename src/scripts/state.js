export function gameOver(mark) {
    const constructorArray = new Array(this.SIDE).fill();
    return [
        // rows
        (patternIndex) =>
            constructorArray.map(
                (empty, rowIndex) => patternIndex * this.SIDE + rowIndex
            ),
        // columns
        (patternIndex) =>
            constructorArray.map(
                (empty, columnIndex) => columnIndex * this.SIDE + patternIndex
            ),
        // backward diagonal
        (patternIndex) => patternIndex * this.SIDE + patternIndex,
        // forward diagonal
        (patternIndex) =>
            patternIndex * this.SIDE + this.SIDE - patternIndex - 1,
    ].some((patternFunction) => {
        const patternArray = constructorArray.map((empty, patternIndex) =>
            patternFunction(patternIndex)
        );
        return [patternArray]
            .flat(+Array.isArray(patternArray[0]))
            .some((pattern) =>
                pattern.every((x) => this.positions[x] === mark)
            );
    });
}

export function checkForWinner(mark) {
    if (gameOver.call(this, mark)) {
        this.winner = mark;
    } else if (this.turn === this.NUMBEROFSQUARES) {
        this.winner = this.TIE;
    }
    if (this.winner) {
        this.lock = true;
        setTimeout(() => {
            this.elem.dataset[this.REFERENCE] = this.winner;
            this.lock = false;
        }, 1000);
    }
}
