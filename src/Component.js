export class Component extends HTMLElement {
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
	static get css() {
		return this._css;
	}
	static set css(value) {
		if (typeof value !== "string") {
			value = this.cssToString(value);
		}
		this._css = value;
	}
	static cssToString(css, prefix) {
		let result = JSON.stringify(css, null, "\t")
			.replaceAll(/"([^"]+)":\s*/g, '$1:')
			.replaceAll(/"([^"]+)",?\n/g, '$1;\n')
			.replaceAll(/,\n/g, ';\n')
			.replaceAll(/:\s*{/g, '{')
			.replaceAll(/};/g, '}')
			.replaceAll(/\n\t*/g, '')
			;
		if (prefix) {
			return prefix + result;
		}
		return result
			.replace(/^{\s*/gm, "")
			.replace(/\s*}$/gm, "")
			;
	}
}

export default Component;