import { c } from "./index.js";
export class Player {
        constructor({ position, velocity }) {
                this.position = position;
                this.velocity = {
                        x: 0,
                        y: 0,
                };
                this.radius = 10;
        }

        draw() {
                c.beginPath();
                c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
                c.fillStyle = "yellow";
                c.fill();
                c.closePath();
        }

        update() {
                this.draw();
                // console.log(this.velocity.x, this.velocity.y);

                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
        }
}
