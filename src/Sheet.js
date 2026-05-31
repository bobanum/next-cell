import Component from "./Component.js";
import ColGroup from "./ColGroup.js";
import RowGroup from "./RowGroup.js";

export class Sheet extends Component {
	fillable = ["id", "title", "columns", "rows", "data"];
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
		this.style.gridTemplateRows = this.gridTemplateRows();
	}
	get columns() {
		return this._columns;
	}
	set columns(value) {
		if (value.header) {
			this.addColGroup(value.header, "header");
		}
		if (value.footer) {
			this.addColGroup(value.footer, "footer");
		}
		value.bodies.forEach((body, id) => {
			this.addColGroup(body, id);
		});
	}
	get rows() {
		return this._rows;
	}
	set rows(value) {
		console.log(value);
		if (value.header) {
			this.addRowGroup(value.header, "header");
		}
		if (value.footer) {
			this.addRowGroup(value.footer, "footer");
		}
		value.bodies.forEach((body, id) => {
			this.addRowGroup(body, id);
		});
	}
	addColGroup(colGroup, id) {
		id = colGroup.id || id;
		this._columns[id] = ColGroup.fromJson(colGroup, { id, parent:this, sheet: this });
		this.appendChild(this._columns[id]);
	}
	addRowGroup(rowGroup, id) {
		id = rowGroup.id || id;
		this._rows[id] = RowGroup.fromJson(rowGroup, { id, parent:this, sheet: this });
		this.appendChild(this._rows[id]);
	}
	static fromJson(json, extra = {}) {
		var result = new this();

		result.fill(json, extra);
		return result;
	}
	gridTemplateColumns() {
		const data = {
			sheet: {
				"row-label": "auto",
				"header": "repeat(3, var(--col-size))",
				"body": {
					"e1": "repeat(3, var(--col-size))",
					"e2": "repeat(2, var(--col-size))",
				},
				"footer": "repeat(3, var(--col-size))",
			}
		};
		return "[ " + this.track(data) + " ]";
	}
	gridTemplateRows() {
		const data = {
			sheet: {
				"col-label": "var(--row-size)",
				"header": "repeat(2, var(--row-size))",
				"body": {
					"g1": "repeat(3, var(--row-size))",
					"g2": "repeat(2, var(--row-size))",
				},
				"footer": "repeat(3, var(--row-size))",
			}
		};
		return "[ " + this.track(data) + " ]";
	}
	track(data, trackName) {
		const result = [];
		if (typeof data === "object") {
			data = Object.entries(data).map(([track, data]) => this.track(data, track)).join(" ");
		} else {
			data = `] ${data} [`;
		}
		if (trackName) {
			return `${trackName}-start ${data} ${trackName}-end`;
		}
		return data;
	}
	dom = {
		style: () => {
			const result = document.createElement("style");
			result.textContent = this.css;
			return result;
		},
		main: () => {
			const result = document.createDocumentFragment();
			result.appendChild(this.createSlot("colGroups"));
			result.appendChild(this.createSlot("rowGroups"));
			return result;
		}
	};
}
Sheet.register("n-sheet");

Sheet.css = {
	":host": {
		"--row-size": "1.6em",
		"--col-size": "minmax(3em,auto)",
		"--gap": "5px",
		"display": "grid",
		"justify-content": "center",
		"gap": "var(--gap)",
		"padding": "var(--gap)",
		"line-height": "1",
	}
};

export default Sheet;