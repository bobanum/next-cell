class App {
	static main() {
		this.w = 2000;
		this.h = 1000;
		this.fetch().then(data => {
			const graph = document.getElementById('graph');
			const entries = Object.entries(data).filter(([key, value]) => key.match(/^\d{4}-01-\d{2}$/)).map(([key, value]) => value);
			console.log(entries);
			const points = entries.map((value, index) => `${this.w * index / (entries.length - 1)},${this.h - (this.h * value / 167)}`).join(' ');
			console.log(points);
			const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
			polyline.setAttribute('points', points);
			polyline.setAttribute('fill', 'none');
			polyline.setAttribute('stroke', 'black');
			graph.appendChild(polyline);
			document.getElementById('y-axis').appendChild(this.yAxis(168));
			document.getElementById('x-axis').appendChild(this.xAxis(entries.length));
		});
	}
	static yAxis(max, min = 0, step = 1) {
		const points = [];
		for (let i = min; i <= max; i += step) {
			points.push(`M 0,${this.h * i / max} l -15,0`);
		}
		const result = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		result.setAttribute('d', points.join(' '));
		result.setAttribute('fill', 'transparent');
		result.setAttribute('stroke', 'black');
		result.setAttribute('stroke-width', '1');
		return result;
	}
	static xAxis(max, min = 0, step = 1) {
		const points = [];
		for (let i = min; i <= max; i += step) {
			points.push(`M ${this.w * i / max},0 l 0,${(i%10)*2}`);
		}
		const result = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		result.setAttribute('d', points.join(' '));
		result.setAttribute('fill', 'transparent');
		result.setAttribute('stroke', 'black');
		result.setAttribute('stroke-width', '1');
		return result;
	}
	static fetch() {
		return fetch('data.json').then(res => res.json());
	}
}
App.main();