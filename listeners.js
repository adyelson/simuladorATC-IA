import {
    canvas,
    drawAllAircrafts
} from './canvarenderer.js';
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
    getSelectedAircraft,
    setSelectedAircraft,
    setvetorTime
} from './variables.js';
import { analisarChamadaAeronautica } from './tratarfala.js';
import { requestCommand } from './executarcomando.js';
import { mostrarCursor } from './mousenatela.js';

export let zoom = canvas.addEventListener('wheel', handleMouseWheel);

canvas.addEventListener('mousemove', handleCanvasMouseMoveScreen);
canvas.addEventListener('mousemove', handleCanvasMouseMove);
// canvas.addEventListener('mousedown', handleCanvasMouseDown);

canvas.addEventListener('mouseup', handleCanvasMouseUp);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);

document.addEventListener("keydown", pressKeyR);
document.addEventListener("keydown", pressKeyNumber);
document.addEventListener("keydown", pressKeyTalk);

function handleMouseWheel(event) {
    const zoomSpeed = 0.1; // Velocidade do zoom

    // Verifica a direção do scroll (positivo para cima, negativo para baixo)
    if (event.deltaY < 0) {
        setScale(getScale() + zoomSpeed); // Aumenta a escala para zoom in
    } else {
        setScale(getScale() - zoomSpeed); // Diminui a escala para zoom out
    }

    // Limita a escala mínima e máxima
    setScale(Math.max(0.8, Math.min(getScale(), 1.7)));


    drawAllAircrafts();
}

function handleCanvasMouseMoveScreen(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left;
    var y = event.clientY - canvas.getBoundingClientRect().top;
    mostrarCursor(x, y);
}

function handleCanvasMouseMove(event) {
    if (getDragging()) {
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

        const deltaX = mouseX - getOffsetXCanvas();
        const deltaY = mouseY - getOffsetYCanvas();

        setOffsetXCanvas(mouseX);
        setOffsetYCanvas(mouseY);

        for (let callsign in aircrafts) {
            if (aircrafts.hasOwnProperty(callsign)) {
                aircrafts[callsign].x += deltaX;
                aircrafts[callsign].y += deltaY;
                aircrafts[callsign].labelX += deltaX;
                aircrafts[callsign].labelY += deltaY;
                aircrafts[callsign].positions.forEach((el) => {
                    el.x += deltaX;
                    el.y += deltaY;
                })
            }
        }

        drawAllAircrafts();
    }
}

function handleCanvasMouseDown(event) {
    // dragging = true;
    setDragging(true);
    setOffsetXCanvas(event.clientX - canvas.getBoundingClientRect().left);
    setOffsetYCanvas(event.clientY - canvas.getBoundingClientRect().top);
}

function handleCanvasMouseUp() {
    // dragging = false;
    setDragging(false);
}

function handleMouseMove(event) {
    if (getSelectedAircraft()) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        getSelectedAircraft().labelX = mouseX - getOffsetX();
        getSelectedAircraft().labelY = mouseY - getOffsetY();
        drawAllAircrafts();
    }
}


function handleMouseDown(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    let allowDrag = 0;

    for (let callsign in aircrafts) {
        if (aircrafts.hasOwnProperty(callsign)) {

            const labelX = aircrafts[callsign].labelX - rect.left;
            const labelY = aircrafts[callsign].labelY - rect.top;
            const labelWidth = 100;
            const labelHeight = 65;

            //console.log(aircraft.callsign,labelX,labelY)

            if (
                mouseX >= labelX &&
                mouseX <= labelX + labelWidth &&
                mouseY >= labelY &&
                mouseY <= labelY + labelHeight
            ) {
                setSelectedAircraft(aircrafts[callsign]);
                setOffsetX(mouseX - labelX);
                setOffsetY(mouseY - labelY);
                allowDrag++;
            }

        }
    }

    if (allowDrag > 0) {
    } else {
        handleCanvasMouseDown(event);
    }
}

function handleMouseUp() {
    setSelectedAircraft(null);
}



function pressKeyR(event) {
    // Verifica se a tecla pressionada é a tecla "R"
    if (event.key === "r" || event.key === "R") {

        for (let callsign in aircrafts) {
            if (aircrafts.hasOwnProperty(callsign)) {
                aircrafts[callsign].labelX = (aircrafts[callsign].x + 40);
                aircrafts[callsign].labelY = (aircrafts[callsign].y - 50);
            }
        }
    }
}

function pressKeyNumber(event) {
    let number = parseInt(event.key);
    if (number >= 0 && number <= 9) {
        setvetorTime(event.key);
    }
    drawAllAircrafts();
}

function pressKeyTalk(event) {
    
    if (event.key === "t" || event.key === "T") {

        const recognition = new webkitSpeechRecognition();
        // Defina o idioma que será reconhecido (no caso, o português do Brasil)
        recognition.lang = 'pt-BR';
        // Iniciar a reconhecimento de fala

        recognition.start();

        // Criar um evento para processar o resultado da fala reconhecida
        recognition.onresult = (event) => {
            // Obter o primeiro resultado da fala reconhecida
            const speechToText = event.results[0][0].transcript;
            // Escrever o resultado na página
            // document.write(speechToText);
            console.log(speechToText)
        };

        // Quando o reconhecimento de voz receber uma frase, faça algo com ela
        recognition.addEventListener('result', (event) => {
            // Pega a primeira frase reconhecida
            const firstResult = event.results[0][0].transcript;
            let listaPalavras = firstResult.split(' ');
            
            listaPalavras.forEach((element, index) => {
                console.log(`${index}:${element}`)
            });

            let mensagemAenviar = `${listaPalavras[0]+listaPalavras[1]}, ${listaPalavras.slice(2)}`
            console.log(mensagemAenviar)
            let mensagemAnalisada = analisarChamadaAeronautica(firstResult)
            console.log(mensagemAnalisada)
            requestCommand(mensagemAnalisada);
        });
    }
}