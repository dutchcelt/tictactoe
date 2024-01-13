import { createBoard, placeOnBoard } from './board.js';
import settings from '../vars/const.js';
import handleEvent from './events.js';
import getEveryWinningMove from './moves.js';

export const init = (parent, size) => ({
	boardSize: size,
	parent: parent,
	elem: document.createElement('div'),
	turn: 0,
	boardStateArray: new Array(Math.pow(size, 2)).fill(''),
	winner: false,
	lock: false,
	handleEvent: handleEvent,
	winningMoves: getEveryWinningMove(size),
});

export const gameObject = Object.create(settings);

export default function tictactoe(parent = document.body, size = 3) {
	Object.assign(gameObject, init(parent, size));
	createBoard();
}
