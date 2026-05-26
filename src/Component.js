export class Component extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}
	static get observedAttributes() {
		console.log(321);
		
		return [];
	}
	static register(name) {
		customElements.define(name, this);
	}
	fill(json, extra = {}) {
		Object.entries(json).forEach(([name, value]) => {
			if (this.fillable.includes(name)) {
				this[name] = value;
			} else {
				console.warn(`Unknown property "${name}" with value "${value}" in component "${this.constructor.name}"`);
			}
		});
		
		for (var name in extra) {
			this[name] = extra[name];
		}
		return this;
	}
}

export default Component;