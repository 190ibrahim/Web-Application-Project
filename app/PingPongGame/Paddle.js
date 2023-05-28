export default class Paddle {
    constructor(position, velocity, width, height) {
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.score = 0;
    }

    update() {
        if (this.keysPressed[UP_ARROW] && this.position.y > 0) {
            this.position.y -= this.velocity.y;
        } else if (this.keysPressed[DOWN_ARROW] && this.position.y + this.height < canvas.height) {
            this.position.y += this.velocity.y;
        }
    }
}