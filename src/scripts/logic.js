import { default as tictactoe, gameObject } from './tictactoe.js';
import { placeOnBoard } from './board.js';
import { gameOver } from './state.js';

export function other(mark) {
    if (mark !== gameObject.X && mark !== gameObject.O) {
        throw `Invalid mark used. Should be an "${gameObject.X}" or an "${gameObject.O}"`;
    }
    return mark === gameObject.X ? gameObject.O : gameObject.X;
}

const getWinningMoveFor = (mark) => {
    let pos;
    gameObject.winningMoves.some((pattern) => {
        const line = pattern.map((i) => gameObject.boardStateArray[i]);
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
    const index = nextMove();
    if (index > -1 && !gameObject.winner)
        placeOnBoard.call(gameObject, 'O', gameObject.elems[index]);
}

export function resetGame(elem, parent) {
    parent.removeChild(elem);
    tictactoe(parent);
}

export function nextMove() {
    const boardIndex = gameObject.boardStateArray.map((m, i) => i);
    const centerPosition = Math.floor(boardIndex.length / 2);
    const centerMark = gameObject.boardStateArray[centerPosition];
    const evenArray = boardIndex.filter(
        (i) => !!(i % 2 == 0) && i !== centerPosition
    );
    const oddArray = boardIndex.filter((i) => !(i % 2 == 0));

    let newPos = -1;
    const mark = gameObject.turn % 2 == 0 ? gameObject.O : gameObject.X;
    const winningMove = getWinningMoveFor(other(mark));
    const nextCoord = winningMove || getWinningMoveFor(mark); // Blocking move;

    if (nextCoord !== undefined) {
        newPos = nextCoord;
    } else if (!centerMark) {
        newPos = centerPosition;
    } else {
        [...evenArray, ...oddArray].some((i) => {
            if (!gameObject.boardStateArray[i]) {
                newPos = i;
                return true;
            }
        });
        newPos = nextCoord || newPos;
    }
    return newPos;
}
