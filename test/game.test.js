import test from 'ava';
import { init } from '../src/scripts/tictactoe.js';
import browserEnv from 'browser-env';

browserEnv(['window', 'document', 'navigator']);
const gameObj = init();

test('unicorn test', (t) => {
    t.truthy('unicorn'); // Assertion
});
test('main object test', (t) => {
    t.assert(gameObj.winner === false);
    t.assert(gameObj.lock === false);
    t.assert(gameObj.elem.tagName === 'MAIN');
});
