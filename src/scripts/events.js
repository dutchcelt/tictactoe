import { createBoard, placeOnBoard } from './board.js';
import { autoPlay, resetGame } from './logic.js';

export default function handleEvent(event) {
    if (this.lock) return;
    this.lock = true;
    if (this.elem.dataset[this.REFERENCE]) resetGame();
    const isSquare = /span/i.test(event.target.tagName);

    if (isSquare && !event.target.dataset[this.REFERENCE]) {
        placeOnBoard.call(this, this.X, event.target);
        setTimeout(() => {
            autoPlay.call(this);
            this.lock = false;
        }, 500);
    }
}
