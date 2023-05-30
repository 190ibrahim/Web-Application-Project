export default class Ball {
  constructor(pos, velocity, radius) {
    this.pos = pos;
    this.velocity = velocity;
    this.radius = radius;
  }

  update() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }

  draw(ctx) {
    ctx.fillStyle = "#33ff00";
    ctx.strokeStyle = "#33ff00";
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}
