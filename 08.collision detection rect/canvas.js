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

function init() {}

function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);

        if (
                mouse.x + 100 >= canvas.width / 2 - 50 &&
                mouse.x <= canvas.width / 2 + 50 &&
                mouse.y + 100 >= canvas.height / 2 - 50 &&
                mouse.y <= canvas.height / 2 + 50
        ) {
                console.log("colliding");
        }
        c.fillStyle = "#E86262";
        c.fillRect(mouse.x, mouse.y, 100, 100);

        c.fillStyle = "#92ABEA";
        c.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100);
}
