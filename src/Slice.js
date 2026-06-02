import Component from "./Component.js";

export class Slice extends Component {
	fillable = ["id", "label", "type", "formula", "readOnly", "value", "validation"];
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
			result.textContent = this.css;
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
Slice.register("n-slice");

Slice.css = {
	":host": {
		"display": "grid",
		"grid-area": "1 / 1 / -1 / -1",
		"grid-template": "subgrid / subgrid",
		"border": "1px solidrgba(128, 0, 0, 0.1)",
	}
};
export default Slice;