import Component from "./Component.js";

export class Group extends Component {
	fillable = ["id", "label", "items", "layout"];
	constructor() {
		super();
		this._items = {};
	}
	zzzfill(json, extra = {}) {
		var properties = Object.entries(json).filter(([name]) => name[0] === "_");
		super.fill(properties);
		var items = Object.entries(json).filter(([name]) => name[0] !== "_");
		for (const [name, value] of items) {
			this.addItem(value, name);
		}
		for (var name in extra) {
			this[name] = extra[name];
		}
		return this;
	}
	get items() {
		return this._items;
	}
	set items(value) {
		for (var name in this._items) {
			this._items[name].remove();
		}

		this._items = {};
		value.forEach(itemData => {
			this.addItem(itemData, itemData.id);
		});
	}
	addItem(item, id) {
		throw new Error(`Method "addItem" not implemented in class "${this.constructor.name}"`);
	}
}
Group.register("n-group");

Group.css = `
:host {
	display: block;
}`;

export default Group;