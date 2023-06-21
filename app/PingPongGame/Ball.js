export default class Ball {
  constructor(pos, velocity, radius) {
    this.pos = pos; // Position of the ball {x, y}
    this.velocity = velocity; // Velocity of the ball {x, y}
    this.radius = radius; // Radius of the ball
  }

  update() {
    // Update the position of the ball based on its velocity
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }

  draw(ctx) {
    // Draw the ball on the canvas using the provided 2D rendering context (ctx)
    ctx.fillStyle = "#33ff00"; // Fill color of the ball
    ctx.strokeStyle = "#33ff00"; // Stroke color of the ball
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2); // Create a circular path for the ball
    ctx.fill(); // Fill the ball with the fill color
    ctx.stroke(); // Draw the outline of the ball with the stroke color
  }
}
