
const SIDE = 3;
const NUMBEROFSQUARES = Math.pow(SIDE, 2);
const REFERENCE = 'tictactoe';
const X = 'X';
const O = 'O';
const TIE = 'Nobody';

const init = parent => Object.create({
	parent: parent || document.body,
	elem: document.createElement('div'),
	turn: 0,
	positions: new Array(NUMBEROFSQUARES).fill(''),
	matrix: [['', '', ''], ['', '', ''], ['', '', '']],
	winner: false,
	lock: false
});

const BOARD = {
	createBoard() {
		this.elem.classList.add(REFERENCE);
		for (let i = 0; i < NUMBEROFSQUARES; i++) {
			this.elem.appendChild(document.createElement('span'));
		}
		this.parent.appendChild(this.elem);
		this.elems = [...this.elem.childNodes];
		return this;
	},
	placeOnBoard(mark, target) {
		const index = this.elems.indexOf(target);
		this.matrix[getRowFromIndex(index)][getColFromIndex(index)] = mark;
		this.currentAxes = { x: getRowFromIndex(index), y: getColFromIndex(index)};
		this.positions[index] = mark;
		target.dataset[REFERENCE] = mark;
		this.turn++;
		this.checkForWinner(mark);
	}
};

const EVENTS = {
	listen(){
		this.elem.addEventListener('click', this, false);
		return this;
	},
	handleEvent(event) {
		if(this.lock) return;
		this.lock = true;
		if (this.elem.dataset[REFERENCE]) resetGame(this.elem, this.parent);
		const isSquare = (/span/i).test(event.target.tagName);
		if(isSquare && !event.target.dataset[REFERENCE] ) {
			this.placeOnBoard(X, event.target);
			setTimeout(() => {
				this.autoPlay();
				this.lock = false;
			}, 500);
		}
	}
};

const PLAYERS = {
	autoPlay(){
		const index = this.nextMove();
		if (index > -1 && !this.winner) this.placeOnBoard(O, this.elems[index]);
	}
};

const LOGIC = {
	checkForWinner(mark) {
		if (gameOver(this.matrix, mark)) {
			this.winner = mark;
		} else if (this.turn === NUMBEROFSQUARES) {
			this.winner = TIE;
		}
		if (this.winner) {
			this.lock = true;
			setTimeout(() => {
				this.elem.dataset[REFERENCE] = this.winner;
				this.lock = false;
			}, 1000);
		}
	},
	nextMove() {
		let center = this.positions[4];
		let even = [0, 2, 6, 8];
		let odd = [1, 3, 5, 7];

		let newPos = -1;
		const mark = this.matrix[this.currentAxes.x][this.currentAxes.y];
		const winningMove = calculateNextMove(this.matrix, other(mark), 2);
		const nextCoord = winningMove || calculateNextMove(this.matrix, mark, 2); // Blocking move;

		if (this.positions.reduce((c, v, i) => v === mark ? c + i : c) > 10) {
			even.reverse();
			odd.reverse();
		}
		if (nextCoord) {
			newPos = SIDE * nextCoord.x + nextCoord.y;
		} else if (center === '') {
			newPos = 4;
		} else {
			[...even, ...odd].some(i => {
				if (!this.positions[i]) {
					newPos = i;
					return true;
				}
			});
		}
		return newPos;
	}
};

function getRowFromIndex(index) {
	return Math.floor(index / SIDE);
}
function getColFromIndex(index) {
	return index - SIDE * Math.floor(index / SIDE);
}

function gameOver(matrix, mark) {
	[flag] = findMatchingMarks(...arguments, SIDE);
	return flag === SIDE;
}

function other(mark) {
	return mark === X ? O : X;
}

function calculateNextMove(matrix, mark, c) {
	[flag, block] = findMatchingMarks(...arguments);
	return flag === c && block.reduce((w, v) => (matrix[v.x][v.y] === '') ? v : w, false) ;
}

function findMatchingMarks(matrix, mark, c) {

	let block = [];
	let flag = 0;

	const evaluate = (x, y, count) => {
		const currentMark = matrix[x][y];
		if (count === 0) flag = 0;
		if (currentMark === mark) flag++;
		block[count] = {x, y};
		return currentMark !== other(mark);
	};

	matrix.some((r, n, a) => {
		return [
			() => r.every((s, i) => evaluate(n, i, i)),                   // Row
			() => r.every((s, i) => evaluate(i, i, i)),                   // Down Left to Right
			() => r.every((s, i) => evaluate(i, (a.length - 1) - i, i)),  // Down Right to Left
			() => r.every((s, i) => evaluate(i, n, i))                    // Col
		].some(p => {
			const f = p();
			return flag === c && f;
		});
	});
	return [flag, block];

}


function resetGame(elem, parent) {
	parent.removeChild(elem);
	tictictoe(parent);
}

function tictictoe(parent) {
	Object.assign(init(parent), BOARD, PLAYERS, EVENTS, LOGIC)
		.createBoard()
		.listen();
}

tictictoe();

