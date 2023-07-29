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

class Object {
        constructor(x, y, radius, color) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color = color;
        }

        update() {
                this.draw();
        }

        draw() {
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                c.fillStyle = this.color;
                c.fill();
                c.closePath();
        }
}

function init() {}

function animate() {
        requestAnimationFrame(animate);

        c.clearRect(0, 0, canvas.width, canvas.height);

        c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
}
