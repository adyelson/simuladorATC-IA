import Aircraft from "./aircraft.js";
import {zoom} from "./listeners.js";
import { drawAllAircrafts } from './canvarenderer.js';

const aircrafts = {
  TAM2231: new Aircraft(190, 100, 0.5, 0.1, 50, "TAM2231", 35000, "SBKP", "SBSP"),
  CD456: new Aircraft(50, 50, -0.5, 0.5, 50, "CD456", 28000, "SBGR", "SBKP"),
  EF789: new Aircraft(100, 100, -0.5, 0.5, 50, "EF789", 32000, "SBRJ", "SBSP"),
  GH012: new Aircraft(200, 200, 2.5, 2.5, 50, "GH012", 40000, "SBSP", "SBGR"),
  // Adicione mais instâncias de Aircraft conforme necessário
};

//para teste
window.aircrafts = aircrafts;
//


function moveAllAircrafts() {
  for (let callsign in aircrafts) {
    if (aircrafts.hasOwnProperty(callsign)) {
      aircrafts[callsign].move();
    }
  }

}

function animate() {
  moveAllAircrafts();
  drawAllAircrafts();
  setTimeout(animate, 3000); // Atualiza a cada 3 segundos
}


animate();
