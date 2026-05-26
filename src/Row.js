import Component from "./Component.js";

export class Row extends Component {

}
Row.register("n-row");

Row.css = `
:host {
	display: block;
}`;

export default Row;