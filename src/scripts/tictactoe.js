import { createBoard, placeOnBoard } from './board.js';
import opts from '../vars/const.js';
import handleEvent from './events.js';

export const gameObject = Object.create({
    ...opts,
    boardSize: undefined,
    NUMBEROFSQUARES: undefined,
    parent: undefined,
    elem: undefined,
    turn: 0,
    boardStateArray: undefined,
    matrix: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    winner: false,
    lock: false,
    handleEvent: handleEvent,
});

export default function tictactoe(parent = document.body, size = 3) {
    gameObject.elem = document.createElement('main');
    gameObject.parent = parent;
    gameObject.boardSize = size;
    gameObject.NUMBEROFSQUARES = Math.pow(size, 2);
    gameObject.boardStateArray = new Array(Math.pow(size, 2)).fill('');
    createBoard();
}
