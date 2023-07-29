// console.log("i like canvas");
const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//context <- 붓
const c = canvas.getContext("2d");

//Rect
c.fillStyle = "rgba(255, 0, 0, 0.5)"; // 도형 색 변경  // 바꾸고 칠해야함. 물감 찍기
c.fillRect(100, 100, 100, 100);
c.fillStyle = "rgba(0, 255, 0, 0.5)";
c.fillRect(400, 100, 100, 100);
c.fillStyle = "rgba(0, 0, 255, 0.5)";
c.fillRect(300, 300, 100, 100);
console.log(canvas);

//Line
c.beginPath();
c.moveTo(50, 300); // 붓 시작점.
c.lineTo(300, 100); //  이동
c.lineTo(400, 300); // 이동
c.strokeStyle = "magenta"; // 붓 색 바꾸기
c.stroke(); // 선 칠하기

//Arc / Circle
c.beginPath(); // 선 초기화  // 이걸 안하면 마지막 지점에서 이어져서 그려짐.
c.arc(300, 300, 30, 0, Math.PI * 2, false);
c.strokeStyle = "blue";
c.stroke();

for (let i = 0; i < 2400; i++) {
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        c.beginPath();
        c.arc(x, y, 30, 0, Math.PI * 2, false);
        c.strokeStyle = "blue";
        c.stroke();
}
