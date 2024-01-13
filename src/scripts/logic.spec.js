import test from 'ava';
import { gameObject, default as tictactoe } from './tictactoe.js';
import { other, nextMove, resetGame, autoPlay } from './logic.js';
import { placeOnBoard } from './board.js';

import { JSDOM } from 'jsdom';
const { window } = new JSDOM('<trvt-tictactoe></trvt-tictactoe>');
global.document = window.document;

const newGame = (size) => tictactoe(document.body, size);
const elemHasMark = (pos, mark) => gameObject.elems[pos].dataset[gameObject.REFERENCE] === mark;
const wait = (time) => new Promise((r) => setTimeout(() => r(), time));

test('return the other mark', (t) => {
	newGame(3);
	const otherPlayer = other.bind(gameObject);
	t.true(otherPlayer(gameObject.X) === gameObject.O);
	t.true(otherPlayer(gameObject.O) === gameObject.X);
});

test('Find next move', (t) => {
	newGame(3);
	const moved = nextMove();
	// First counter move is always the center!
	t.true(moved === 4);
});

test('Reset game', (t) => {
	newGame(3);
	placeOnBoard(gameObject.X, gameObject.elems[0]);
	t.true(gameObject.boardSize === 3);
	t.true(elemHasMark(0, gameObject.X));
	resetGame();
	t.true(gameObject.boardSize === 3);
	t.false(elemHasMark(0, gameObject.X));

	newGame(7);
	placeOnBoard(gameObject.X, gameObject.elems[21]);
	t.true(elemHasMark(21, gameObject.X));
	resetGame();
	t.true(gameObject.boardSize === 7);
	t.false(elemHasMark(21, gameObject.X));
});

test('Autoplay', async (t) => {
	newGame(3);
	placeOnBoard(gameObject.X, gameObject.elems[0]);
	autoPlay();

	await wait(gameObject.DELAY);

	// The standard counter is to take the center position
	t.true(elemHasMark(4, gameObject.O));

	t.true(gameObject.boardStateArray.some((mark) => mark === gameObject.O));
});
