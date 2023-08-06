import { Boundary } from "./Boundary.js";
import { Player } from "./Player.js";
import { map } from "./map.js";
const canvas = document.querySelector("canvas");
export const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let boundaries = [];
let player;
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
let lastKey = "";

addEventListener("DOMContentLoaded", init);
addEventListener("keydown", ({ key }) => {
        switch (key) {
                case "w":
                        keys.w.pressed = true;
                        lastKey = "w";
                        break;
                case "a":
                        keys.a.pressed = true;
                        lastKey = "a";
                        break;
                case "s":
                        keys.s.pressed = true;
                        lastKey = "s";
                        break;
                case "d":
                        keys.d.pressed = true;
                        lastKey = "d";
                        break;
        }
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

function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        boundaries.forEach((boundary) => {
                boundary.draw();
        });
        player.update();
        player.velocity.x = 0;
        player.velocity.y = 0;

        if (keys.w.pressed && lastKey === "w") {
                player.velocity.y = -5;
        } else if (keys.a.pressed && lastKey === "a") {
                player.velocity.x = -5;
        } else if (keys.s.pressed && lastKey === "s") {
                player.velocity.y = 5;
        } else if (keys.d.pressed && lastKey === "d") {
                player.velocity.x = 5;
        }
}

function init() {
        map.forEach((row, i) => {
                row.forEach((symbol, j) => {
                        boundaries.push(
                                new Boundary({
                                        position: {
                                                x: Boundary.width * j,
                                                y: Boundary.height * i,
                                        },
                                        symbol,
                                }),
                        );
                });
        });
        player = new Player({
                position: {
                        x: Boundary.width + Boundary.width / 2,
                        y: Boundary.height + Boundary.height / 2,
                },
        });
        animate();
}
