export default class Paddle {

  constructor(pos, velocity, width, height) {
    this.pos = pos;
    this.velocity = velocity;
    this.width = width;
    this.height = height;
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  update() {
    if (this.pos.y + this.height > canvas.height) {
      this.pos.y = canvas.height - this.height;
    } else if (this.pos.y < 0) {
      this.pos.y = 0;
    }
  }

}
