import { default as tictactoe } from './tictactoe.js';
import { placeOnBoard } from './board.js';
import { getEveryWinningMove, gameOver, constructorArray } from './state.js';

export function other(mark) {
    if (mark !== this.X && mark !== this.O) {
        throw `Invalid mark used. Should be an "${this.X}" or an "${this.O}"`;
    }
    return mark === this.X ? this.O : this.X;
}

const getWinningMove = (mark, boardSize, boardStateArray) => {
    let pos;
    getEveryWinningMove(boardSize, boardStateArray).some((pattern) => {
        const line = pattern.map((i) => boardStateArray[i]);
        if (
            line.filter((m) => m === mark).length === 2 &&
            line.indexOf('') >= 0
        ) {
            pos = pattern[line.indexOf('')];
            return true;
        }
    });
    return pos;
};

export function autoPlay() {
    const index = nextMove.call(this);
    if (index > -1 && !this.winner)
        placeOnBoard.call(this, 'O', this.elems[index]);
}

export function resetGame(elem, parent) {
    parent.removeChild(elem);
    tictactoe(parent);
}

export function nextMove() {
    const boardIndex = this.boardStateArray.map((m, i) => i);
    const centerPosition = Math.floor(boardIndex.length / 2);
    const centerMark = this.boardStateArray[centerPosition];
    const evenArray = boardIndex.filter(
        (i) => !!(i % 2 == 0) && i !== centerPosition
    );
    const oddArray = boardIndex.filter((i) => !(i % 2 == 0));

    const thisOther = other.bind(this);

    let newPos = -1;
    const mark = this.turn % 2 == 0 ? this.O : this.X;
    const winningMove = getWinningMove(
        thisOther(mark),
        this.boardSize,
        this.boardStateArray
    );
    const nextCoord =
        winningMove ||
        getWinningMove(mark, this.boardSize, this.boardStateArray); // Blocking move;

    if (nextCoord !== undefined) {
        newPos = nextCoord;
    } else if (!centerMark) {
        newPos = centerPosition;
    } else {
        [...evenArray, ...oddArray].some((i) => {
            if (!this.boardStateArray[i]) {
                newPos = i;
                return true;
            }
        });
        newPos = nextCoord || newPos;
    }
    return newPos;
}
