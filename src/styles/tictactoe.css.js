const styles = css`
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
`;

const global = css`
	:root {
		--tictactoe-darkgrey: #3f3f3f;
		--tictactoe-orange: goldenrod;
		--tictactoe-green: olivedrab;
		--tictactoe-blue: steelblue;
		--tictactoe-lime: 5px;
		--tictactoe-weight: 12px;
	}
`;

function css(cssText) {
	const sheet = new CSSStyleSheet();
	sheet.replaceSync(cssText);
	return sheet;
}

export { styles, global };
