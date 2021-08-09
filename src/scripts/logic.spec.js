import test from 'ava';
import browserEnv from 'browser-env';
import { gameObject, default as tictactoe } from './tictactoe.js';
import { other, nextMove } from './logic.js';

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
    t.true(nextMove.call(gameObject) === 4);
});
