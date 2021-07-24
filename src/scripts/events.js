import opts from "../vars/const.js";
import { createBoard, placeOnBoard } from "./board.js";
import { nextMove } from "./logic.js";

function autoPlay(){
	const index = nextMove.call(this);
	if (index > -1 && !this.winner) placeOnBoard.call(this, "O", this.elems[index]);
}

function resetGame(elem, parent) {
	parent.removeChild(elem);
	tictictoe(parent);
}

export default function handleEvent(event) {
	if(this.lock) return;
	this.lock = true;
	if (this.elem.dataset[opts.REFERENCE]) resetGame(this.elem, this.parent);
	const isSquare = (/span/i).test(event.target.tagName);
	if(isSquare && !event.target.dataset[opts.REFERENCE] ) {
		placeOnBoard.call(this, opts.X, event.target);
		setTimeout(() => {
			autoPlay.call(this);
			this.lock = false;
		}, 500);
	}

};