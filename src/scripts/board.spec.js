import test from 'ava';

import { gameObject, init, default as tictactoe } from './tictactoe.js';
import { createBoard, placeOnBoard } from './board.js';

import { JSDOM } from 'jsdom';
const { window } = new JSDOM('<trvt-tictactoe></trvt-tictactoe>');
global.document = window.document;

const newGame = (size) => tictactoe(document.body, size);

test('create board', (t) => {
	Object.assign(gameObject, init(document.body, 7));
	createBoard();
	t.assert(gameObject.elem.className === gameObject.REFERENCE);
	t.assert(gameObject.elem.children.length === gameObject.boardStateArray.length);
});

test('placeOnBoard', (t) => {
	newGame(3);
	placeOnBoard(gameObject.X, gameObject.elems[1]);
	t.assert(gameObject.turn === 1);
	t.assert(gameObject.elems[1].dataset[gameObject.REFERENCE] === gameObject.X);
});
