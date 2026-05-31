import Component from "./Component.js";
import Group from "./Group.js";
import Row from "./Row.js";

export class RowGroup extends Group {
	_label = "";
	_items = {};
	_bodies = [];
	constructor() {
		super();
		this.shadowRoot.appendChild(this.dom.style());
		this.slot = "rowGroups";
	}
	connectedCallback() {
		this.shadowRoot.appendChild(this.dom.main());
	}
	addItem(item, id) {
		const itemElement = new Row().fill(item, { id, parent: this, sheet: this.sheet });
		this._items[id] = itemElement;
		this.appendChild(itemElement);
	}
	get id() {
		return this._id;
	}
	set id(value) {
		this._label = value;
		this._id = value;
		this.style.setProperty("--row-group", value);
	}
	get bodies() {
		return this._bodies;
	}
	set bodies(value) {
		this._bodies.forEach((body, id) => {
			body.remove();
		});
		this._bodies = [];
		value.forEach(bodyData => {
			const body = Group.fromJson(bodyData, { sheet: this.sheet, slot: "body" });
			this._bodies.push(body);
			this.appendChild(body);
		});
	}
	dom = {
		style: () => {
			const result = document.createElement("style");			
			result.textContent = this.css;
			return result;
		},
		main: () => {
			const result = document.createDocumentFragment();
			const label = document.createElement("span");
			label.textContent = this.label;
			result.appendChild(label);
			result.appendChild(this.createSlot());
			return result;
		},
	};
}
RowGroup.register("n-row-group");

RowGroup.css = {
	":host": {
		"grid-row": "var(--row-group)",
		"> span": {
			"grid-column": "row-label",
			"writing-mode": "sideways-lr",
			"align-self": "end",
			"justify-self": "end",
			"padding": "0.2em",
			"overflow": "hidden",
		}
	},
	"slot": {
		"grid-template": "subgrid / subgrid",
		"grid-column": "header / sheet"
	}
};

export default RowGroup;