import Component from "./Component.js";

export class Group extends Component {
	fillable = ["id", "label", "items", "layout"];
	constructor() {
		super();
		this._items = {};
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

Group.css = {
	":host": {
		"display": "grid",
		"grid-template": "subgrid / subgrid",
		"grid-area": "sheet",
		"> span": {
			"grid-area": "1 / 1 / -1 / -1",
			"overflow": "hidden",
			"background": "rgba(0, 128, 0, 0.2)",
		}
	},
	"slot": {
		"display": "grid",
		"background": "rgba(0, 128, 0, 0.2)",
		"grid-template": "subgrid / subgrid",
		"grid-area": "1 / 1 / -1 / -1",
	}
};

export default Group;