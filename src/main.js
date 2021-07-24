import tictactoe from "./scripts/tictactoe.js";

class tictactoeElement extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'})
		shadowRoot.innerHTML = `
			<link rel="stylesheet" href="styles/tictactoe.css" media="screen"/>
		`;
	}
	
	connectedCallback(){
		tictactoe(this.shadowRoot);
	}
	
}
customElements.define('trvt-tictactoe', tictactoeElement);


		

