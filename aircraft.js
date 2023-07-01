export default class Aircraft {
  constructor(callsign, flightLevel, depLocation, arrLocation, lat, long, speed, direction, acceleration) {
    this.callsign = callsign;
    this.positions = [];
    this.acceleration = acceleration;
    this.depLocation = depLocation;
    this.arrLocation = arrLocation;
    this.flightLevel = flightLevel;
    this.speed = speed;
    const { x, y } = this.convertLatLongToXY(lat, long);
    const { velX, velY } = this.calculateVelocities(speed, direction);
    this.updatePosition(x, y);
    this.updateVelocity(velX, velY);

    this.labelX = this.x + 40;
    this.labelY = this.y - 50;
  }

   convertLatLongToXY(lat, long) {
    const latOrigin = 0; // Latitude de origem (00° 00' 00'')
    const longOrigin = 0; // Longitude de origem (000° 00' 00'')

    const latitudeInRadians = (lat - latOrigin) * (Math.PI / 180);
    const longitudeInRadians = (long - longOrigin) * (Math.PI / 180);

    const earthRadius = 6371; // Raio médio da Terra em km

    const x = earthRadius * longitudeInRadians;
    const y = earthRadius * Math.log(Math.tan(Math.PI / 4 + latitudeInRadians / 2));

    return { x, y };
  }


  calculateVelocities(speed, direction) {
    // Converter a direção de graus para radianos
    const directionInRadians = (direction - 90) * (Math.PI / 180);
  
    // Calcular as velocidades nas direções x e y
    const velX = speed * Math.cos(directionInRadians);
    const velY = speed * Math.sin(directionInRadians);
  
    return { velX, velY };
  }
  
  updatePosition(x, y) {
    this.x = x;
    this.y = y;

    this.positions.push({ x: this.x, y: this.y });

    if (this.positions.length > 9) {
      this.positions.shift();
    }
  }

  updateVelocity(velX, velY) {
    this.velX = velX;
    this.velY = velY;

    // Calcula e armazena o rumo magnético em graus em relação aos rumos geográficos
    this.direction = Math.round(Math.atan2(this.velY, this.velX) * (180 / Math.PI));
    this.direction = this.direction % 360;
    this.direction = (this.direction + 90) % 360;
  }

  move() {
    this.x += this.velX;
    this.y += this.velY;
    this.labelX += this.velX;
    this.labelY += this.velY;
    this.updatePosition(this.x, this.y);
  }

 
  mudarVelocidade(novaVelocidade) {
    
    const anguloRumo = (this.direction * Math.PI) / 180;
    const velocidadeXAtual = this.speed * Math.cos(anguloRumo);
    const velocidadeYAtual = this.speed * Math.sin(anguloRumo);

    const { velocidadeX: velocidadeXNova, velocidadeY: velocidadeYNova } = decomporVelocidade(novaVelocidade, this.direction);

    let velocidadeX = velocidadeXAtual;
    let velocidadeY = velocidadeYAtual;

    const tempo = 1; // Tempo em segundos

    // Acelerar ou desacelerar as velocidades x e y até atingir a nova velocidade
    while (Math.abs(velocidadeX) < Math.abs(velocidadeXNova) || Math.abs(velocidadeY) < Math.abs(velocidadeYNova)) {
      if (velocidadeX < velocidadeXNova) {
        velocidadeX += this.acceleration * tempo;
        if (velocidadeX > velocidadeXNova) {
          velocidadeX = velocidadeXNova;
        }
      } else if (velocidadeX > velocidadeXNova) {
        velocidadeX -= this.acceleration * tempo;
        if (velocidadeX < velocidadeXNova) {
          velocidadeX = velocidadeXNova;
        }
      }

      if (velocidadeY < velocidadeYNova) {
        velocidadeY += this.acceleration * tempo;
        if (velocidadeY > velocidadeYNova) {
          velocidadeY = velocidadeYNova;
        }
      } else if (velocidadeY > velocidadeYNova) {
        velocidadeY -= this.acceleration * tempo;
        if (velocidadeY < velocidadeYNova) {
          velocidadeY = velocidadeYNova;
        }
      }
    }

    this.velX = velocidadeX;
    this.velY = velocidadeY;
  }

  // Função de decomposição de velocidade (exemplo)
 


}

function decomporVelocidade(velocidade, rumo) {
  const anguloRumo = (rumo * Math.PI) / 180;
  const velocidadeX = velocidade * Math.cos(anguloRumo);
  const velocidadeY = velocidade * Math.sin(anguloRumo);
  return { velocidadeX, velocidadeY };

  const directionInRadians = (direction - 90) * (Math.PI / 180);
  
  // Calcular as velocidades nas direções x e y
  const velX = speed * Math.cos(directionInRadians);
  const velY = speed * Math.sin(directionInRadians);

  return { velX, velY };
}

