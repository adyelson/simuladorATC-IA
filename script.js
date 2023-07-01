import Aircraft from "./aircraft.js";

const aircrafts = [
new Aircraft(190, 100, 0.5, 0.1, 0, "TAM2231", 35000, "SBKP", "SBSP"),
new Aircraft(50, 50, -0.5, 0.5, 0, "CD456", 28000, "SBGR", "SBKP"),
new Aircraft(100, 100, -0.5, 0.5, 0, "EF789", 32000, "SBRJ", "SBSP"),
new Aircraft(200, 200, 2.5, 2.5, 0, "GH012", 40000, "SBSP", "SBGR"),
// Adicione mais instâncias de Aircraft conforme necessário
];

const canvas = document.querySelector('#myCanvas');
const ctxAircraft = canvas.getContext('2d');
const ctxLabel = canvas.getContext('2d');

let scale = 1;

let dragging = false;
let offsetXCanvas = 0;
let offsetYCanvas = 0;

function handleCanvasMouseDown(event) {
  dragging = true;
  offsetXCanvas = event.clientX - canvas.getBoundingClientRect().left;
  offsetYCanvas = event.clientY - canvas.getBoundingClientRect().top;
}
function handleCanvasMouseMove(event) {
  if (dragging) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    const deltaX = mouseX - offsetXCanvas;
    const deltaY = mouseY - offsetYCanvas;

    offsetXCanvas = mouseX;
    offsetYCanvas = mouseY;

    aircrafts.forEach((aircraft) => {
      aircraft.x+= deltaX;
      aircraft.y += deltaY;
      aircraft.labelX += deltaX;
      aircraft.labelY += deltaY;
      aircraft.positions.forEach((el)=>{
        el.x += deltaX;
        el.y += deltaY;
      })
    });

    drawAllAircrafts();
  }
}

function handleCanvasMouseUp() {
  dragging = false;
}
// canvas.addEventListener('mousedown', handleCanvasMouseDown);

canvas.addEventListener('mousemove', handleCanvasMouseMove);
canvas.addEventListener('mouseup', handleCanvasMouseUp);

let selectedAircraft = null;
let offsetX = 0;
let offsetY = 0;

// function drawAircraft(aircraft) {
// // Desenha o rastro do avião com base nas posições passadas
// ctxAircraft.beginPath();
// aircraft.positions.forEach((position, index) => {
//   // Desenha o rastro apenas a cada 3 segundos
  
    
//     ctxAircraft.fillStyle = `rgba(0, 0, 0)`;
//     ctxAircraft.arc(position.x, position.y, 2, 0, 2 * Math.PI);
//     ctxAircraft.fill();
  
// });

// // Desenha o vetor mostrando a posição até 9 minutos à frente
// const futurePosition = {
//   x: aircraft.x + aircraft.velX * 1 * 60, // 1 minuto = 1 * 60 segundos
//   y: aircraft.y + aircraft.velY * 1 * 60,
// };

// // Desenha o avião como um círculo vazio com um X no meio
// ctxAircraft.beginPath();
// ctxAircraft.strokeStyle = 'black';
// ctxAircraft.arc(aircraft.x, aircraft.y, 10, 0, 2 * Math.PI);
// ctxAircraft.stroke();

// ctxAircraft.beginPath();
// ctxAircraft.strokeStyle = 'black';
// ctxAircraft.moveTo(aircraft.x - 7, aircraft.y - 7);
// ctxAircraft.lineTo(aircraft.x + 7, aircraft.y + 7);
// ctxAircraft.moveTo(aircraft.x - 7, aircraft.y + 7);
// ctxAircraft.lineTo(aircraft.x + 7, aircraft.y - 7);
// ctxAircraft.stroke();

// // Desenha o vetor de proa
// ctxAircraft.beginPath();
// ctxAircraft.strokeStyle = 'black';
// ctxAircraft.moveTo(aircraft.x, aircraft.y);
// ctxAircraft.lineTo(futurePosition.x, futurePosition.y);
// ctxAircraft.stroke();
// }
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
  ctxLabel.moveTo(aircraft.x , aircraft.y );
  
