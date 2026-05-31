import Slice from "./Slice.js";

export class Column extends Slice {
	fillable = ["id", "label", "type", "formula", "readOnly", "value", "validation"];
	constructor() {
		super();
		this.shadowRoot.appendChild(this.dom.style());
	}
	connectedCallback() {
		this.shadowRoot.appendChild(this.dom.main());
	}
	zzzdom = {
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
			console.log(123);
			
			return result;
		}
	};
}
Column.register("n-column");

Column.css = {
	":host": {
		"grid-column": "auto",
	}
};
export default Column;