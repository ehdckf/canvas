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

function getDistance(x1, y1, x2, y2) {
        const xDistance = x1 - x2;
        const yDistance = y1 - y2;
        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function rotate(velocity, angle) {
        const rotateVelocities = {
                x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
                y: velocity.x * Math.sign(angle) + velocity.y * Math.cos(angle),
        };

        return rotateVelocities;
}

// One-dimensional Newtonian

function resolveCollision(particle, otherParticle) {
        const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
        const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

        const xDist = otherParticle.x - particle.x;
        const yDist = otherParticle.y - particle.y;

        //Prevent accidental overlap of particles
        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
                // Grab angle between the two of particles
                const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

                // Store mass in var for better readability in collision equation
                const m1 = particle.mass;
                const m2 = otherParticle.mass;

                // velocity before equation
                const u1 = rotate(particle.velocity, angle);
                const u2 = rotate(otherParticle.velocity, angle);

                // Velocity after 1d collision equation
                const v1 = {
                        x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
                        y: u1.y,
                };

                const v2 = {
                        x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
                        y: u2.y,
                };

                // Final velocity after rotating axis back to original location
                const vFinal1 = rotate(v1, -angle);
                const vFinal2 = rotate(v2, -angle);

                // Swap particle velocities for realistic bounce effect
                particle.velocity.x = vFinal1.x;
                particle.velocity.y = vFinal1.y;

                otherParticle.velocity.x = vFinal2.x;
                otherParticle.velocity.y = vFinal2.y;
        }
}

class Particle {
        constructor(x, y, radius, color) {
                this.x = x;
                this.y = y;
                this.velocity = { x: (Math.random() - 0.5) * 5, y: (Math.random() - 0.5) * 5 };
                this.radius = radius;
                this.color = color;
                this.mass = 1;
        }

        update(particles) {
                this.draw();
                for (let i = 0; i < particles.length; i++) {
                        if (this === particles[i]) continue;
                        if (getDistance(this.x, this.y, particles[i].x, particles[i].y) < this.radius * 2) {
                                resolveCollision(this, particles[i]);
                        }
                }

                if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
                        this.velocity.x = -this.velocity.x;
                }
                if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
                        this.velocity.y = -this.velocity.y;
                }

                this.x += this.velocity.x;
                this.y += this.velocity.y;
        }

        draw() {
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                c.strokeStyle = this.color;
                c.stroke();
                c.closePath();
        }
}

const particles = [];

function init() {
        const radius = 15;
        for (let i = 0; i < 100; i++) {
                let x = randomIntFromRange(radius, canvas.width - radius);
                let y = randomIntFromRange(radius, canvas.height - radius);
                const color = randomColor(COLOR_ARRAY);

                if (i !== 0) {
                        for (let j = 0; j < particles.length; j++) {
                                if (getDistance(x, y, particles[j].x, particles[j].y) < radius * 2) {
                                        x = randomIntFromRange(radius, canvas.width - radius);
                                        y = randomIntFromRange(radius, canvas.height - radius);
                                        j = -1;
                                }
                        }
                }

                particles.push(new Particle(x, y, radius, color));
        }
}

function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle) => particle.update(particles));
}
