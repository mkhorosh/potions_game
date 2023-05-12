import styled from 'styled-components'

export const StyledSpinner = styled.div`
  * {
	border: 0;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
:root {
	--bg: #e3e4e8;
	--fg: #FDEE71;
	--primary: #923943;
	font-size: calc(16px + (24 - 16) * (100vw - 320px) / (1280 - 320));
}
body {
	background: var(--bg);
	display: grid;
	font: 1em/1.5 sans-serif;
	height: 100vh;
	place-items: center;
}

.hourglass, .hourglass:before, .hourglass:after {
	animation-duration: 4s;
	animation-iteration-count: infinite;
}
.hourglass {
	--polygonH: polygon(0% 0%,100% 0%,100% 5.55%,95% 5.55%,95% 28%,60% 46%,60% 54%,95% 72%,95% 94.45%,100% 94.45%,100% 100%,0% 100%,0% 94.45%,5% 94.45%,5% 72%,40% 54%,40% 46%,5% 28%,5% 5.55%,0% 5.55%);
	animation-name: flip;
	animation-timing-function: ease-in-out;
	background-image: linear-gradient(var(--primary) 0.5em,#737a8c55 0.5em 8.5em,var(--primary) 8.5em);
	clip-path: var(--polygonH);
	-webkit-clip-path: var(--polygonH);
	overflow: hidden;
	position: relative;
	width: 5em;
	height: 9em;
	z-index: 0;
}
.hourglass:before, .hourglass:after {
	animation-timing-function: linear;
	content: "";
	display: block;
	position: absolute;
}
.hourglass:before {
	--polygonB1: polygon(0% 0%,100% 0%,100% 24%,50% 47%,50% 47%,50% 47%,50% 47%,50% 47%,50% 47%,50% 47%,50% 47%,0% 24%);
	--polygonB2: polygon(0% 4%,100% 4%,100% 24%,55% 45%,55% 100%,55% 100%,55% 100%,45% 100%,45% 100%,45% 100%,45% 45%,0% 24%);
	--polygonB3: polygon(0% 24%,100% 24%,100% 24%,55% 45%,55% 80%,100% 100%,100% 100%,0% 100%,0% 100%,45% 80%,45% 45%,0% 24%);
	--polygonB4: polygon(45% 45%,55% 45%,55% 45%,55% 45%,55% 58%,100% 76%,100% 100%,0% 100%,0% 76%,45% 58%,45% 45%,45% 45%);
	--polygonB5: polygon(50% 53%,50% 53%,50% 53%,50% 53%,50% 53%,100% 76%,100% 100%,0% 100%,0% 76%,50% 53%,50% 53%,50% 53%);
	animation-name: fill;
	background-color: var(--fg);
	background-size: 100% 3.6em;
	clip-path: var(--polygonB1);
	-webkit-clip-path: var(--polygonB1);
	top: 0.5em;
	left: 0.5em;
	width: 4em;
	height: 8em;
	z-index: 1;
}
.hourglass:after {
	animation-name: glare;
	background:
		linear-gradient(90deg,#0000 0.5em,#0003 0.5em 1.5em,#0000 1.5em 3.5em,#fff3 3.5em 4.5em,#fff0 4.5em 6.5em,#0003 6.5em 7.5em,#0000 7.5em) 0 0 / 100% 0.5em,
		linear-gradient(90deg,#0000 0.75em,#0003 0.75em 1.25em,#0000 1.25em 3.75em,#fff3 3.75em 4.25em,#fff0 4.25em 6.75em,#0003 6.75em 7.25em,#0000 7.25em) 0 0.5em / 100% 8em,
		linear-gradient(90deg,#0000 0.5em,#0003 0.5em 1.5em,#0000 1.5em 3.5em,#fff3 3.5em 4.5em,#fff0 4.5em 6.5em,#0003 6.5em 7.5em,#0000 7.5em) 0 100% / 100% 0.5em;
	background-repeat: repeat-x;
	top: 0;
	left: -3em;
	width: 200%;
	height: 100%;
	z-index: 2;
}
/* Animations */
@keyframes fill {
	from {
		clip-path: var(--polygonB1);
		-webkit-clip-path: var(--polygonB1);
	}
	10% {
		clip-path: var(--polygonB2);
		-webkit-clip-path: var(--polygonB2);
	}
	45% {
		clip-path: var(--polygonB3);
		-webkit-clip-path: var(--polygonB3);
	}
	80% {
		clip-path: var(--polygonB4);
		-webkit-clip-path: var(--polygonB4);
	}
	85%, to {
		clip-path: var(--polygonB5);
		-webkit-clip-path: var(--polygonB5);
	}
}
@keyframes glare {
	from, 90% {
		transform: translateX(0);
	}
	to {
		transform: translateX(3em);
	}
}
@keyframes flip {
	from, 90% {
		transform: rotate(0);
	}
	to {
		transform: rotate(180deg);
	}
}
/* Dark mode */
@media (prefers-color-scheme: dark) {
	:root {
		--bg: #17181c;
		--fg: #c7cad1;
	}
}
`;