// console.log("i like canvas");
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const COLOR_ARRAY = ["#D9C0B4", "#A65D37", "#733531", "#57805B", "#50A637"];

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

function getDistance(x1, y1, x2, y2) {
        const xDistance = x1 - x2;
        const yDistance = y1 - y2;
        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

class Star {
        constructor(x, y, radius, color) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color = color;
        }
}

Star.prototype.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
};

Star.prototype.update = () => {
        this.draw();
};

let stars;
function init() {
        stars = [];
        for (let i = 0; i < 1; i++) {
                stars;
        }
}

function animate() {
        requestAnimationFrame(animate);

        c.clearRect(0, 0, canvas.width, canvas.height);
}
