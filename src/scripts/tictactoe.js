import { createBoard, placeOnBoard } from './board.js';
import settings from '../vars/const.js';
import handleEvent from './events.js';
import getEveryWinningMove from './moves.js';

function init(parent, size) {
    this.boardSize = size;
    this.parent = parent;
    this.elem = document.createElement('main');
    this.turn = 0;
    this.boardStateArray = new Array(Math.pow(size, 2)).fill('');
    this.winner = false;
    this.lock = false;
    this.handleEvent = handleEvent;
    this.winningMoves = getEveryWinningMove(size);
}

export const gameObject = Object.create(settings);

export default function tictactoe(parent = document.body, size = 3) {
    init.call(gameObject, parent, size);
    createBoard();
}
