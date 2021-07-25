import { default as findMatchingMarks, other } from './findMatchingMarks.js';
import { gameOver } from './state.js';

function calculateNextMove(matrix, mark, c) {
    const [flag, block] = findMatchingMarks.call(this, ...arguments, this.SIDE);
    return (
        flag === c &&
        block.reduce((w, v) => (matrix[v.x][v.y] === '' ? v : w), false)
    );
}

export function nextMove() {
    let center = this.positions[4];
    let even = [0, 2, 6, 8];
    let odd = [1, 3, 5, 7];

    let newPos = -1;
    const mark = this.matrix[this.currentAxes.x][this.currentAxes.y];
    const winningMove = calculateNextMove.call(
        this,
        this.matrix,
        other.call(this, mark),
        2
    );
    const nextCoord =
        winningMove || calculateNextMove.call(this, this.matrix, mark, 2); // Blocking move;

    if (this.positions.reduce((c, v, i) => (v === mark ? c + i : c)) > 10) {
        even.reverse();
        odd.reverse();
    }
    if (nextCoord) {
        newPos = this.SIDE * nextCoord.x + nextCoord.y;
    } else if (center === '') {
        newPos = 4;
    } else {
        [...even, ...odd].some((i) => {
            if (!this.positions[i]) {
                newPos = i;
                return true;
            }
        });
    }
    return newPos;
}
