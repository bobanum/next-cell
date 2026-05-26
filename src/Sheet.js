import { Component } from "./Component.js";

export class Sheet extends Component {
	fillable = ["id", "name", "columns", "rows", "data"];
	constructor() {
		super();
		this._columns = {};
		this._rows = {};
		this._data = {};
	}
	
	static fromJson(json, extra = {}) {
		var result = new this();
		
		result.fill(json, extra);
		return result;
	}
	dom = {
		main: () => {
			const result = document.createDocumentFragment();
			result.textContent = this.name;
			return result;
		}
	};
}
Sheet.register("n-sheet");

Sheet.css = `
:host {
	display: block;
}`;

export default Sheet;