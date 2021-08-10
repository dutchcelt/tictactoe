import test from 'ava';
import browserEnv from 'browser-env';
import { gameObject, init, default as tictactoe } from './tictactoe.js';

browserEnv(['document']);

const newGame = (size) => tictactoe(document.body, size);

test('initializing the gameObject', (t) => {
    t.assert(gameObject.boardSize === undefined);
    init.call(gameObject, document.body, 4);
    t.assert(gameObject.boardSize === 4);
});

test('main object test', (t) => {
    newGame(3);
    t.assert(gameObject.turn === 0);
    t.assert(gameObject.boardSize === 3);
    t.assert(gameObject.boardStateArray.length === 9); // 3 x 3
    t.assert(gameObject.winner === false);
    t.assert(typeof gameObject.handleEvent === 'function');
    t.assert(gameObject.elem.tagName === 'MAIN');
});
