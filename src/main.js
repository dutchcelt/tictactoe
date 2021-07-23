import tictactoe from "./scripts/tictactoe.js";


class tictactoeElement extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = ``;
	}
	
}
		
customElements.define('trvt-tictactoe', tictactoeElement);
tictactoe();