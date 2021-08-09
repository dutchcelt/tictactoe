import test from 'ava';
import browserEnv from 'browser-env';
import { gameObject, default as tictactoe } from './tictactoe.js';
import { createBoard, placeOnBoard } from './board.js';

browserEnv(['document']);

const newGame = (size) => tictactoe(document.body, size);

test('create board', (t) => {
    newGame(7);
    t.assert(gameObject.elem.className === gameObject.REFERENCE);
    t.assert(
        gameObject.elem.children.length === gameObject.boardStateArray.length
    );
});

test('placeOnBoard', (t) => {
    newGame(3);
    placeOnBoard(gameObject.X, gameObject.elems[1]);
    t.assert(gameObject.turn === 1);
    t.assert(
        gameObject.elems[1].dataset[gameObject.REFERENCE] === gameObject.X
    );
});