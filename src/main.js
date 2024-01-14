import tictactoe from './scripts/tictactoe.js';
import { styles, global } from './styles/tictactoe.css.js';

const insertStyles = (target, sheet) => {
	target.adoptedStyleSheets.includes(sheet) || target.adoptedStyleSheets.push(sheet);
};

insertStyles(document, global);

class tictactoeElement extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' });
		insertStyles(shadow, styles);
		tictactoe(shadow);
	}
}
customElements.define('tic-tac-toe', tictactoeElement);
