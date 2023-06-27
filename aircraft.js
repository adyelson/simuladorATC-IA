
export default class Aircraft {
    constructor(x, y, velX, velY, acceleration) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.acceleration = acceleration;

        // Calcula e armazena o rumo magnético em graus em relação aos rumos geográficos
        this.magneticHeading = Math.round(Math.atan2(this.velY, this.velX) * (180 / Math.PI));
        this.magneticHeading = this.magneticHeading % 360;
        this.magneticHeading = (this.magneticHeading + 90) % 360;
    }

    move() {
        this.x += this.velX;
        this.y += this.velY;
    }

    // Método para alterar o rumo magnético em graus em relação aos rumos geográficos
    changeDirection(newMagneticHeading) {
        // Convert the magnetic heading to a direction by subtracting the magnetic declination
        // at the aircraft's current location
        const newDirection = newMagneticHeading - magneticDeclination;
    
        // Calculate the difference between the new direction and the current direction
        let deltaDirection = newDirection - this.direction;
    
        // If the difference is greater than 180 degrees, change the direction to the opposite
        if (Math.abs(deltaDirection) > 180) {
            if (deltaDirection > 0) {
                this.direction -= 360;
            } else {
                this.direction += 360;
            }
        }
    
        // Calculate the time it takes to reach the new direction by considering the aircraft's speed
        // and the size of the change in direction
        const timeToReachNewDirection = Math.abs(deltaDirection) / (this.velocity * Math.PI / 180);
    
        // Update the direction gradually over time by considering the size of the change in direction
        // and the length of time it takes to reach the new direction
        this.direction += deltaDirection / timeToReachNewDirection;
    
        // Normalize the direction to be between 0 and 359 degrees
        this.direction = this.direction % 360;
    
        // Update the velX and velY properties based on the new direction
        this.velX = Math.cos(this.direction * (Math.PI / 180));
        this.velY = Math.sin(this.direction * (Math.PI / 180));
    }

    // Método para alterar a velocidade do avião de maneira gradual
    changeVelocity(newVelocity) {
        // Calcula a diferença entre a nova velocidade e a velocidade atual
        const deltaVelocity = newVelocity - Math.sqrt(this.velX * this.velX + this.velY * this.velY);
        // Calcula a quantidade de tempo que levará para acelerar até a nova velocidade
        // considerando que a taxa de aceleração é de 3 graus por minuto
        const timeToReachNewVelocity = deltaVelocity / this.acceleration;
        // Calcula a quantidade de aceleração x e y que será adicionada em cada iteração
        // para atingir a nova velocidade em um período de tempo especificado
        const deltaVelocityX = this.acceleration * timeToReachNewVelocity * this.velX / Math.sqrt(this.velX * this.velX + this.velY * this.velY);
        const deltaVelocityY = this.acceleration * timeToReachNewVelocity * this.velY / Math.sqrt(this.velX * this.velX + this.velY * this.velY);
        // Atualiza a velocidade x e y de acordo com a quantidade de aceleração calculada
        this.velX += deltaVelocityX;
        this.velY += deltaVelocityY;
    }
}