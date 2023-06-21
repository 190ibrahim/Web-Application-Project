// Renderer class encapsulates the rendering functionality of the game.
//  It handles drawing the game elements and the game scene on the canvas,
//  providing a visual representation of the game's current state

export default class Renderer {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  // Draw the game scene (borders and center circle)
  drawGameScene() {
    this.ctx.strokeStyle = "#ffff00"; // Set the stroke color to yellow

    // Draw top border
    this.ctx.beginPath();
    this.ctx.lineWidth = 20;
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.canvas.width, 0);
    this.ctx.stroke();

    // Draw bottom border
    this.ctx.beginPath();
    this.ctx.lineWidth = 20;
    this.ctx.moveTo(0, this.canvas.height);
    this.ctx.lineTo(this.canvas.width, this.canvas.height);
    this.ctx.stroke();

    // Draw left border
    this.ctx.beginPath();
    this.ctx.lineWidth = 15;
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, this.canvas.height);
    this.ctx.stroke();

    // Draw right border
    this.ctx.beginPath();
    this.ctx.lineWidth = 15;
    this.ctx.moveTo(this.canvas.width, 0);
    this.ctx.lineTo(this.canvas.width, this.canvas.height);
    this.ctx.stroke();

    // Draw center line
    this.ctx.beginPath();
    this.ctx.lineWidth = 10;
    this.ctx.moveTo(this.canvas.width / 2, 0);
    this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
    this.ctx.stroke();

    // Draw center circle
    this.ctx.beginPath();
    this.ctx.arc(
      this.canvas.width / 2,
      this.canvas.height / 2,
      50,
      0,
      Math.PI * 2
    );
    this.ctx.stroke();
  }

  // Draw the game objects (ball, paddle1, paddle2)
  draw(ball, paddle1, paddle2) {
    this.ctx.fillStyle = "rgba(25, 30, 36, 0.2)"; // Set the fill color to a semi-transparent gray
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); // Fill the entire canvas with the specified color

    ball.draw(this.ctx); // Draw the ball
    paddle1.draw(this.ctx); // Draw paddle1
    paddle2.draw(this.ctx); // Draw paddle2

    this.drawGameScene(); // Draw the game scene (borders and center circle)

    this.ctx.drawImage(this.canvas, 0, 0); // Draw the entire canvas onto itself, effectively clearing the previous frame
  }
}
