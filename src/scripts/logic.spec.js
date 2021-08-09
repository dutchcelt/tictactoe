import test from 'ava';
import browserEnv from 'browser-env';
import { gameObject, default as tictactoe } from './tictactoe.js';
import { other, nextMove, resetGame } from './logic.js';
import { placeOnBoard } from './board.js';

browserEnv(['document']);

const newGame = (size) => tictactoe(document.body, size);

test('return the other mark', (t) => {
    newGame(3);
    const otherPlayer = other.bind(gameObject);
    t.true(otherPlayer(gameObject.X) === gameObject.O);
    t.true(otherPlayer(gameObject.O) === gameObject.X);
});

test('Find matching marks', (t) => {
    newGame(3);
    // First counter move is always the center!
    t.true(nextMove() === 4);
});

test('Reset game', (t) => {
    const elemHasMark = (pos, mark) =>
        gameObject.elems[pos].dataset[gameObject.REFERENCE] === mark;

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
