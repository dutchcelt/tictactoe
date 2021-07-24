import opts from "../vars/const.js";

export function other(mark) {
	return mark === opts.X ? opts.O : opts.X;
}

export default function findMatchingMarks(matrix, mark, c) {
	const block = [];
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