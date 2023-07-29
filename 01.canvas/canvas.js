// console.log("i like canvas");
const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//context
const c = canvas.getContext("2d");

c.fillRect(100, 100, 100, 100);
c.fillRect(200, 100, 100, 100);
c.fillRect(300, 300, 100, 100);
console.log(canvas);
