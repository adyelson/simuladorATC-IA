import Aircraft from "./aircraft.js";

const aircrafts = [
  new Aircraft(10, 10, 0.5, 0.1, 0, "AB123", 35000, "SBKP", "SBSP"),
  new Aircraft(50, 50, -0.5, 0.5, 0, "CD456", 28000, "SBGR", "SBKP"),
  new Aircraft(100, 100, -0.5, 0.5, 0, "EF789", 32000, "SBRJ", "SBSP"),
  new Aircraft(200, 200, 2.5, 2.5, 0, "GH012", 40000, "SBSP", "SBGR"),
  // Adicione mais instâncias de Aircraft conforme necessário
];

const canvas = document.querySelector('#myCanvas');
const ctxAircraft = canvas.getContext('2d');
const ctxLabel = canvas.getContext('2d');

let selectedAircraft = null;
let offsetX = 0;
let offsetY = 0;

function drawAircraft(aircraft) {
  // Desenha o rastro do avião com base nas posições passadas
  ctxAircraft.beginPath();
  aircraft.positions.forEach((position, index) => {
    // Desenha o rastro apenas a cada 3 segundos
    if (index % 90 === 0) {
      const alpha = (index + 1) / (aircraft.positions.length + 1);
      ctxAircraft.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      ctxAircraft.arc(position.x, position.y, 2, 0, 2 * Math.PI);
      ctxAircraft.fill();
    }
  });

  // Desenha o vetor mostrando a posição até 9 minutos à frente
  const futurePosition = {
    x: aircraft.x + aircraft.velX * 1 * 60, // 1 minuto = 1 * 60 segundos
    y: aircraft.y + aircraft.velY * 1 * 60,
  };

  // Desenha o avião como um círculo vazio com um X no meio
  ctxAircraft.beginPath();
  ctxAircraft.strokeStyle = 'black';
  ctxAircraft.arc(aircraft.x, aircraft.y, 10, 0, 2 * Math.PI);
  ctxAircraft.stroke();

  ctxAircraft.beginPath();
  ctxAircraft.strokeStyle = 'black';
  ctxAircraft.moveTo(aircraft.x - 7, aircraft.y - 7);
  ctxAircraft.lineTo(aircraft.x + 7, aircraft.y + 7);
  ctxAircraft.moveTo(aircraft.x - 7, aircraft.y + 7);
  ctxAircraft.lineTo(aircraft.x + 7, aircraft.y - 7);
  ctxAircraft.stroke();

  // Desenha o vetor de proa
  ctxAircraft.beginPath();
  ctxAircraft.strokeStyle = 'black';
  ctxAircraft.moveTo(aircraft.x, aircraft.y);
  ctxAircraft.lineTo(futurePosition.x, futurePosition.y);
  ctxAircraft.stroke();
}

function drawLabel(aircraft) {
  // Desenha a linha tracejada entre a aeronave e a etiqueta
  ctxLabel.setLineDash([5, 3]); // Define o padrão de traço
  ctxLabel.beginPath();
  ctxLabel.moveTo(aircraft.x, aircraft.y);
  ctxLabel.lineTo(aircraft.x + 30, aircraft.y - 30); // Ajuste a posição da etiqueta aqui
  ctxLabel.stroke();
  ctxLabel.setLineDash([]); // Limpa o padrão de traço

  // Desenha a etiqueta com as informações do avião
  ctxLabel.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctxLabel.fillRect(aircraft.x + 40, aircraft.y - 55, 100, 65); // Ajuste a posição da etiqueta aqui

  ctxLabel.strokeStyle = 'black'; // Define a cor da borda
  ctxLabel.lineWidth = 1; // Define a largura da borda

  ctxLabel.beginPath();
  ctxLabel.rect(aircraft.x + 40, aircraft.y - 50, 100, 70); // Ajuste a posição da etiqueta aqui
  ctxLabel.stroke();

  ctxLabel.font = '12px Arial';
  ctxLabel.fillStyle = 'black';
  ctxLabel.fillText('' + aircraft.callsign, aircraft.x + 45, aircraft.y - 35); // Ajuste a posição da etiqueta aqui
  ctxLabel.fillText('' + aircraft.depLocation, aircraft.x + 45, aircraft.y - 20); // Ajuste a posição da etiqueta aqui
  ctxLabel.fillText('' + aircraft.arrLocation, aircraft.x + 90, aircraft.y - 20); // Ajuste a posição da etiqueta aqui
  ctxLabel.fillText('FL ' + Math.floor(aircraft.flightLevel / 100), aircraft.x + 45, aircraft.y - 3); // Ajuste a posição da etiqueta aqui
  const resultantVector = Math.sqrt(aircraft.velX ** 2 + aircraft.velY ** 2).toFixed(2);
  ctxLabel.fillText('' + resultantVector, aircraft.x + 45, aircraft.y + 12); // Ajuste a posição da etiqueta aqui
}

function drawAllAircrafts() {
  ctxAircraft.clearRect(0, 0, canvas.width, canvas.height);
  ctxLabel.clearRect(0, 0, canvas.width, canvas.height);

  aircrafts.forEach((aircraft) => {
    drawAircraft(aircraft);
    drawLabel(aircraft);
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

function handleMouseDown(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  aircrafts.forEach((aircraft) => {
    const labelX = aircraft.x + 40; // Ajuste a posição da etiqueta aqui
    const labelY = aircraft.y - 50; // Ajuste a posição da etiqueta aqui
    const labelWidth = 100;
    const labelHeight = 70;

    if (
      mouseX >= labelX && mouseX <= labelX + labelWidth &&
      mouseY >= labelY && mouseY <= labelY + labelHeight
    ) {
      selectedAircraft = aircraft;
      offsetX = mouseX - labelX;
      offsetY = mouseY - labelY;
    }
  });
}

function handleMouseMove(event) {
  if (selectedAircraft) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    selectedAircraft.x = mouseX - offsetX - 40; // Ajuste a posição da etiqueta aqui
    selectedAircraft.y = mouseY - offsetY + 50; // Ajuste a posição da etiqueta aqui

    drawAllAircrafts();
  }
}

function handleMouseUp() {
  selectedAircraft = null;
}

canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);

animate();
