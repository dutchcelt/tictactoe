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

const newGame = (size) => tictactoe(document.body, size);

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
    newGame(3);
    t.assert(gameObject.turn === 0);
    t.assert(gameObject.boardSize === 3);
    t.assert(gameObject.boardStateArray.length === 9); // 3 x 3
    t.assert(gameObject.winner === false);
    t.assert(typeof gameObject.handleEvent === 'function');
    t.assert(gameObject.elem.tagName === 'MAIN');
});

test('create board', (t) => {
    newGame(7);
    t.assert(gameObject.elem.className === gameObject.REFERENCE);
    t.assert(
        gameObject.elem.children.length === gameObject.boardStateArray.length
    );
});

test('placeOnBoard', (t) => {
    newGame(3);
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
    newGame(2);

    // small board
    gameObject.boardStateArray = states.small;
    t.true(gameOver('X'));

    newGame(4);

    // large board - Column win
    gameObject.boardStateArray = states.large;
    t.true(gameOver('X', 4, states.large));

    newGame(3);

    // empty
    gameObject.boardStateArray = states.empty;
    t.false(gameOver('X'));
    // row
    gameObject.boardStateArray = states.row;
    t.true(gameOver('O'));
    // Column
    gameObject.boardStateArray = states.column;
    t.true(gameOver('X'));
    // random
    gameObject.boardStateArray = states.random;
    t.false(gameOver('O'));
    // backward diagonal
    gameObject.boardStateArray = states.backwardDiagonal;
    t.true(gameOver('X'));
    // forward diagonal
    gameObject.boardStateArray = states.forwardDiagonal;
    t.true(gameOver('O'));
    // game is a tie
    gameObject.boardStateArray = states.tie;
    t.true(gameOver('O'));
});

test('Check for a winner', async (t) => {
    newGame(3);
    const thisWinner = checkForWinner.bind(gameObject);
    // empty board
    await thisWinner('X');
    t.false(gameObject.winner === 'X');
    // X should win
    gameObject.boardStateArray = states.column;
    await thisWinner('X');
    t.true(gameObject.winner === 'X');
    // O should win
    gameObject.boardStateArray = states.row;
    await thisWinner('O');
    t.true(gameObject.winner === 'O');
    // game is a tie
    gameObject.boardStateArray = states.tie;
    gameObject.turn = gameObject.boardStateArray.length;
    await thisWinner(); // Nobody
    t.true(gameObject.winner === gameObject.TIE);
});

test('return the other mark', (t) => {
    newGame(3);
    const otherPlayer = other.bind(gameObject);
    t.true(otherPlayer(gameObject.X) === gameObject.O);
    t.true(otherPlayer(gameObject.O) === gameObject.X);
});

test('Find matching marks', (t) => {
    newGame(3);
    t.true(nextMove.call(gameObject) === 4);
});
