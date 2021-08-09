import test from 'ava';
import browserEnv from 'browser-env';
import { gameObject, default as tictactoe } from './tictactoe.js';
import { other, nextMove, resetGame, autoPlay } from './logic.js';
import { placeOnBoard } from './board.js';
import handleEvent from './events.js';

browserEnv(['document']);

const newGame = (size) => tictactoe(document.body, size);
const elemHasMark = (pos, mark) =>
    gameObject.elems[pos].dataset[gameObject.REFERENCE] === mark;
const wait = (time) => new Promise((r) => setTimeout(() => r(), time));

test('Click event', async (t) => {
    newGame(3);
    gameObject.elems[2].click();
    t.true(elemHasMark(2, gameObject.X));

    await wait(gameObject.DELAY);

    // The standard counter is to take the center position
    t.true(elemHasMark(4, gameObject.O));
    t.true(gameObject.boardStateArray.some((mark) => mark === gameObject.O));
});
