
canvas.addEventListener('wheel', handleMouseWheel);

canvas.addEventListener('mousemove', handleCanvasMouseMoveScreen);
canvas.addEventListener('mousemove', handleCanvasMouseMove);
// canvas.addEventListener('mousedown', handleCanvasMouseDown);

canvas.addEventListener('mouseup', handleCanvasMouseUp);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);

document.addEventListener("keydown", pressKeyR);

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

function handleCanvasMouseMoveScreen(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left;
    var y = event.clientY - canvas.getBoundingClientRect().top;
    mostrarCursor(x, y);
}

function handleCanvasMouseMove(event) {
    if (dragging) {
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

        const deltaX = mouseX - offsetXCanvas;
        const deltaY = mouseY - offsetYCanvas;

        offsetXCanvas = mouseX;
        offsetYCanvas = mouseY;

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
    dragging = true;
    offsetXCanvas = event.clientX - canvas.getBoundingClientRect().left;
    offsetYCanvas = event.clientY - canvas.getBoundingClientRect().top;
}

function handleCanvasMouseUp() {
    dragging = false;
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
                selectedAircraft = aircrafts[callsign];
                offsetX = mouseX - labelX;
                offsetY = mouseY - labelY;
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
    selectedAircraft = null;
}



function pressKeyR(event) {
    // Verifica se a tecla pressionada é a tecla "R"
    if (event.key === "r" || event.key === "R") {
  
      for (let callsign in aircrafts) {
        if (aircrafts.hasOwnProperty(callsign)) {
          aircrafts[callsign].labelX = aircrafts[callsign].x + 40;
          aircrafts[callsign].labelX = aircrafts[callsign].x + 40;
        }
      }  
    }
  }