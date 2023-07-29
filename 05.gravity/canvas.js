// console.log("i like canvas");
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
        x: innerWidth / 2,
        y: innerHeight / 2,
};

const COLOR_ARRAY = ["#D9C0B4", "#A65D37", "#733531", "#57805B", "#50A637"];

const GRAVITY = 1;
const fricton = 0.9;
window.addEventListener("mousemove", (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
});

window.addEventListener("DOMContentLoaded", () => {
        init();
        animate();
});

window.addEventListener("resize", () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
});

window.addEventListener("click", () => {
        init();
});

function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
        return colors[Math.floor(Math.random() * colors.length)];
}

class Ball {
        constructor(x, y, dx, dy, radius, color) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.radius = radius;
                this.color = color;
        }

        update() {
                if (this.y + this.radius + this.dy > canvas.height) {
                        this.dy = -this.dy * fricton;
                } else {
                        this.dy += GRAVITY;
                }

                if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
                        this.dx = -this.dx;
                }
                this.x += this.dx;
                this.y += this.dy;
                this.draw();
        }

        draw() {
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                c.fillStyle = this.color;
                c.fill();
                c.stroke();
                c.closePath();
        }
}

// Implementation
const ballArray = [];
function init() {
        ballArray.splice(0, 200);
        for (let i = 0; i < 200; i++) {
                const radius = randomIntFromRange(8, 20);
                const x = randomIntFromRange(radius, canvas.width - radius);
                const y = randomIntFromRange(radius, canvas.height - radius);
                const dx = randomIntFromRange(-2, 2);
                const dy = randomIntFromRange(-2, 2);
                const color = randomColor(COLOR_ARRAY);
                ballArray.push(new Ball(x, y, dx, dy, radius, color));
        }
}

// Animation Loop
function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        ballArray.forEach((ball) => ball.update());
}
