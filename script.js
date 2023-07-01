import Aircraft from "./aircraft.js";
import * as zoom from "./listeners.js";
import { drawAllAircrafts } from './canvarenderer.js';

const aircrafts = {
  //callsign, flightLevel, depLocation, arrLocation, lat, long, speed, direction, acceleration
  TAM2231: new Aircraft("TAM2231", 35000, "SBKP", "SBSP", 1,1,10, 130, 50),
  AZU2231: new Aircraft("AZU2231", 31000, "SBKP", "SBSP", 1,3,20, 160, 20)

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
