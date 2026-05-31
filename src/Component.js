export class Component extends HTMLElement {
	static _css = "component { display: block; }";
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}
	static get observedAttributes() {
		return [];
	}
	static register(name) {
		customElements.define(name, this);
	}
	fill(json, extra = {}) {
		const entries = (Array.isArray(json)) ? json : Object.entries(json);

		for (let [name, value] of entries) {
			if (this.fillable.includes(name)) {
				this[name] = value;
			} else if (name[0] === "_" && this.fillable.includes(name.slice(1))) {
				this[name.slice(1)] = value;
			} else {
				console.warn(`Unknown property "${name}" with value "${value}" in component "${this.constructor.name}"`);
			}
		}

		for (var name in extra) {
			this[name] = extra[name];
		}
		return this;
	}
	static fromJson(json, extra = {}) {
		var result = new this();
		result.fill(json, extra);
		return result;
	}
	get css() {
		return this.constructor.css;
	}
	set css(value) {
		this.constructor.css = value;
	}
	static get css() {
		return this._css || "";
	}
	static set css(value) {	
		if (typeof value !== "string") {
			value = this.renderCSS(value);
		}
		this._css = (this.__proto__._css || "") + value;
	}
	createSlot(name) {
		const slot = document.createElement("slot");
		if (name) {
			slot.name = name;
		}
		return slot;
	}
	static renderCSS(css, prefix) {
		if (typeof css !== "object") {
			return css;
		}
		const result = Object.entries(css).map(([key, val]) => {
			if (typeof val === "object") {
				return this.renderCSS(val, key);
			} else {
				return `${key}: ${val};`;
			}
		}).join("");
		if (prefix) {
			return `${prefix} { ${result} }`;
		}
		return result;
	}
}

export default Component;