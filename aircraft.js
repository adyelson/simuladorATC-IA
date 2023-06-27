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
    }

    updatePosition(x, y) {
        this.x = x;
        this.y = y;

        this.positions.push({ x: this.x, y: this.y });

        if (this.positions.length > 10) {
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

        this.updatePosition(this.x, this.y);
    }

    changeDirection(newMagneticHeading) {
        const newDirection = newMagneticHeading;

        // Calculate the difference between the new direction and the current direction
        let deltaDirection = newDirection - this.direction;

        // If the difference is greater than 180 degrees, change the direction to the opposite
        if (Math.abs(deltaDirection) > 180) {
            if (deltaDirection > 0) {
                deltaDirection -= 360;
            } else {
                deltaDirection += 360;
            }
        }

        // Update the direction based on the difference and the velocity
        this.direction += deltaDirection;
        this.direction = (this.direction + 360) % 360;

        // Update the velX and velY properties based on the new direction
        const directionInRadians = this.direction * (Math.PI / 180);
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
