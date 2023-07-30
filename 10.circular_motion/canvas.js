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

function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
        return colors[Math.floor(Math.random() * colors.length)];
}

class Particle {
        constructor(x, y, radius, color) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color = color;
                this.radians = Math.random() * Math.PI * 2;
                this.velocity = 0.05;
                this.distanceFromCenter = randomIntFromRange(50, 120);
                this.lastMouse = { x: x, y: y };
        }

        update() {
                const lastPoints = { x: this.x, y: this.y };
                this.radians += this.velocity;

                this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
                this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

                this.x = this.lastMouse.x - Math.cos(this.radians) * this.distanceFromCenter;
                this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
                this.draw(lastPoints);
        }

        draw(lastPoints) {
                c.beginPath();
                // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                // c.fillStyle = this.color;
                // c.fill();
                c.strokeStyle = this.color;
                c.lineWidth = this.radius;
                c.moveTo(lastPoints.x, lastPoints.y);
                c.lineTo(this.x, this.y);
                c.stroke();
                c.closePath();
        }
}

let particles;
function init() {
        particles = [];
        for (let i = 0; i < 100; i++) {
                const radius = randomIntFromRange(1, 3);
                const color = randomColor(COLOR_ARRAY);
                particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, color));
        }
}

function animate() {
        requestAnimationFrame(animate);
        c.fillStyle = "rgba(255,255,255,0.05)";
        c.fillRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle) => {
                particle.update();
        });
}
