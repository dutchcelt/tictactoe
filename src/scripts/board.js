import { checkForWinner } from './state.js';
import { gameObject } from './tictactoe.js';

export function createBoard() {
    gameObject.elem.classList.add(gameObject.REFERENCE);
    gameObject.boardStateArray.forEach(() => {
        gameObject.elem.appendChild(document.createElement('span'));
    });
    gameObject.elems = [...gameObject.elem.childNodes];
    gameObject.elem.addEventListener('click', gameObject, false);
    gameObject.parent.appendChild(gameObject.elem);
}

export function placeOnBoard(mark, target) {
    const index = gameObject.elems.indexOf(target);
    gameObject.boardStateArray[index] = mark;
    target.dataset[gameObject.REFERENCE] = mark;
    gameObject.turn++;
    checkForWinner(mark);
}
