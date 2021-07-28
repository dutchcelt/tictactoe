import test from 'ava';
import { init } from '../src/scripts/tictactoe.js';
import { createBoard, placeOnBoard } from '../src/scripts/board.js';
import browserEnv from 'browser-env';

browserEnv(['document']);

test('main object test', (t) => {
    const gameObj = init(document.body, 3);
    t.assert(gameObj.turn === 0);
    t.assert(gameObj.SIDE === 3);
    t.assert(gameObj.NUMBEROFSQUARES === 9);
    t.assert(gameObj.winner === false);
    t.assert(typeof gameObj.handleEvent === 'function');
    t.assert(gameObj.elem.tagName === 'MAIN');
});

test('create board', (t) => {
    const gameObj = init(document.body, 3);
    createBoard.call(gameObj);
    t.assert(gameObj.elem.className === gameObj.REFERENCE);
    t.assert(gameObj.elem.children.length === gameObj.NUMBEROFSQUARES);
});

test('placeOnBoard', (t) => {
    const gameObj = init(document.body, 3);
    const mark = 'X';
    createBoard.call(gameObj);

    placeOnBoard.call(gameObj, mark, gameObj.elem.children[1]);
    t.assert(gameObj.turn === 1);
    t.assert(gameObj.matrix[0][1] === mark);
    t.assert(gameObj.currentAxes.y === 1);
    t.assert(
        gameObj.elem.children[1].getAttribute(`data-${gameObj.REFERENCE}`) ===
            mark
    );
});
