const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Boundary {
        static width = 40;
        static height = 40;

        constructor({ position }) {
                this.position = position;
                this.width = 40;
                this.height = 40;
        }

        draw() {
                c.fillStyle = "green";
                c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
}

class Player {
        constructor({ position, velocity }) {
                this.position = position;
                this.velocity = velocity;

                this.radius = 10;
        }

        draw() {
                c.beginPath();
                c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
                c.fillStyle = "yellow";
                c.fill();
                c.closePath();
        }

        update() {
                this.draw();
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
        }
}

const boundaries = [];
const player = new Player({
        position: { x: Boundary.width * 1.5, y: Boundary.height * 1.5 },
        velocity: { x: 0, y: 0 },
});

const keys = {
        w: {
                pressed: false,
        },
        a: {
                pressed: false,
        },
        s: {
                pressed: false,
        },
        d: {
                pressed: false,
        },
};

let lastKey;
const map = [
        ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["-", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
        ["-", " ", "-", "-", "-", " ", "-", "-", " ", "-"],
        ["-", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
        ["-", " ", "-", "-", "-", " ", "-", "-", " ", "-"],
        ["-", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
        ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
                const symbol = map[i][j];
                if (symbol === "-") {
                        boundaries.push(
                                new Boundary({
                                        position: {
                                                x: Boundary.width * j,
                                                y: Boundary.height * i,
                                        },
                                }),
                        );
                }
        }
}

player.draw();

function circleCollidesWithRectangle({ circle, rectangle }) {
        return (
                circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
                circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
                circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
                circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width
        );
}

function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        if (keys.w.pressed && lastKey === "w") {
                for (let i = 0; i < boundaries.length; i++) {
                        const boundary = boundaries[i];
                        if (
                                circleCollidesWithRectangle({
                                        circle: {
                                                ...player,
                                                velocity: {
                                                        x: 0,
                                                        y: -5,
                                                },
                                        },
                                        rectangle: boundary,
                                })
                        ) {
                                player.velocity.y = 0;
                                break;
                        } else {
                                player.velocity.y = -5;
                        }
                }
        } else if (keys.a.pressed && lastKey === "a") {
                for (let i = 0; i < boundaries.length; i++) {
                        const boundary = boundaries[i];
                        if (
                                circleCollidesWithRectangle({
                                        circle: {
                                                ...player,
                                                velocity: {
                                                        x: -5,
                                                        y: 0,
                                                },
                                        },
                                        rectangle: boundary,
                                })
                        ) {
                                player.velocity.x = 0;
                                break;
                        } else {
                                player.velocity.x = -5;
                        }
                }
        } else if (keys.s.pressed && lastKey === "s") {
                for (let i = 0; i < boundaries.length; i++) {
                        const boundary = boundaries[i];
                        if (
                                circleCollidesWithRectangle({
                                        circle: {
                                                ...player,
                                                velocity: {
                                                        x: 0,
                                                        y: 5,
                                                },
                                        },
                                        rectangle: boundary,
                                })
                        ) {
                                player.velocity.y = 0;
                                break;
                        } else {
                                player.velocity.y = 5;
                        }
                }
        } else if (keys.d.pressed && lastKey === "d") {
                for (let i = 0; i < boundaries.length; i++) {
                        const boundary = boundaries[i];
                        if (
                                circleCollidesWithRectangle({
                                        circle: {
                                                ...player,
                                                velocity: {
                                                        x: 5,
                                                        y: 0,
                                                },
                                        },
                                        rectangle: boundary,
                                })
                        ) {
                                player.velocity.x = 0;
                                break;
                        } else {
                                player.velocity.x = 5;
                        }
                }
        }
        boundaries.forEach((boundary) => {
                boundary.draw();
                if (circleCollidesWithRectangle({ circle: player, rectangle: boundary })) {
                        player.velocity.x = 0;
                        player.velocity.y = 0;
                }
        });
        player.update();
        player.velocity.x = 0;
        player.velocity.y = 0;
}
animate();

addEventListener("keydown", ({ key }) => {
        switch (key) {
                case "w":
                        keys.w.pressed = true;

                        break;
                case "a":
                        keys.a.pressed = true;

                        break;
                case "s":
                        keys.s.pressed = true;

                        break;
                case "d":
                        keys.d.pressed = true;

                        break;
        }
        lastKey = key;
});

addEventListener("keyup", ({ key }) => {
        switch (key) {
                case "w":
                        keys.w.pressed = false;
                        break;
                case "a":
                        keys.a.pressed = false;
                        break;
                case "s":
                        keys.s.pressed = false;
                        break;
                case "d":
                        keys.d.pressed = false;

                        break;
        }
});
