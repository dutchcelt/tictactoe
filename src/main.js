import tictactoe from 'ticatactoe';

class tictactoeElement extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `<link rel="stylesheet" href="styles/tictactoe.css" media="screen" />`;
    }

    connectedCallback() {
        tictactoe(this.shadowRoot);
    }
}
customElements.define('trvt-tictactoe', tictactoeElement);
