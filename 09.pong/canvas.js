const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("DOMContentLoaded", () => {
        animate();
});

// window.addEventListener("resize", () => {
//         canvas.width = innerWidth;
//         canvas.height = innerHeight;
//         animate();
// });
class Paddle {
        constructor({ position }) {
                this.position = position;
                this.velocity = { x: 0, y: 0 };
                this.width = 10;
                this.height = 100;
        }
        update() {
                this.draw();
                if (
                        this.position.y + this.velocity.y > 0 &&
                        this.position.y + this.velocity.y + this.height < canvas.height
                )
                        this.position.y += this.velocity.y;
        }

        draw() {
                c.fillStyle = "white";
                c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
}

class Ball {
        constructor({ position }) {
                this.position = position;
                const spead = 3;
                const direction = {
                        x: Math.random() - 0.5 >= 0 ? -spead : spead,
                        y: Math.random() - 0.5 >= 0 ? -spead : spead,
                };

                this.velocity = {
                        x: direction.x,
                        y: direction.y,
                };
                this.width = 10;
                this.height = 10;
        }

        draw() {
                c.fillStyle = "white";
                c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }

        update() {
                this.draw();

                const rightSide = this.position.x + this.width + this.velocity.x;
                const leftSide = this.position.x + this.velocity.x;
                const bottomSide = this.position.y + this.height;
                const topSide = this.position.y;

                //paddle 1 collision
                if (
                        leftSide <= paddle1.position.x + paddle1.width &&
                        bottomSide >= paddle1.position.y &&
                        topSide <= paddle1.position.y + paddle1.height
                ) {
                        this.velocity.x = -this.velocity.x;
                }

                // paddle 2 collision
                if (
                        rightSide >= paddle2.position.x &&
                        bottomSide >= paddle2.position.y &&
                        topSide <= paddle2.position.y + paddle2.height
                ) {
                        this.velocity.x = -this.velocity.x;
                }

                if (this.position.x == 0) {
                }

                // reverse y directions
                if (
                        // (this.position.x >= 0 &&
                        // this.position.x + this.width <= canvas.width )&&
                        this.position.y + this.height + this.velocity.y >= canvas.height ||
                        this.position.y + this.velocity.y <= 0
                ) {
                        this.velocity.y = -this.velocity.y;
                }
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
                console.log(this.position.x, this.position.y);
        }
}
const paddle1 = new Paddle({
        position: {
                x: 10,
                y: canvas.height / 2,
        },
});

const paddle2 = new Paddle({
        position: {
                x: canvas.width - 10 * 2,
                y: canvas.height / 2,
        },
});

const ball = new Ball({
        position: {
                x: canvas.width / 2,
                y: canvas.height / 2,
        },
});

addEventListener("keydown", (event) => {
        const paddleSpeed = 9;
        switch (event.key) {
                case "w":
                        paddle1.velocity.y = -paddleSpeed;
                        break;
                case "s":
                        paddle1.velocity.y = +paddleSpeed;
                        break;
                case "ArrowUp":
                        paddle2.velocity.y = -paddleSpeed;
                        break;
                case "ArrowDown":
                        paddle2.velocity.y = +paddleSpeed;
                        break;
        }
});

function animate() {
        requestAnimationFrame(animate);
        c.fillStyle = "black";
        c.fillRect(0, 0, canvas.width, canvas.height);
        paddle1.update();
        paddle2.update();
        ball.update();
}
