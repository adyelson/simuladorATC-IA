export default class Aircraft {
constructor( x, y, velX, velY, acceleration,callsign, flightLevel, depLocation, arrLocation) {
    this.callsign = callsign;
    this.positions = [];
    this.direction = null;
    this.flightLevel = flightLevel;
    this.updatePosition(x, y);
    this.updateVelocity(velX, velY);
    this.acceleration = acceleration;
    this.depLocation = depLocation;
    this.arrLocation = arrLocation;
    this.labelX = this.x+40;
    this.labelY = this.y-50;
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
changeDirection(newMagneticHeading, deltaTime) {
    const targetDirection = newMagneticHeading;
    const maxChangePerSecond = 3;
    const degreesToRadians = Math.PI / 180;
  
    // Calculate the difference between the target direction and the current direction
    let deltaDirection = targetDirection - this.direction;
  
    // Normalize the delta direction to the range [-180, 180]
    if (deltaDirection > 180) {
      deltaDirection -= 360;
    } else if (deltaDirection < -180) {
      deltaDirection += 360;
    }
  
    // Calculate the maximum change based on the time elapsed
    const maxChange = maxChangePerSecond * deltaTime;
  
    // Adjust the delta direction if it exceeds the maximum change
    if (Math.abs(deltaDirection) > maxChange) {
      deltaDirection = Math.sign(deltaDirection) * maxChange;
    }
  
    // Update the direction based on the adjusted delta direction
    this.direction += deltaDirection;
  
    // Normalize the direction to the range [0, 360]
    this.direction = (this.direction + 360) % 360;
  
    // Update the velX and velY properties based on the new direction
    const directionInRadians = this.direction * degreesToRadians;
    const speed = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
    this.velX = Math.cos(directionInRadians) * speed;
    this.velY = Math.sin(directionInRadians) * speed;
  }
  

changeVelocity(newVelocity) {
    const currentSpeed = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
    const speedDifference = newVelocity - currentSpeed;

    // Calculate the time it takes to reach the new speed by considering the acceleration
    const timeToReachNewSpeed = Math.abs(speedDifference) / this.acceleration;

    // Calculate the amount of velocity change in x and y for each iteration
    const deltaVelocityX = (speedDifference * this.velX) / (currentSpeed * timeToReachNewSpeed);
    const deltaVelocityY = (speedDifference * this.velY) / (currentSpeed * timeToReachNewSpeed);

    // Update the velocity gradually over time by considering the acceleration
    this.velX += deltaVelocityX;
    this.velY += deltaVelocityY;

    // Update the direction based on the new velocity
    this.updateVelocity(this.velX, this.velY);
}
}

