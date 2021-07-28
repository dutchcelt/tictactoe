import test from 'ava';
import { init } from '../src/scripts/tictactoe.js';
import { createBoard, placeOnBoard } from '../src/scripts/board.js';
import { gameOver } from '../src/scripts/state.js';
import browserEnv from 'browser-env';

/*
 * https://github.com/avajs/ava/tree/main/docs
 */

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

test('game over', (t) => {
    // small board
    t.true(gameOver('X', 2, ['X', '', 'O', 'X']));
    // large board - Column win
    t.true(
        gameOver('X', 4, [
            'X',
            '',
            '',
            'O',
            'X',
            '',
            'O',
            '',
            'X',
            'O',
            '',
            '',
            'X',
            '',
            '',
            '',
        ])
    );
    // empty
    t.false(gameOver('X', 3, ['', '', '', '', '', '', '', '', '']));
    // row
    t.true(gameOver('O', 3, ['X', 'X', '', 'O', 'O', 'O', '', '', '']));
    // Column
    t.true(gameOver('X', 3, ['X', 'O', 'X', 'X', 'O', 'O', 'X', '', '']));
    // random
    t.false(gameOver('O', 3, ['X', 'O', 'O', 'X', 'X', 'O', 'X', 'O', '']));
    // backward diagonal
    t.true(gameOver('X', 3, ['X', 'O', 'O', 'X', 'X', 'O', '', 'O', 'X']));
    // forward diagonal
    t.true(gameOver('O', 3, ['X', 'O', 'O', 'X', 'O', 'X', 'O', 'O', '']));
});
