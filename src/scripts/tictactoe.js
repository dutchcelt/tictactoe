import { createBoard, placeOnBoard } from './board.js';
import opts from '../vars/const.js';
import handleEvent from './events.js';

function init(parent, size) {
    this.boardSize = size;
    this.NUMBEROFSQUARES = Math.pow(size, 2);
    this.parent = parent;
    this.elem = document.createElement('main');
    this.turn = 0;
    this.boardStateArray = new Array(Math.pow(size, 2)).fill('');
    this.winner = false;
    this.lock = false;
    this.handleEvent = handleEvent;
}

export const gameObject = Object.create(opts);

export default function tictactoe(parent = document.body, size = 3) {
    init.call(gameObject, parent, size);
    createBoard();
}
