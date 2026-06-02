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
			"display": "grid",
			"align-items": "center",
			"justify-items": "center",
			"grid-area": "1 / 1 / -1 / -1",
			"overflow": "hidden",
			"background": "rgba(0, 128, 0, 0.2)",
			"text-overflow": "ellipsis",
			"box-sizing": "border-box",
			"text-align": "center",
			"padding": "0.2em",
			"&:empty": {
				"display": "none",
			}
		}
	},
	"slot": {
		"display": "grid",
		"background": "rgba(0, 128, 0, 0.2)",
		"grid-template": "subgrid / subgrid",
		"grid-area": "1 / 1 / -1 / -1",
		"border": "1px solid rgba(0, 128, 0, 0.2)",
	}
};

export default Group;