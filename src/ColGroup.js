import Column from "./Column.js";
import Component from "./Component.js";
import Group from "./Group.js";

export class ColGroup extends Group {
	_label = "";
	_items = {};
	_bodies = [];
	constructor() {
		super();
		this.shadowRoot.appendChild(this.dom.style());
		this.slot = "colGroups";
	}
	connectedCallback() {
		this.shadowRoot.appendChild(this.dom.main());
	}
	addItem(item, id) {
		// console.log(item);
		const itemElement = new Column().fill(item, { id, group: this, sheet: this.sheet });
		this._items[id] = itemElement;
		this.appendChild(itemElement);
	}
	// get label() {
	// 	return this._label;
	// }
	get id() {
		return this._id;
	}
	set id(value) {
		// console.log(value);
		this._label = value;
		this._id = value;
		this.style.setProperty("--col-group", value);
	}
	get bodies() {
		return this._bodies;
	}
	set bodies(value) {
		// for (var id in this._bodies) {
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
			label.style.gridRow = "col-label";
			result.appendChild(label);
			result.appendChild(document.createElement("slot"));
			return result;
		},

	};
}
ColGroup.register("n-col-group");

ColGroup.css = {
	":host": {
		"display": "grid",
		"grid-template": "subgrid / subgrid",
		"border": "3px solid green",
		"background": "rgba(0, 128, 0, 0.2)",
		"grid-row": "sheet",
		"line-height": 1,
		"grid-column": "var(--col-group)",
		"> span": {
			"grid-row": "col-label",
			"grid-column": "1 / -1",
			"border": "1px solid red"
		}
	},
	"slot": {
		"display": "grid",
		"grid-template": "subgrid / subgrid",
		"grid-column": "1 / -1",
		"grid-row": "header / sheet"
	}
};

export default ColGroup;