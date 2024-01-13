import test from 'ava';
import { gameObject, init, default as tictactoe } from './tictactoe.js';

import { JSDOM } from 'jsdom';
const { window } = new JSDOM('<trvt-tictactoe></trvt-tictactoe>');
global.document = window.document;

const newGame = (size) => tictactoe(document.body, size);

test('initializing the gameObject', (t) => {
	t.assert(gameObject.boardSize === undefined);
	Object.assign(gameObject, init(document.body, 4));
	t.assert(gameObject.boardSize === 4);
});

test('main object test', (t) => {
	newGame(3);
	t.assert(gameObject.turn === 0);
	t.assert(gameObject.boardSize === 3);
	t.assert(gameObject.boardStateArray.length === 9); // 3 x 3
	t.assert(gameObject.winner === false);
	t.assert(typeof gameObject.handleEvent === 'function');
	t.assert(gameObject.elem.tagName === 'DIV');
});
