import { Component } from "./Component.js";

export class TabsGroup extends Component {
	constructor() {
		super();
	}
	connectedCallback() {
		this.shadowRoot.appendChild(this.dom.style());
		this.shadowRoot.appendChild(this.dom.main());
	}
	dom = {
		style: () => {
			const result = document.createElement("style");
			result.textContent = this.css;
			return result;
		},
		main: () => {
			const result = document.createDocumentFragment();
			const slot = document.createElement("slot");
			slot.name = "tabs";
			result.appendChild(slot);
			result.appendChild(this.dom.button());
			return result;
		},
		button: () => {
			const result = document.createElement("button");
			result.textContent = "+";
			return result;
		}
	};
}
TabsGroup.register("n-tabs-group");

export class Tab extends Component {
	constructor(text) {
		super();
		this.shadowRoot.appendChild(this.dom.style());
		console.log(text);

		this.textContent = text;
		this.addEventListener("click", this.evt.tab_click);
	}
	connectedCallback() {
		this.shadowRoot.appendChild(this.dom.main());
		this.slot = "tabs";
	}
	dom = {
		style: () => {
			const result = document.createElement("style");
			result.textContent = this.css;
			return result;
		},
		main: () => {
			const result = document.createDocumentFragment();
			const slot = document.createElement("slot");
			result.appendChild(slot);
			result.appendChild(this.dom.menu());
			return result;
		},
		menu: () => {
			const result = document.createElement("b");
			result.textContent = "\u22EE";
			return result;
		}
	};
	evt = {
		tab_click: (e) => {
			e.stopPropagation();
			if (this.classList.contains("active")) return;
			this.parentNode.querySelectorAll("n-tab").forEach((tab) => {
				tab.classList.remove("active");
			});
			// send event "change" via parent
			this.parentNode.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { id: this.id } }));
			this.classList.add("active");
		},
		menu_click: (menu, id) => {
			menu.addEventListener("click", (event) => {
				event.stopPropagation();
				this.removeSheet(id);
			});
		}
	};
}

Tab.register("n-tab");

TabsGroup.css = {
	":host": {
		"--gap": "4px",
		"display": "flex",
		"gap": "var(--gap)",
		"line-height": "1",
		"order": "1",
		"padding-left": ".5em",
		"button": {
			"background-color": "transparent",
			"border": "none",
			"padding": "0 .5rem",
			"display": "flex",
			"align-items": "center",
			"justify-content": "center",
			"font-size": "1.5em",
			"line-height": "0",
			"width": "1.5rem",
			"height": "1.5rem",
			"border-radius": "100%",
			"&:hover": {
				"background-color": "#f0f0f0"
			}
		}
	},
	":host(.top)": {
		".tabs": {
			"order": "-1",
			">div": {
				"border-radius": "var(--gap) var(--gap) 0 0",
				"border": "1px solid #ccc",
				"border-bottom": "none"
			}
		}
	}
};

Tab.css = {
	":host": {
		"display": "flex",
		"padding": "0 .5rem",
		"padding-right": "0",
		"border": "1px solid #ccc",
		"border-top": "none",
		"background-color": "#e0e0e0",
		"cursor": "pointer",
		"border-radius": "0 0 var(--gap) var(--gap)",
		"gap": "var(--gap)",
		"justify-content": "space-between",
		"align-items": "center",
		"overflow": "hidden",

		">b": {
			"transition": "200ms",
			"padding": "0 var(--gap)",
			"cursor": "pointer",
			"align-self": "stretch",
			"display": "flex",
			"align-items": "center",
			"justify-content": "center",
			"&:hover": {
				"color": "white",
				"background-color": "#0003"
			}
		}
	},
	":host(.active)": {
		"background-color": "#f0f0f0",
		"font-weight": "bold"
	},
	":host(:not(.active):hover)": {
		"background-color": "#d0d0d0"
	},
	":host(:not(:hover))": {
		">b": {
			"opacity": "0"
		}
	}
};