if(aircraft.x>labelX && aircraft.y<labelY){
  ctxLabel.lineTo(labelX+scaledWidth, labelY); // Utiliza as posições relativas
}else if(aircraft.x>labelX && aircraft.y>labelY){
  ctxLabel.lineTo(labelX+scaledWidth, labelY+scaledHeight); // Utiliza as posições relativas
}else if(aircraft.x<labelX && aircraft.y>labelY){
  ctxLabel.lineTo(labelX, labelY+scaledHeight); // Utiliza as posições relativas
}else{
  ctxLabel.lineTo(labelX, labelY); // Utiliza as posições relativas
}
ctxLabel.stroke();
ctxLabel.setLineDash([]); // Limpa o padrão de traço



ctxLabel.strokeStyle = 'black'; // Define a cor da borda
ctxLabel.lineWidth = 1; // Define a largura da borda

ctxLabel.beginPath();
ctxLabel.rect(labelX, labelY, scaledWidth, scaledHeight); // Utiliza as posições relativas
ctxLabel.stroke();
let fontSize = 14 /scale;
ctxLabel.font = `${fontSize}px Arial`;
ctxLabel.fillStyle = 'black';
ctxLabel.fillText('' + aircraft.callsign, labelX +  5/scale, labelY + 15/scale); // Utiliza as posições relativas
ctxLabel.fillText('' + aircraft.depLocation, labelX + 5/scale, labelY + 30/scale); // Utiliza as posições relativas
ctxLabel.fillText('' + aircraft.arrLocation, labelX + 50/scale, labelY + 30/scale); // Utiliza as posições relativas
ctxLabel.fillText('FL ' + Math.floor(aircraft.flightLevel / 100), labelX + 5/scale, labelY + 47/scale); // Utiliza as posições relativas
const resultantVector = Math.sqrt(aircraft.velX ** 2 + aircraft.velY ** 2).toFixed(2);
ctxLabel.fillText('' + resultantVector, labelX + 5/scale, labelY + 62/scale); // Utiliza as posições relativas


}



function drawAllAircrafts() {
  ctxAircraft.clearRect(0, 0, canvas.width, canvas.height);
  ctxLabel.clearRect(0, 0, canvas.width, canvas.height);

  ctxAircraft.save(); // Salva o estado atual do contexto
  ctxAircraft.scale(scale, scale); // Aplica a escala ao contexto

  aircrafts.forEach((aircraft) => {
    drawAircraft(aircraft);
    drawLabel(aircraft);
  });

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
aircrafts.forEach((aircraft) => {
  aircraft.move();
});
}

function animate() {
moveAllAircrafts();
drawAllAircrafts();
setTimeout(animate, 3000); // Atualiza a cada 3 segundos
}

document.addEventListener("keydown", function(event) {
// Verifica se a tecla pressionada é a tecla "R"
if (event.key === "r" || event.key === "R") {
  aircrafts.forEach((aircraft) => {
    aircraft.labelX = aircraft.x+40;
    aircraft.labelY = aircraft.y-50;
  }); 
}
});

function handleMouseDown(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  let allowDrag = 0;
  aircrafts.forEach((aircraft) => {
    const labelX = aircraft.labelX - rect.left;
    const labelY = aircraft.labelY - rect.top;
    const labelWidth = 100;
    const labelHeight = 65;

    //console.log(aircraft.callsign,labelX,labelY)
    
    if (
      mouseX >= labelX && 
      mouseX <= labelX + labelWidth &&
      mouseY >= labelY && 
      mouseY <= labelY + labelHeight
    ) {
      selectedAircraft = aircraft;
      offsetX = mouseX - labelX;
      offsetY = mouseY - labelY;
      allowDrag++;
    }
    
    
  });
  if(allowDrag>0){

  }else{
     handleCanvasMouseDown(event);
  }
  
}

function handleMouseMove(event) {
  if (selectedAircraft) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

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


    var context = canvas.getContext('2d');
    
    canvas.addEventListener('mousemove', function(event) {
      var x = event.clientX - canvas.getBoundingClientRect().left;
      var y = event.clientY - canvas.getBoundingClientRect().top;
      
    
      mostrarCursor(x,y);
    });


    function mostrarCursor(x,y){
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
animate();
