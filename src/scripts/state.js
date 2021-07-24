import opts from "../vars/const.js";
import findMatchingMarks from "./findMatchingMarks.js";

export function gameOver(matrix, mark) {
	const [flag] = findMatchingMarks(...arguments, opts.SIDE);
	return flag === opts.SIDE;
}

export function	checkForWinner(mark) {
	if (gameOver(this.matrix, mark)) {
		this.winner = mark;
	} else if (this.turn === opts.NUMBEROFSQUARES) {
		this.winner = opts.TIE;
	}
	if (this.winner) {
		this.lock = true;
		setTimeout(() => {
			this.elem.dataset[opts.REFERENCE] = this.winner;
			this.lock = false;
		}, 1000);
	}
}
