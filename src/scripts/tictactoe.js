import { createBoard, placeOnBoard } from './board.js';
import opts from '../vars/const.js';
import handleEvent from './events.js';

export const init = (parent = document.body, size) =>
    Object.create({
        ...opts,
        boardSize: size,
        NUMBEROFSQUARES: Math.pow(size, 2),
        parent: parent,
        elem: document.createElement('main'),
        turn: 0,
        boardStateArray: new Array(Math.pow(size, 2)).fill(''),
        matrix: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        winner: false,
        lock: false,
        handleEvent: handleEvent,
    });

export default function tictactoe(parent, size = 3) {
    createBoard.call(init(parent, size));
}
