const gui = new dat.GUI();

// console.log("i like canvas");
const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext("2d");

window.addEventListener("resize", () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
});
const wave = {
        y: canvas.height / 2,
        length: 0.01,
        amplitude: 100,
        frequency: 0.01,
};

const strokeColor = {
        h: 200,
        s: 50,
        l: 50,
};

const backgroundColor = {
        r: 0,
        g: 0,
        b: 0,
        a: 0.01,
};

const waveFoler = gui.addFolder("wave");
waveFoler.add(wave, "y", 0, canvas.height);
waveFoler.add(wave, "length", -0.01, 0.01);
waveFoler.add(wave, "amplitude", -300, 300);
waveFoler.add(wave, "frequency", -0.01, 1);
waveFoler.open();

const strokeFolder = gui.addFolder("stroke");
strokeFolder.add(strokeColor, "h", 0, 255);
strokeFolder.add(strokeColor, "s", 0, 100);
strokeFolder.add(strokeColor, "l", 0, 100);
strokeFolder.open();

const backgroundFolder = gui.addFolder("background");
backgroundFolder.add(backgroundColor, "r", 0, 255);
backgroundFolder.add(backgroundColor, "g", 0, 255);
backgroundFolder.add(backgroundColor, "b", 0, 255);
backgroundFolder.add(backgroundColor, "a", 0, 1);
backgroundFolder.open();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let increment = wave.frequency;

function animate() {
        requestAnimationFrame(animate);
        c.fillStyle = `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`;
        c.fillRect(0, 0, canvas.width, canvas.height);
        c.beginPath();
        c.moveTo(0, canvas.height / 2);

        for (let i = 0; i < canvas.width; i++) {
                c.lineTo(i, wave.y + ((Math.sin(i * wave.length + increment) * wave.amplitude) / i) * 100);
        }
        c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))},${strokeColor.s}%,${strokeColor.l}%)`;
        c.stroke();
        increment += wave.frequency;
}

animate();

/*
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

        c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
}
*/
