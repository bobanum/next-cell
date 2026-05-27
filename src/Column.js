import Component from "./Component.js";

export class Column extends Component {
	fillable = ["id", "label", "type", "formula", "readOnly", "value"];
	constructor() {
		super();
		this.shadowRoot.appendChild(this.dom.style());
	}
	connectedCallback() {
		this.shadowRoot.appendChild(this.dom.main());
	}
	dom = {
		style: () => {
			const result = document.createElement("style");
			result.textContent = Column.css;
			return result;
		},
		main: () => {
			const result = document.createDocumentFragment();
			const label = document.createElement("span");
			label.textContent = this.label;
			result.appendChild(label);
			return result;
		}
	};
}
Column.register("n-column");

Column.css = `:host {
	display: block;
}`;
export default Column;