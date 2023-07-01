import { canvas, context, drawAllAircrafts } from './canvarenderer.js';

export function mostrarCursor(x, y) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawAllAircrafts();
    var arrowSize = 20;
    var arrowAngle = 5; // Ângulo de 45 graus
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x - arrowSize * Math.cos(arrowAngle), y - arrowSize * Math.sin(arrowAngle));
    context.lineTo(x - arrowSize * Math.sin(arrowAngle), y + arrowSize * Math.cos(arrowAngle));
    context.lineTo(x, y);
    context.fillStyle = 'black';
    context.fill();
    context.closePath();
}