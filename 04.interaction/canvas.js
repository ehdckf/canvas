// console.log("i like canvas");
const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

const mouse = {
        x: undefined,
        y: undefined,
};
const MAX_RADIUS = 40;
const MIN_RADIUS = 2;
const COLOR_ARRAY = ["#D9C0B4", "#A65D37", "#733531", "#57805B", "#50A637"];

window.addEventListener("mousemove", (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
});
window.addEventListener("DOMContentLoaded", () => {
        init();
        animate();
});

window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
});

class Circle {
        constructor(x, y, dx, dy, radius) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.radius = radius;
                this.minRadius = radius;
                this.color =
                        COLOR_ARRAY[
                                Math.floor(
                                        (Math.random() * 100) %
                                                COLOR_ARRAY.length,
                                )
                        ];
        }

        draw() {
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                c.fillStyle = this.color;
                c.fill();
        }

        update() {
                if (
                        this.x + this.radius > innerWidth ||
                        this.x - this.radius < 0
                ) {
                        this.dx = -this.dx;
                }
                if (
                        this.y + this.radius > innerHeight ||
                        this.y - this.radius < 0
                ) {
                        this.dy = -this.dy;
                }
                this.x += this.dx; // velocity
                this.y += this.dy;

                //interactivity
                if (
                        mouse.x - this.x < 50 &&
                        mouse.x - this.x > -50 &&
                        mouse.y - this.y < 50 &&
                        mouse.y - this.y > -50 &&
                        this.radius < MAX_RADIUS
                ) {
                        this.radius += 1;
                } else if (this.radius > this.minRadius) {
                        this.radius -= 1;
                }

                this.draw();
        }
}

const circleArray = [];
function init() {
        circleArray.splice(0, circleArray.length);
        for (let i = 0; i < 2000; i++) {
                const radius = Math.random() * 3 + 1;
                const x = Math.random() * (innerWidth - radius * 2) + radius;
                const y = Math.random() * (innerHeight - radius * 2) + radius;
                const dx = (Math.random() - 0.5) * 4;
                const dy = (Math.random() - 0.5) * 4;
                circleArray.push(new Circle(x, y, dx, dy, radius));
        }
}

function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, innerWidth, innerHeight); // 전체 화면 지우기
        circleArray.forEach((v) => v.update());
}
