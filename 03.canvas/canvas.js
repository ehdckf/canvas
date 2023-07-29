// console.log("i like canvas");
const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

class Circle {
        constructor(x, y, dx, dy, radius) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.radius = radius;
        }

        draw() {
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                c.strokeStyle = "blue";
                c.stroke();
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
                this.draw();
        }
}

const circleArray = [];
for (let i = 0; i < 200; i++) {
        const radius = 30;
        const x = Math.random() * (innerWidth - radius * 2) + radius;
        const y = Math.random() * (innerHeight - radius * 2) + radius;
        const dx = (Math.random() - 0.5) * 4;
        const dy = (Math.random() - 0.5) * 4;
        circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, innerWidth, innerHeight); // 전체 화면 지우기
        circleArray.forEach((v) => v.update());
}

animate();
