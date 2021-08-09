import test from 'ava';
import getEveryWinningMove from './moves.js';

test('check the move patterns', (t) => {
    // Number of patterns are two diagonals and rows and columns
    // A board of 3 by 3 would have 8 patterns
    t.true(getEveryWinningMove(3).length === 8);
    // A board of 5 by 5 would have 12 patterns
    t.true(getEveryWinningMove(5).length === 12);

    t.true(getEveryWinningMove(3).every((pattern) => pattern.length === 3));
});
