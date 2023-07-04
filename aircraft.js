export default class Aircraft {
  constructor(callsign, flightLevel, depLocation, arrLocation, lat, long, speed, direction, acceleration) {
    this.callsign = callsign;
    this.positions = [];
    this.acceleration = acceleration;
    this.depLocation = depLocation;
    this.arrLocation = arrLocation;
    this.flightLevel = flightLevel;
    this.speed = speed;
    this.direction = direction;
    const { x, y } = this.convertLatLongToXY(lat, long);
    const { velX, velY } = this.calculateVelocities(speed, direction);
    this.updatePosition(x, y);
    this.velX = velX;
    this.velY = velY;
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

  move() {
    this.x += this.velX;
    this.y += this.velY;
    this.labelX += this.velX;
    this.labelY += this.velY;
    this.updatePosition(this.x, this.y);
  }


  mudarVelocidade(newSpeed) {
    let intervalId = setInterval(() => {
      if (this.speed > newSpeed) {
        this.speed -= this.acceleration;
        if (this.speed - newSpeed <= 0) {
          this.speed = newSpeed;
        }
      } else if (this.speed < newSpeed) {

        this.speed += this.acceleration;
        if (newSpeed - this.speed <= 0) {
          this.speed = newSpeed;
        }
      } else {
        clearInterval(intervalId); // Encerra o setInterval quando a velocidade atinge o novo valor desejado
      }
      let velocities = this.calculateVelocities(this.speed, this.direction);
      this.velX = velocities.velX;
      this.velY = velocities.velY;
    }, 1000);

  }

  mudarProa(proa) {
    const proaAtual = this.direction;
    const menorCurva = Math.abs(proaAtual - proa);
    const maiorCurva = 360 - menorCurva;
    const curvaDireita = proaAtual <= proa ? menorCurva : maiorCurva;
    const curvaEsquerda = proaAtual <= proa ? maiorCurva : menorCurva;
    let curva = curvaDireita <= curvaEsquerda ? curvaDireita : -curvaEsquerda;
  
    let intervalId = setInterval(() => {
      if (curva > 0) {
        this.direction += 3;
        if (this.direction >= 360) {
          this.direction = 0;
        }
        curva -= 3;
      } else if (curva < 0) {
        this.direction -= 3;
        if (this.direction < 0) {
          this.direction = 360 + this.direction;
        }
        curva += 3;
      } else {
        clearInterval(intervalId);
      }
      let velocities = this.calculateVelocities(this.speed, this.direction);
      this.velX = velocities.velX;
      this.velY = velocities.velY;
    }, 1000);
  }
  


}



