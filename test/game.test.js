import test from 'ava';
import browserEnv from 'browser-env';
import { gameObject, default as tictactoe } from '../src/scripts/tictactoe.js';
import { createBoard, placeOnBoard } from '../src/scripts/board.js';
import { gameOver, checkForWinner } from '../src/scripts/state.js';
import { other, nextMove } from '../src/scripts/logic.js';

/*
 * https://github.com/avajs/ava/tree/main/docs
 */

browserEnv(['document']);

// game states

const states = {
    // Small board, X wins
    small: ['X', '', 'O', 'X'],
    // Large board, X wins
    large: [
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
    ],
    empty: ['', '', '', '', '', '', '', '', ''],
    // Row, O wins
    row: ['X', 'X', '', 'O', 'O', 'O', '', '', ''],
    // Column, X wins
    column: ['X', 'O', 'X', 'X', 'O', 'O', 'X', '', ''],
    // Random, X wins
    random: ['X', 'O', 'O', 'X', 'X', 'O', 'X', 'O', ''],
    // backward diagonal, X wins
    backwardDiagonal: ['X', 'O', 'O', 'X', 'X', 'O', '', 'O', 'X'],
    // forward diagonal, O wins
    forwardDiagonal: ['X', 'O', 'O', 'X', 'O', 'X', 'O', 'O', ''],
    // Full board, nobody wins
    tie: ['X', 'O', 'X', 'O', 'O', 'X', 'X', 'X', 'O'],
};
test('main object test', (t) => {
    tictactoe(document.body, 3);
    const gameObj = gameObject;
    t.assert(gameObj.turn === 0);
    t.assert(gameObj.boardSize === 3);
    t.assert(gameObj.NUMBEROFSQUARES === 9);
    t.assert(gameObj.winner === false);
    t.assert(typeof gameObj.handleEvent === 'function');
    t.assert(gameObj.elem.tagName === 'MAIN');
});

test('create board', (t) => {
    tictactoe(document.body, 3);
    t.assert(gameObject.elem.className === gameObject.REFERENCE);
    t.assert(gameObject.elem.children.length === gameObject.NUMBEROFSQUARES);
});

test('placeOnBoard', (t) => {
    tictactoe(document.body, 3);
    const mark = 'X';

    placeOnBoard(mark, gameObject.elem.children[1]);
    t.assert(gameObject.turn === 1);
    t.assert(
        gameObject.elem.children[1].getAttribute(
            `data-${gameObject.REFERENCE}`
        ) === mark
    );
});

test('game over', (t) => {
    // small board
    t.true(gameOver('X', 2, states.small));
    // large board - Column win
    t.true(gameOver('X', 4, states.large));
    // empty
    t.false(gameOver('X', 3, states.empty));
    // row
    t.true(gameOver('O', 3, states.row));
    // Column
    t.true(gameOver('X', 3, states.column));
    // random
    t.false(gameOver('O', 3, states.random));
    // backward diagonal
    t.true(gameOver('X', 3, states.backwardDiagonal));
    // forward diagonal
    t.true(gameOver('O', 3, states.forwardDiagonal));
    // game is a tie
    t.true(gameOver('O', 3, states.tie));
});

test('Check for a winner', async (t) => {
    tictactoe(document.body, 3);
    const gameObj = gameObject;
    const thisWinner = checkForWinner.bind(gameObj);
    // empty board
    await thisWinner('X');
    t.false(gameObj.winner === 'X');
    // X should win
    gameObj.boardStateArray = states.column;
    await thisWinner('X');
    t.true(gameObj.winner === 'X');
    // O should win
    gameObj.boardStateArray = states.row;
    await thisWinner('O');
    t.true(gameObj.winner === 'O');
    // game is a tie
    gameObj.boardStateArray = states.tie;
    gameObj.turn = gameObj.NUMBEROFSQUARES;
    await thisWinner(); // Nobody
    t.true(gameObj.winner === gameObj.TIE);
});

test('return the other mark', (t) => {
    tictactoe(document.body, 3);
    const gameObj = gameObject;
    const otherPlayer = other.bind(gameObj);
    t.true(otherPlayer(gameObj.X) === gameObj.O);
    t.true(otherPlayer(gameObj.O) === gameObj.X);
});

test('Find matching marks', (t) => {
    tictactoe(document.body, 3);
    const gameObj = gameObject;
    t.true(nextMove.call(gameObj) === 4);
});
