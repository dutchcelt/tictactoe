(()=>{function M(e){return t.winningMoves.some(r=>t.boardStateArray.every(o=>!!o)||r.every(o=>t.boardStateArray[o]===e))}function g(e){return new Promise(r=>{M(e)&&(t.winner=t.turn===t.boardStateArray.length?t.TIE:e),t.winner?(t.lock=!0,setTimeout(()=>{t.elem.dataset[t.REFERENCE]=t.winner,t.lock=!1,r()},t.DELAY)):r()})}function h(){t.elem.classList.add(t.REFERENCE),t.boardStateArray.forEach(()=>{t.elem.appendChild(document.createElement("span"))}),t.elems=[...t.elem.childNodes],t.elem.addEventListener("click",t,!1),t.parent.appendChild(t.elem)}function l(e,r){let o=t.elems.indexOf(r);t.boardStateArray[o]=e,r.dataset[t.REFERENCE]=e,t.turn++,g(e)}var b=Object.freeze({REFERENCE:"tictactoe",X:"X",O:"O",TIE:"Nobody",DELAY:1e3});function X(e){if(e!==t.X&&e!==t.O)throw`Invalid mark used. Should be an "${t.X}" or an "${t.O}"`;return e===t.X?t.O:t.X}var y=e=>{let r;return t.winningMoves.some(o=>{let a=o.map(i=>t.boardStateArray[i]);if(a.filter(i=>i===e).length===t.boardSize-1&&a.indexOf("")>=0)return r=o[a.indexOf("")],!0}),r};function v(){let e=R();e>-1&&!t.winner&&l.call(t,"O",t.elems[e])}function E(){t.parent.removeChild(t.elem),s(t.parent,t.boardSize)}function R(){let e=t.boardStateArray.map((c,k)=>k),r=Math.floor(e.length/2),o=t.boardStateArray[r],a=e.filter(c=>c%2==0&&c!==r),i=e.filter(c=>c%2!=0),n=-1,u=t.turn%2==0?t.O:t.X,d=y(X(u))||y(u);return d!==void 0?n=d:o?([...a,...i].some(c=>{if(!t.boardStateArray[c])return n=c,!0}),n=d||n):n=r,n}function p(e){if(t.lock)return;t.lock=!0,t.elem.dataset[t.REFERENCE]&&E(),/span/i.test(e.target.tagName)&&!e.target.dataset[this.REFERENCE]&&(l(t.X,e.target),setTimeout(()=>{v(),t.lock=!1},t.DELAY))}var m=e=>new Array(e).fill(),C=e=>[r=>m(e).map((o,a)=>r*e+a),r=>m(e).map((o,a)=>a*e+r),r=>r*e+r,r=>r*e+e-r-1],F=(e,r)=>{let o=m(e).map((i,n)=>r(n)),a=o.flat();if(a.length!==new Set(a).size)throw"Pattern returns duplicate positions ";return[o].flat(+Array.isArray(o[0]))},w=e=>C(e).map(a=>F(e,a)).flat(1);var N=(e,r)=>({boardSize:r,parent:e,elem:document.createElement("div"),turn:0,boardStateArray:new Array(Math.pow(r,2)).fill(""),winner:!1,lock:!1,handleEvent:p,winningMoves:w(r)}),t=Object.create(b);function s(e=document.body,r=3){Object.assign(t,N(e,r)),h()}var x=O`
	.tictactoe {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: repeat(3, 1fr);
		grid-gap: var(--tictactoe-lime);
		width: 18rem;
		height: calc(18rem - 1px);
		font-family: Arial, sans-serif;
		background-color: var(--tictactoe-blue);
		pointer-events: none;
		border-width: clamp(5px, 0.5rem, 18px);
		border-style: solid;
		border-color: var(--tictactoe-darkgrey);
		border-radius: clamp(5px, 0.5rem, 18px);
	}
	.tictactoe span {
		background: var(--tictactoe-darkgrey);
		pointer-events: auto;
	}
	.tictactoe span:hover {
		box-shadow: 0 0 0 var(--tictactoe-lime) #b9dde6;
		cursor: pointer;
	}

	.tictactoe span[data-tictactoe] {
		position: relative;
		pointer-events: none;
	}
	.tictactoe span[data-tictactoe]::before,
	.tictactoe span[data-tictactoe]::after {
		position: absolute;
		pointer-events: none;
	}

	span[data-tictactoe='X']::before,
	span[data-tictactoe='X']::after {
		position: absolute;
		top: 44%;
		left: 4;
		content: '';
		height: var(--tictactoe-weight);
		width: 92%;
		display: block;
		background-color: var(--tictactoe-orange);
	}
	span[data-tictactoe='X']::before {
		transform: rotate(45deg);
	}

	span[data-tictactoe='X']::after {
		transform: rotate(135deg);
	}

	span[data-tictactoe='O']::before {
		border: var(--tictactoe-weight) solid var(--tictactoe-green);
		border-radius: 100%;
		content: '';
		margin: 0.5rem;
		width: 3.2rem;
		height: 3.2rem;
		filter: brightness(110%) saturate(110%);
	}

	.tictactoe[data-tictactoe] {
		background: transparent;
		pointer-events: auto;
	}
	.tictactoe[data-tictactoe] span::before,
	.tictactoe[data-tictactoe] span::after {
		filter: blur(0.5rem) saturate(85%) invert(75%);
		opacity: 0.5;
	}
	.tictactoe[data-tictactoe]::before {
		position: absolute;
		z-index: 1;
		padding: 3rem 1.5rem 1rem;
		width: 15rem;
		height: 12rem;
		font-weight: bold;
		font-size: 3rem;
		text-align: center;
		text-shadow: 1px 1px 2px var(--tictactoe-darkgrey);
	}
	.tictactoe[data-tictactoe]::before {
		content: attr(data-tictactoe) ' is the winner!';
		color: lightgray;
	}
	.tictactoe[data-tictactoe]::after {
		position: absolute;
		text-align: center;
		display: block;
		margin-top: 15rem;
		content: 'Play Again?';
		color: cornflowerblue;
		text-decoration: underline;
		width: 18rem;
		cursor: pointer;
	}
	.tictactoe[data-tictactoe]:hover::after {
		color: lightgray;
	}
	.tictactoe[data-tictactoe='O']::before {
		color: var(--tictactoe-green);
		filter: brightness(120%);
	}
	.tictactoe[data-tictactoe='X']::before {
		color: var(--tictactoe-orange);
	}
`,A=O`
	:root {
		--tictactoe-darkgrey: #3f3f3f;
		--tictactoe-orange: goldenrod;
		--tictactoe-green: olivedrab;
		--tictactoe-blue: steelblue;
		--tictactoe-lime: 5px;
		--tictactoe-weight: 12px;
	}
`;function O(e){let r=new CSSStyleSheet;return r.replaceSync(e),r}var S=(e,r)=>{e.adoptedStyleSheets.includes(r)||e.adoptedStyleSheets.push(r)};S(document,A);var f=class extends HTMLElement{constructor(){super();let r=this.attachShadow({mode:"open"});S(r,x),s(r)}};customElements.define("tic-tac-toe",f);})();
