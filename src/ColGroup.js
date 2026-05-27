import Column from "./Column.js";
import Component from "./Component.js";
import Group from "./Group.js";

export class ColGroup extends Group {
	label = "";
	_items = {};
	constructor() {
		super();
		// this.shadowRoot.appendChild(this.dom.style());
		this.slot = "colGroups";
		this.style.border = "2px solid green";
		this.style.gridRow = `header / -1`;
		this.style.gridColumn = "var(--col-group)";
	}
	connectedCallback() {
		this.shadowRoot.appendChild(this.dom.main());
	}
	addItem(item, id) {
		console.log(item);
		const itemElement = new Column().fill(item, { id, group: this, sheet: this.sheet });
		this._items[id] = itemElement;
		this.appendChild(itemElement);
	}
	get id() {
		return this._id;
	}
	set id(value) {
		console.log(value);
		
		this._id = value;
		this.style.setProperty("--col-group", value);
	}
	dom = {
		style: () => {
			const result = document.createElement("style");
			result.textContent = ColGroup.css;
			return result;
		},
		main: () => {
			const result = document.createDocumentFragment();
			const label = document.createElement("span");
			label.textContent = this.label;
			result.appendChild(label);
			result.appendChild(document.createElement("slot"));
			return result;
		},

	}
}
ColGroup.register("n-col-group");

ColGroup.css = `
:host {
display: grid;
		grid-template: subgrid / subgrid;
		grid-area: 1 / 1 / -1 / -1;
		border: 1px solid blue;}`;
export default ColGroup;