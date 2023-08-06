import { c } from "./index.js";

export class Boundary {
        static width = 40;
        static height = 40;
        constructor({ position, symbol }) {
                this.position = position;
                this.symbol = symbol;
                this.width = 40;
                this.height = 40;
        }

        draw() {
                if (this.symbol == "-") {
                        c.fillStyle = "green";
                        c.fillRect(this.position.x, this.position.y, this.width, this.height);
                }
        }
}
