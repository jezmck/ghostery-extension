const uri = new URL(window.location.href);

const closeSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
const logoSVG = `
<svg class="ghostery-logo" width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <path d="M16.415 9.158c0 3.493-2.94 6.325-6.566 6.325-3.627 0-6.567-2.832-6.567-6.325 0-3.494 2.94-6.326 6.566-6.326 3.625 0 6.565 2.832 6.565 6.326" fill="#FFF"/>
    <path d="M18.65 17.774c-.91-1.995-1.067-3.686-1.09-4.35V7.96C17.56 3.783 13.992.4 9.594.4 5.195.4 1.63 3.783 1.63 7.96v5.543c-.034.715-.213 2.354-1.087 4.27-1.176 2.578-.203 2.27.668 2.06.873-.212 2.818-1.04 3.426-.02.608 1.018 1.115 1.903 2.533 1.326s2.086-.77 2.29-.77h.274c.202 0 .87.193 2.29.77 1.418.576 1.925-.31 2.533-1.328.607-1.02 2.553-.19 3.424.02.873.212 1.845.52.67-2.058" fill="#FFF"/>
    <path d="M7.136 4.52c.858 0 1.554 1.046 1.554 2.335 0 1.288-.696 2.333-1.554 2.333-.857 0-1.553-1.045-1.553-2.333 0-1.29.696-2.334 1.553-2.334M9.595 13.847c-1.89 0-3.482-1.765-3.96-3.73.925 1.208 2.354 1.985 3.96 1.985 1.605 0 3.035-.777 3.96-1.985-.48 1.965-2.07 3.73-3.96 3.73M12.053 9.188c-.858 0-1.553-1.045-1.553-2.333 0-1.29.695-2.334 1.553-2.334.86 0 1.553 1.046 1.553 2.335 0 1.288-.694 2.333-1.553 2.333" fill="#00AEF0"/>
  </g>
</svg>
`;

function sendMessage(message) {
	chrome.runtime.sendMessage({
		name: 'setContextualOnboardingChoice',
		message,
		origin: '',
	});
}

function createBackground() {
	const element = document.createElement('div');
	element.style.position = 'fixed';
	element.style.width = '100%';
	element.style.height = '100%';
	element.style.top = 0;
	element.style.left = 0;
	element.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
	element.style.zIndex = 2147483643;
	element.style.display = 'flex';
	element.style.alignItems = 'center';
	element.style.justifyContent = 'center';

	const close = () => {
		element.parentElement.removeChild(element);
	};

	element.addEventListener('click', close);

	return {
		element,
		close,
	};
}

function createPopup({ close }) {
	const wrapper = document.createElement('div');
	const shadow = wrapper.attachShadow({ mode: 'open' });

	const popup = document.createElement('div');
	popup.classList.add('popup');
	const style = document.createElement('style');

	style.textContent = `
    .popup {
			background: white;
			border-radius: 8px;
			overflow: hidden;
			font-family: "Open Sans", "Roboto", Arial, Helvetica, sans-serif !important;
			width: 350px;
    }
		header {
			background-color: #00AEF0;
			color: white;
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 5px 10px;
		}
		.ghostery-logo {
			width: 24px;
			height: 24px;
		}
		.domain-name {
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			flex-grow: 1;
			text-align: center;
		}
		.feather-close {
			width: 24px;
			height: 24px;
			color: white;
		}
		main {
			display: flex;
			flex-direction: column;
			padding: 20px 10px;
			color: #4a4a4a;
			font-size: 18px;
		}
		main p {
			text-align: center;
			margin: 0;
		}
		.buttons {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			margin-top: 20px;
		}
		small {
			font-size: 14px;
			margin: 20px 40px 0 40px;
			color: #666666;
			text-align: center;
		}
		button {
			cursor: pointer;
			border: 0px;
			padding: 5px 10px;
			font-weight: medium;
			font-size: 17px;
			border-radius: 5px;
			background-color: rgb(246, 246, 248);
			border: 1px solid #00AEF0;
		}
		button.cta {
			color: white;
			background-color: #00AEF0;
		}
  `;

	popup.innerHTML = `
		<header>
			${logoSVG}
			</svg>
			<span class="domain-name">${uri.hostname}</span>
			${closeSVG}
		</header>
		<main>
			<p>Ghostery has detected multiple ads and trackers on this website.</p>
			<p>Do you wish to enable Ad Blocking?</p>
			<div class="buttons">
				<button class="choice-no">no thanks</button>
				<button class="choice-ok cta">OK</button>
			</div>
			<small>You can always update your choice in Ghostery&nbsp;Panel</small>
		</main>
	`;

	popup.querySelector('.choice-no').addEventListener('click', () => {
		sendMessage({
			enable_ad_block: false,
		});
	});
	popup.querySelector('.choice-ok').addEventListener('click', () => {
		sendMessage({
			enable_ad_block: true,
		});
	});

	popup.querySelector('.feather-x').addEventListener('click', close);

	shadow.appendChild(style);
	shadow.appendChild(popup);

	return {
		element: wrapper,
	};
}

const { element: background, close } = createBackground();
const { element: popup } = createPopup({ close });

background.appendChild(popup);
document.body.appendChild(background);
