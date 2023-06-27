import startTalk from "./speech.js";
import Aircraft from "./aircraft.js";
   
     
const aviao1 = new Aircraft(10,10, 1,1,5);

const canvas = document.querySelector('#myCanvas');

const ctx = canvas.getContext('2d');

function drawVectors(ctx,canvas){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(
        aviao1.x,
        aviao1.y,
        5, 0, 2*Math.PI
        );
        ctx.fill();
} 

drawVectors(ctx,canvas);
setInterval(() => {
    aviao1.move();
    drawVectors(ctx,canvas);
}, 3000);


