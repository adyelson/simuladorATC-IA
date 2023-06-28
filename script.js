import Aircraft from "./aircraft.js";

const aircrafts = [
  new Aircraft(190, 100, 0.5, 0.1, 0, "TAM2231", 35000, "SBKP", "SBSP"),
  new Aircraft(50, 50, -0.5, 0.5, 0, "CD456", 28000, "SBGR", "SBKP"),
  new Aircraft(100, 100, -0.5, 0.5, 0, "EF789", 32000, "SBRJ", "SBSP"),
  new Aircraft(200, 200, 10.5, 10.5, 0, "GH012", 40000, "SBSP", "SBGR"),
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
   
      
      ctxAircraft.fillStyle = `rgba(0, 0, 0)`;
      ctxAircraft.arc(position.x, position.y, 2, 0, 2 * Math.PI);
      ctxAircraft.fill();
    
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
  const labelX = aircraft.labelX -canvas.offsetLeft// Posição relativa à aeronave
  const labelY = aircraft.labelY -canvas.offsetTop; // Posição relativa à aeronave

  // Desenha a linha tracejada entre a aeronave e a etiqueta
  ctxLabel.setLineDash([5, 3]); // Define o padrão de traço
  ctxLabel.beginPath();
  ctxLabel.moveTo(aircraft.x, aircraft.y);
  ctxLabel.lineTo(labelX, labelY); // Utiliza as posições relativas
  ctxLabel.stroke();
  ctxLabel.setLineDash([]); // Limpa o padrão de traço

 

  ctxLabel.strokeStyle = 'black'; // Define a cor da borda
  ctxLabel.lineWidth = 1; // Define a largura da borda

  ctxLabel.beginPath();
  ctxLabel.rect(labelX, labelY, 100, 65); // Utiliza as posições relativas
  ctxLabel.stroke();

  ctxLabel.font = '12px Arial';
  ctxLabel.fillStyle = 'black';
  ctxLabel.fillText('' + aircraft.callsign, labelX + 5, labelY + 15); // Utiliza as posições relativas
  ctxLabel.fillText('' + aircraft.depLocation, labelX + 5, labelY + 30); // Utiliza as posições relativas
  ctxLabel.fillText('' + aircraft.arrLocation, labelX + 50, labelY + 30); // Utiliza as posições relativas
  ctxLabel.fillText('FL ' + Math.floor(aircraft.flightLevel / 100), labelX + 5, labelY + 47); // Utiliza as posições relativas
  const resultantVector = Math.sqrt(aircraft.velX ** 2 + aircraft.velY ** 2).toFixed(2);
  ctxLabel.fillText('' + resultantVector, labelX + 5, labelY + 62); // Utiliza as posições relativas

 
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
    const mouseX = event.clientX - canvas.offsetLeft;
    const mouseY = event.clientY - canvas.offsetTop;
    ctxLabel.fillStyle = 'green';
    ctxLabel.fillRect(mouseX, mouseY, 100, 65); // Utiliza as posições relativas

    
    aircrafts.forEach((aircraft) => {
      const labelX = aircraft.labelX - canvas.offsetLeft; 
      const labelY = aircraft.labelY - canvas.offsetTop; 
      const labelWidth = 100;
      const labelHeight = 65;

  // Desenha a etiqueta com as informações do avião
  ctxLabel.fillStyle = 'red';
  ctxLabel.fillRect(labelX, labelY, 100, 65); // Utiliza as posições relativas

 

      console.log(aircraft.callsign,labelX,labelY)
      if (
        mouseX >= labelX && 
        mouseX <= labelX + labelWidth &&
        mouseY >= labelY && 
        mouseY <= labelY + labelHeight
      ) {
        selectedAircraft = aircraft;
        offsetX = mouseX - labelX;
        offsetY = mouseY - labelY;
      }
    });
  }

  function handleMouseMove(event) {
    if (selectedAircraft) {
      const mouseX = event.clientX - canvas.offsetLeft;
      const mouseY = event.clientY - canvas.offsetTop;

      selectedAircraft.labelX = mouseX - offsetX;
      selectedAircraft.labelY = mouseY - offsetY;

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
