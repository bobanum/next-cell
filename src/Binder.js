import { Component } from "./Component.js";
import { Tab, TabsGroup } from "./Tabs.js";
import { Sheet } from "./Sheet.js";

export class Binder extends Component {
	fillable = ["id", "title", "sheets"];
	constructor() {
		super();
		this._sheets = {};
	}
	static get observedAttributes() {

		const observedAttributes = {
			href: {
				get: function () {
					return this.getAttribute("href");
				},
				set: function (value) {
					if (value === this._href) return;
					this._href = value;
					if (value !== this.getAttribute("href")) {
						this.setAttribute("href", value);
					}
					this.constructor.fetch(value).then(result => {
						this.fill(result);
					});
				}
			}
		};

		Object.defineProperties(this.prototype, observedAttributes);
		return Object.keys(observedAttributes);
	}
	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this[name] = newValue;
	}
	get title() {
		return this._title;
	}
	set title(value) {
		this._title = value;
		this.querySelector("[slot='title']").textContent = value;
	}
	get sheets() {
		return this._sheets;
	}
	set sheets(value) {
		this._sheets = {};
		for (var id in this._sheets) {
			this._sheets[id].remove();
			delete this._sheets[id];
		}
		for (var id in value) {
			const sheetData = value[id];
			const sheet = Sheet.fromJson(sheetData, { id: id, binder: this, slot: "sheets" });

			this.addSheet(sheet, id);
		}
	}
	connectedCallback() {
		this.appendChild(this.dom.title());
		this.shadowRoot.appendChild(this.dom.style());
		this.shadowRoot.appendChild(this.dom.main());
		this.tabs = new TabsGroup();
		this.tabs.addEventListener("change", (e) => {
			const id = e.detail.id;
		});
		this.shadowRoot.appendChild(this.tabs);
	}
	addSheet(sheet, id) {
		id = id || sheet.id;
		if (this._sheets[id]) return;
		this._sheets[id] = sheet;
		this.appendChild(sheet);

		const tab = new Tab(sheet.title);

		this.tabs.appendChild(tab);
	}
	removeSheet(id) {
		id = id.id || id;
		if (!this._sheets[id]) return;
		this._sheets[id].remove();
		delete this._sheets[id];
	}
	dom = {
		main: () => {
			const result = document.createDocumentFragment();
			const titleSlot = document.createElement("slot");
			titleSlot.name = "title";
			result.appendChild(titleSlot);
			const tabsSlot = document.createElement("slot");
			tabsSlot.name = "tabs";
			result.appendChild(tabsSlot);
			const sheetsSlot = document.createElement("slot");
			sheetsSlot.name = "sheets";
			result.appendChild(sheetsSlot);
			return result;
		},
		title: () => {
			const result = document.createElement("h1");
			result.slot = "title";
			result.textContent = this.title;
			return result;
		},
		style: () => {
			const result = document.createElement("style");
			result.textContent = `
				:host {
	display: grid;
	justify-content: center;
	padding: 1rem;

	.sheet {
		border: 1px solid #ccc;
		background-color: #f0f0f0;
	}
}
			`;
			return result;
		}
	};
	static fetch(url) {
		url = url || this.getAttribute("src");

		return fetch(url).then(res => res.json());
	}
	static fromJson(json, extra = {}) {
		var result = new this();
		result.fill(json, extra);
		return result;
	}
}
Binder.register("n-binder");