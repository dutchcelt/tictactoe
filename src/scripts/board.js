import opts from "../vars/const.js";
import {checkForWinner} from "./state.js";

function getRowFromIndex(index) {
	return Math.floor(index / opts.SIDE);
}
function getColFromIndex(index) {
	return index - opts.SIDE * Math.floor(index / opts.SIDE);
}

export function createBoard() {
	this.elem.classList.add(opts.REFERENCE);
	for (let i = 0; i < opts.NUMBEROFSQUARES; i++) {
		this.elem.appendChild(document.createElement('span'));
	}
	this.parent.appendChild(this.elem);
	this.elems = [...this.elem.childNodes];
	this.elem.addEventListener('click', this, false);
}

export function placeOnBoard(mark, target) {
	const index = this.elems.indexOf(target);
	this.matrix[getRowFromIndex(index)][getColFromIndex(index)] = mark;
	this.currentAxes = { x: getRowFromIndex(index), y: getColFromIndex(index)};
	this.positions[index] = mark;
	target.dataset[opts.REFERENCE] = mark;
	this.turn++;
	checkForWinner.call(this, mark);
}

