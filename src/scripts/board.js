import { checkForWinner } from './state.js';

function getRowFromIndex(index) {
    return Math.floor(index / this.SIDE);
}
function getColFromIndex(index) {
    return index - this.SIDE * Math.floor(index / this.SIDE);
}

export function createBoard() {
    this.elem.classList.add(this.REFERENCE);
    for (let i = 0; i < this.NUMBEROFSQUARES; i++) {
        this.elem.appendChild(document.createElement('span'));
    }
    this.parent.appendChild(this.elem);
    this.elems = [...this.elem.childNodes];
    this.elem.addEventListener('click', this, false);
}

export function placeOnBoard(mark, target) {
    const index = this.elems.indexOf(target);
    this.matrix[getRowFromIndex.call(this, index)][
        getColFromIndex.call(this, index)
    ] = mark;
    this.currentAxes = {
        x: getRowFromIndex.call(this, index),
        y: getColFromIndex.call(this, index),
    };
    this.positions[index] = mark;
    target.dataset[this.REFERENCE] = mark;
    this.turn++;
    checkForWinner.call(this, mark);
}
