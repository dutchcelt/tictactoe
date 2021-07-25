import tictactoe from './tictactoe.js';
import { createBoard, placeOnBoard } from './board.js';
import { nextMove } from './logic.js';

function autoPlay() {
    const index = nextMove.call(this);
    if (index > -1 && !this.winner)
        placeOnBoard.call(this, 'O', this.elems[index]);
}

function resetGame(elem, parent) {
    parent.removeChild(elem);
    tictactoe(parent);
}

export default function handleEvent(event) {
    if (this.lock) return;
    this.lock = true;
    if (this.elem.dataset[this.REFERENCE]) resetGame(this.elem, this.parent);
    const isSquare = /span/i.test(event.target.tagName);

    if (isSquare && !event.target.dataset[this.REFERENCE]) {
        placeOnBoard.call(this, this.X, event.target);
        setTimeout(() => {
            autoPlay.call(this);
            this.lock = false;
        }, 500);
    }
}
