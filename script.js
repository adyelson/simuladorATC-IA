import Aircraft from "./aircraft.js";

const aircrafts = {
  TAM2231: new Aircraft(190, 100, 0.5, 0.1, 50, "TAM2231", 35000, "SBKP", "SBSP"),
  CD456: new Aircraft(50, 50, -0.5, 0.5, 50, "CD456", 28000, "SBGR", "SBKP"),
  EF789: new Aircraft(100, 100, -0.5, 0.5, 50, "EF789", 32000, "SBRJ", "SBSP"),
  GH012: new Aircraft(200, 200, 2.5, 2.5, 50, "GH012", 40000, "SBSP", "SBGR"),
  // Adicione mais instâncias de Aircraft conforme necessário
};

// Coordenadas geográficas do centro de visualização inicial
const initialCenter = { latitude: -23.5505, longitude: -46.6333 };

// Função para converter coordenadas geográficas em pixels no canvas
function convertCoordinatesToPixels(latitude, longitude) {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const latitudeRange = { min: -90, max: 90 };
  const longitudeRange = { min: -180, max: 180 };

  const x = ((longitude - longitudeRange.min) / (longitudeRange.max - longitudeRange.min)) * canvasWidth;
  const y = ((latitudeRange.max - latitude) / (latitudeRange.max - latitudeRange.min)) * canvasHeight;

  return { x, y };
}

// Função para converter pixels no canvas em coordenadas geográficas
function convertPixelsToCoordinates(x, y) {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const latitudeRange = { min: -90, max: 90 };
  const longitudeRange = { min: -180, max: 180 };

  const latitude = latitudeRange.max - (y / canvasHeight) * (latitudeRange.max - latitudeRange.min);
  const longitude = (x / canvasWidth) * (longitudeRange.max - longitudeRange.min) + longitudeRange.min;

  return { latitude, longitude };
}

// Função para ajustar a visão inicial com base nas coordenadas fornecidas
function setInitialView() {
  const centerPixels = convertCoordinatesToPixels(initialCenter.latitude, initialCenter.longitude);
  const canvasCenterX = canvas.width / 2;
  const canvasCenterY = canvas.height / 2;
  offsetXCanvas = canvasCenterX - centerPixels.x;
  offsetYCanvas = canvasCenterY - centerPixels.y;
}

// Chame a função setInitialView para ajustar a visão inicial
setInitialView();

// Função para atualizar as coordenadas das aeronaves com base na posição relativa no canvas
function updateAircraftsCoordinates() {
  for (let callsign in aircrafts) {
    if (aircrafts.hasOwnProperty(callsign)) {
      const aircraft = aircrafts[callsign];
      const aircraftPixels = convertCoordinatesToPixels(aircraft.latitude, aircraft.longitude);
      aircraft.x = aircraftPixels.x + offsetXCanvas;
      aircraft.y = aircraftPixels.y + offsetYCanvas;
      aircraft.labelX = aircraft.x + 40;
      aircraft.labelY = aircraft.y - 50;
      aircraft.positions.forEach((position) => {
        position.x = aircraft.x + position.relativeX;
        position.y = aircraft.y + position.relativeY;
      });
    }
  }
}

// Chame a função updateAircraftsCoordinates para ajustar as coordenadas das aeronaves
updateAircraftsCoordinates();


window.aircrafts = aircrafts;
const canvas = document.querySelector('#myCanvas');
const ctxAircraft = canvas.getContext('2d');
const ctxLabel = canvas.getContext('2d');
const context = canvas.getContext('2d');

let scale = 1;
let dragging = false;
let offsetXCanvas = 0;
let offsetYCanvas = 0;
let selectedAircraft = null;
let offsetX = 0;
let offsetY = 0;

function drawAircraft(aircraft) {
  ctxAircraft.save(); // Salva o estado atual do contexto
  ctxAircraft.scale(scale, scale); // Aplica a escala aos elementos desenhados

  // Atualize as coordenadas e dimensões dos elementos de acordo com a escala
  const scaledX = aircraft.x / scale;
  const scaledY = aircraft.y / scale;
  const scaledRadius = 10 / scale;

  // Desenha o rastro do avião com base nas posições passadas
  ctxAircraft.beginPath();
  aircraft.positions.forEach((position, index) => {
    // Desenha o rastro apenas a cada 3 segundos
    ctxAircraft.fillStyle = `rgba(0, 0, 0)`;
    ctxAircraft.arc(position.x / scale, position.y / scale, 2 / scale, 0, 2 * Math.PI);
    ctxAircraft.fill();
  });

  // Desenha o avião como um círculo vazio com um X no meio
  ctxAircraft.beginPath();
  ctxAircraft.strokeStyle = 'black';
  ctxAircraft.arc(scaledX, scaledY, scaledRadius, 0, 2 * Math.PI);
  ctxAircraft.stroke();

  // Desenha o vetor de proa
  const futurePosition = {
    x: scaledX + aircraft.velX * 1 * 60 / scale,
    y: scaledY + aircraft.velY * 1 * 60 / scale,
  };
  ctxAircraft.beginPath();
  ctxAircraft.strokeStyle = 'black';
  ctxAircraft.moveTo(scaledX, scaledY);
  ctxAircraft.lineTo(futurePosition.x, futurePosition.y);
  ctxAircraft.stroke();

  ctxAircraft.restore(); // Restaura o estado anterior do contexto
}



