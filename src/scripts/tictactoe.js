import { createBoard, placeOnBoard } from './board.js';
import opts from '../vars/const.js';
import handleEvent from './events.js';

const init = (parent) => ({
    ...opts,
    parent: parent || document.body,
    elem: document.createElement('main'),
    turn: 0,
    positions: new Array(opts.NUMBEROFSQUARES).fill(''),
    matrix: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    winner: false,
    lock: false,
    handleEvent: handleEvent,
});
export default function tictactoe(parent) {
    createBoard.call(Object.create(init(parent)));
}
