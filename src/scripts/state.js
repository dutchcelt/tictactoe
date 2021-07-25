import findMatchingMarks from './findMatchingMarks.js';

export function gameOver(matrix, mark) {
    const [flag] = findMatchingMarks.call(this, ...arguments, this.SIDE);

    return flag === this.SIDE;
}

export function checkForWinner(mark) {
    if (gameOver.call(this, this.matrix, mark)) {
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
