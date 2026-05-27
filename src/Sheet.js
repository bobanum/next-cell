import { ColGroup } from "./ColGroup.js";
import { Component } from "./Component.js";

export class Sheet extends Component {
	fillable = ["id", "name", "columns", "rows", "data"];
	constructor() {
		super();
		this._columns = {};
		this._rows = {};
		this._data = {};
		
		this.shadowRoot.appendChild(this.dom.style());
	}
	connectedCallback() {
		this.shadowRoot.appendChild(this.dom.main());
		this.style.gridTemplateColumns = this.gridTemplateColumns();
		console.log(this.style.gridTemplateColumns);
		
	}
	get columns() {
		return this._columns;
	}
	set columns(value) {
		this._columns = {};
		for (const [id, colGroup] of Object.entries(value)) {
			this.addColGroup(colGroup, id);
		}
	}
	addColGroup(colGroup, id) {
		id = colGroup.id || id;
		this._columns[id] = ColGroup.fromJson(colGroup, { id, sheet: this });
		this.appendChild(this._columns[id]);
	}
	static fromJson(json, extra = {}) {
		var result = new this();

		result.fill(json, extra);
		return result;
	}
	gridTemplateColumns() {
		const result = {
			sheet: {
				"row-label": "var(--col-size)",
				"header": "repeat(3, var(--col-size))",
				"body": {
					"e1": "repeat(3, var(--col-size))",
					"e2": "repeat(2, var(--col-size))",
				},
				"footer": "repeat(3, var(--col-size))",
			}
		};
		function part(data, track) {
			const result = [];
			if (typeof data === "object") {
				data = Object.entries(data).map(([track, data]) => part(data, track)).join(" ");
			} else {
				data = `] ${data} [`;
			}
			if (track) {
				return `${track}-start ${data} ${track}-end`;
			}
			return data;
		}
		return "[ " + part(result) + " ]";
	}
	dom = {
		style: () => {
			const result = document.createElement("style");
			result.textContent = Sheet.css;
			return result;
		},
		main: () => {
			const result = document.createDocumentFragment();
			const colGroupSlot = document.createElement("slot");
			colGroupSlot.name = "colGroups";
			result.appendChild(colGroupSlot);
			return result;
		}
	};
}
Sheet.register("n-sheet");

Sheet.css = `
:host {
	--row-size: 1.6em;
	--col-size: minmax(1em,auto);
	--gap: 5px;
	display: grid;
	grid-template-columns: [sheet-start row-label-start] var(--col-size) [row-label-end header-start] repeat(3, var(--col-size)) [header-end body-start e1-start] repeat(3, var(--col-size)) [e1-end e2-start] repeat(2, var(--col-size)) [e2-end body-end footer-start] repeat(3, var(--col-size)) [footer-end sheet-end];
	grid-template-rows: [sheet-start col-label-start] var(--row-size) [col-label-end header-start] repeat(2, var(--row-size)) [header-end body-start g1-start] repeat(3, var(--row-size)) [g1-end g2-start] repeat(2, var(--row-size)) [g2-end body-end footer-start] repeat(3, var(--row-size)) [footer-end sheet-end];
	justify-content: center;
	gap: var(--gap);
	padding: var(--gap);
	line-height: 1;
	border:solid red;
}`;

export default Sheet;