function drawLabel(aircraft) {
  const rect = canvas.getBoundingClientRect();

  const labelX = (aircraft.labelX - rect.left) / scale;
  const labelY = (aircraft.labelY - rect.top) / scale;

  //rever necessidade
  const scaledWidth = 100 / scale;
  const scaledHeight = 65 / scale;
  // Desenha a linha tracejada entre a aeronave e a etiqueta
  ctxLabel.setLineDash([5, 3]);
  ctxLabel.beginPath();
  ctxLabel.moveTo(aircraft.x, aircraft.y);

  if (aircraft.x > labelX && aircraft.y < labelY) {
    ctxLabel.lineTo(labelX + scaledWidth, labelY); // Utiliza as posições relativas
  } else if (aircraft.x > labelX && aircraft.y > labelY) {
    ctxLabel.lineTo(labelX + scaledWidth, labelY + scaledHeight); // Utiliza as posições relativas
  } else if (aircraft.x < labelX && aircraft.y > labelY) {
    ctxLabel.lineTo(labelX, labelY + scaledHeight); // Utiliza as posições relativas
  } else {
    ctxLabel.lineTo(labelX, labelY); // Utiliza as posições relativas
  }
  ctxLabel.stroke();
  ctxLabel.setLineDash([]); // Limpa o padrão de traço



  ctxLabel.strokeStyle = 'black'; // Define a cor da borda
  ctxLabel.lineWidth = 1; // Define a largura da borda

  ctxLabel.beginPath();
  ctxLabel.rect(labelX, labelY, scaledWidth, scaledHeight); // Utiliza as posições relativas
  ctxLabel.stroke();
  let fontSize = 14 / scale;
  ctxLabel.font = `${fontSize}px Arial`;
  ctxLabel.fillStyle = 'black';
  ctxLabel.fillText('' + aircraft.callsign, labelX + 5 / scale, labelY + 15 / scale); // Utiliza as posições relativas
  ctxLabel.fillText('' + aircraft.depLocation, labelX + 5 / scale, labelY + 30 / scale); // Utiliza as posições relativas
  ctxLabel.fillText('' + aircraft.arrLocation, labelX + 50 / scale, labelY + 30 / scale); // Utiliza as posições relativas
  ctxLabel.fillText('FL ' + Math.floor(aircraft.flightLevel / 100), labelX + 5 / scale, labelY + 47 / scale); // Utiliza as posições relativas
  const resultantVector = Math.sqrt(aircraft.velX ** 2 + aircraft.velY ** 2).toFixed(2);
  ctxLabel.fillText('' + resultantVector, labelX + 5 / scale, labelY + 62 / scale); // Utiliza as posições relativas


}



function drawAllAircrafts() {
  ctxAircraft.clearRect(0, 0, canvas.width, canvas.height);
  ctxLabel.clearRect(0, 0, canvas.width, canvas.height);

  ctxAircraft.save(); // Salva o estado atual do contexto
  ctxAircraft.scale(scale, scale); // Aplica a escala ao contexto


  for (let callsign in aircrafts) {
    if (aircrafts.hasOwnProperty(callsign)) {
      drawAircraft(aircrafts[callsign]);
      drawLabel(aircrafts[callsign]);
    }
  }
  

  ctxAircraft.restore(); // Restaura o estado anterior do contexto
}
canvas.addEventListener('wheel', handleMouseWheel);

function handleMouseWheel(event) {
  const zoomSpeed = 0.1; // Velocidade do zoom

  // Verifica a direção do scroll (positivo para cima, negativo para baixo)
  if (event.deltaY < 0) {
    scale += zoomSpeed; // Aumenta a escala para zoom in
  } else {
    scale -= zoomSpeed; // Diminui a escala para zoom out
  }

  // Limita a escala mínima e máxima
  scale = Math.max(0.5, Math.min(scale, 2));


  drawAllAircrafts();
}


function moveAllAircrafts() {
  for (let callsign in aircrafts) {
    if (aircrafts.hasOwnProperty(callsign)) {
      aircrafts[callsign].move();
    }
  }
  // aircrafts.forEach((aircraft) => {
  //   aircraft.move();
  // });
}

function animate() {
  moveAllAircrafts();
  drawAllAircrafts();
  setTimeout(animate, 3000); // Atualiza a cada 3 segundos
}


animate();
