import { createBoard, placeOnBoard } from './board.js';
import { autoPlay, resetGame } from './logic.js';
import { gameObject } from './tictactoe.js';

export default function handleEvent(event) {
    if (gameObject.lock) return;
    gameObject.lock = true;
    if (gameObject.elem.dataset[gameObject.REFERENCE]) resetGame();
    const isSquare = /span/i.test(event.target.tagName);

    if (isSquare && !event.target.dataset[this.REFERENCE]) {
        placeOnBoard(gameObject.X, event.target);
        setTimeout(() => {
            autoPlay();
            gameObject.lock = false;
        }, gameObject.DELAY);
    }
}
