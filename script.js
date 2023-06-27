import Aircraft from "./aircraft.js";

const aircrafts = [
  new Aircraft(10, 10, 0.5, 0.1, 0, "AB123"),
  new Aircraft(50, 50, -0.5, 0.5, 0, "CD456"),
  new Aircraft(100, 100, -0.5, 0.5, 0, "EF789"),
  new Aircraft(200, 200, 2.5, 2.5, 0, "GH012"),
  // Adicione mais instâncias de Aircraft conforme necessário
];

const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');

function drawAircraft(ctx, aircraft) {
  // Desenha o rastro do avião com base nas posições passadas
  ctx.beginPath();
  aircraft.positions.forEach((position, index) => {
    // Desenha o rastro apenas a cada 3 segundos
    if (index % 90 === 0) {
      const alpha = (index + 1) / (aircraft.positions.length + 1);
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      ctx.arc(position.x, position.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  });

  // Desenha o vetor mostrando a posição até 9 minutos à frente
  const futurePosition = {
    x: aircraft.x + aircraft.velX * 1 * 60, // 1 minuto = 1 * 60 segundos
    y: aircraft.y + aircraft.velY * 1 * 60,
  };
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.moveTo(aircraft.x, aircraft.y);
  ctx.lineTo(futurePosition.x, futurePosition.y);
  ctx.stroke();

  // Desenha o avião como um círculo vazio com um X no meio
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.arc(aircraft.x, aircraft.y, 10, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.moveTo(aircraft.x - 7, aircraft.y - 7);
  ctx.lineTo(aircraft.x + 7, aircraft.y + 7);
  ctx.moveTo(aircraft.x - 7, aircraft.y + 7);
  ctx.lineTo(aircraft.x + 7, aircraft.y - 7);
  ctx.stroke();

  // Desenha a callsign do avião
  ctx.font = '12px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(aircraft.callsign, aircraft.x + 12, aircraft.y + 4);
}

function drawAllAircrafts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  aircrafts.forEach((aircraft) => {
    drawAircraft(ctx, aircraft);
  });
}

function moveAllAircrafts() {
  aircrafts.forEach((aircraft) => {
    aircraft.move();
  });
}

function animate() {
  moveAllAircrafts();
  drawAllAircrafts();
  setTimeout(animate, 3000); // Atualiza a cada 3 segundos
}

animate();
