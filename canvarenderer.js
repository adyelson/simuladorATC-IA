import {
    getDragging,
    setDragging,
    getScale,
    setScale,
    getOffsetX,
    setOffsetX,
    getOffsetY,
    setOffsetY,
    getOffsetXCanvas,
    setOffsetXCanvas,
    getOffsetYCanvas,
    setOffsetYCanvas,
    getvetorTime
} from './variables.js';

export const canvas = document.querySelector('#myCanvas');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    // Outras ações relacionadas ao redimensionamento, se necessário
    // ...
  }
  
  // Chama a função resizeCanvas para definir o tamanho inicial do canvas
  resizeCanvas();
  
  // Adiciona um listener de evento para redimensionar o canvas quando a janela for redimensionada
  window.addEventListener('resize', resizeCanvas);

export const context = canvas.getContext('2d');
const ctxAircraft = canvas.getContext('2d');
const ctxLabel = canvas.getContext('2d');

export function drawAircraft(aircraft) {
    ctxAircraft.save(); // Salva o estado atual do contexto
    ctxAircraft.scale(getScale(), getScale()); // Aplica a escala aos elementos desenhados

    // Atualize as coordenadas e dimensões dos elementos de acordo com a escala
    const scaledX = aircraft.x / getScale();
    const scaledY = aircraft.y / getScale();
    const scaledRadius = 10 / getScale();

    // Desenha o rastro do avião com base nas posições passadas

    aircraft.positions.forEach((position) => {
        ctxAircraft.beginPath();
        // Desenha o rastro apenas a cada 3 segundos
        ctxAircraft.fillStyle = `rgba(0, 0, 0)`;
        ctxAircraft.arc(position.x / getScale(), position.y / getScale(), 2 / getScale(), 0, 2 * Math.PI);
        ctxAircraft.fill();

    });

    // Desenha o avião como um círculo vazio com um X no meio
    ctxAircraft.beginPath();
    ctxAircraft.strokeStyle = 'black';
    ctxAircraft.arc(scaledX, scaledY, scaledRadius, 0, 2 * Math.PI);
    ctxAircraft.stroke();

    // Desenha as linhas diagonais para formar o "X"
    let sizeAdjuste = 2;
    ctxAircraft.moveTo(scaledX - scaledRadius+sizeAdjuste, scaledY - scaledRadius+sizeAdjuste);
    ctxAircraft.lineTo(scaledX + scaledRadius-sizeAdjuste, scaledY + scaledRadius-sizeAdjuste);
    ctxAircraft.moveTo(scaledX + scaledRadius-sizeAdjuste, scaledY - scaledRadius+sizeAdjuste);
    ctxAircraft.lineTo(scaledX - scaledRadius+sizeAdjuste, scaledY + scaledRadius-sizeAdjuste);

    // Define a cor das linhas do "X" como vermelho
    ctxAircraft.strokeStyle = 'black';
    ctxAircraft.stroke();

    // Desenha o vetor de proa
    const futurePosition = {
        x: scaledX + aircraft.velX * getvetorTime() * 60 / getScale(),
        y: scaledY + aircraft.velY * getvetorTime() * 60 / getScale(),
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
    const labelX = (aircraft.labelX - rect.left) / getScale();
    const labelY = (aircraft.labelY - rect.top) / getScale();
    //rever necessidade
    const scaledWidth = 100 / getScale();
    const scaledHeight = 65 / getScale();
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
    ctxLabel.strokeStyle = 'black'; // Define a cor da borda
    ctxLabel.lineWidth = 1; // Define a largura da borda
    ctxLabel.beginPath();
    ctxLabel.rect(labelX, labelY, scaledWidth, scaledHeight); // Utiliza as posições relativas
    ctxLabel.stroke();
    ctxLabel.setLineDash([]); // Limpa o padrão de traço
    let fontSize = 14 / getScale();
    ctxLabel.font = `${fontSize}px Arial`;
    ctxLabel.fillStyle = 'black';
    ctxLabel.fillText('' + aircraft.callsign, labelX + 5 / getScale(), labelY + 15 / getScale()); // Utiliza as posições relativas
    ctxLabel.fillText('' + aircraft.depLocation, labelX + 5 / getScale(), labelY + 30 / getScale()); // Utiliza as posições relativas
    ctxLabel.fillText('' + aircraft.arrLocation, labelX + 50 / getScale(), labelY + 30 / getScale()); // Utiliza as posições relativas
    ctxLabel.fillText('' + Math.floor(aircraft.flightLevel / 100), labelX + 5 / getScale(), labelY + 47 / getScale()); // Utiliza as posições relativas
    const resultantVector = Math.sqrt(aircraft.velX ** 2 + aircraft.velY ** 2).toFixed(2);
    ctxLabel.fillText('' + resultantVector, labelX + 5 / getScale(), labelY + 62 / getScale()); // Utiliza as posições relativas
}



export function drawAllAircrafts() {
    ctxAircraft.clearRect(0, 0, canvas.width, canvas.height);
    ctxLabel.clearRect(0, 0, canvas.width, canvas.height);
    ctxAircraft.save(); // Salva o estado atual do contexto
    ctxAircraft.scale(getScale(), getScale()); // Aplica a escala ao contexto
    for (let callsign in aircrafts) {
        if (aircrafts.hasOwnProperty(callsign)) {
            drawAircraft(aircrafts[callsign]);
            drawLabel(aircrafts[callsign]);
        }
    }
    ctxAircraft.restore(); // Restaura o estado anterior do contexto
}