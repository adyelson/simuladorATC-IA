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