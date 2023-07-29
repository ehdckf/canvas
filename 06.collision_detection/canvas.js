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

function getDistanceCircles(circle1, circle2) {
        const xDistance = circle1.x - circle2.x;
        const yDistance = circle1.y - circle2.y;
        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

class Circle {
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

//Implemetation
let circle;
let circle2;
function init() {
        circle = new Circle(200, 400, 50, "cyan");
        circle2 = new Circle(400, 800, 30, "magenta");
}

function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        circle.update();
        circle2.x = mouse.x;
        circle2.y = mouse.y;
        circle2.update();
        const distance = getDistanceCircles(circle, circle2);
        if (distance < circle.radius + circle2.radius) {
                circle.color = "red";
        } else {
                circle.color = "black";
        }

        console.log(distance);
}
