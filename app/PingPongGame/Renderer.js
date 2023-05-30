// Renderer.js
export default class Renderer {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

drawGameScene() {
  this.ctx.strokeStyle = "#ffff00";

  this.ctx.beginPath();
  this.ctx.lineWidth = 20;
  this.ctx.moveTo(0, 0);
  this.ctx.lineTo(this.canvas.width, 0);
  this.ctx.stroke();

  this.ctx.beginPath();
  this.ctx.lineWidth = 20;
  this.ctx.moveTo(0, this.canvas.height);
  this.ctx.lineTo(this.canvas.width, this.canvas.height);
  this.ctx.stroke();

  this.ctx.beginPath();
  this.ctx.lineWidth = 15;
  this.ctx.moveTo(0, 0);
  this.ctx.lineTo(0, this.canvas.height);
  this.ctx.stroke();

  this.ctx.beginPath();
  this.ctx.lineWidth = 15;
  this.ctx.moveTo(this.canvas.width, 0);
  this.ctx.lineTo(this.canvas.width, this.canvas.height);
  this.ctx.stroke();

  this.ctx.beginPath();
  this.ctx.lineWidth = 10;
  this.ctx.moveTo(this.canvas.width / 2, 0);
  this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
  this.ctx.stroke();

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


  draw(ball, paddle1, paddle2) {
    // Perform drawing operations on the offscreen canvas
    this.ctx.fillStyle = "rgba(25, 30, 36, 0.2)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Call the necessary draw methods from ball and paddle classes
    ball.draw(this.ctx);
    paddle1.draw(this.ctx);
    paddle2.draw(this.ctx);

    // Call the drawGameScene method to draw the game scene elements
    this.drawGameScene();

    // Copy the offscreen canvas to the visible canvas
    this.ctx.drawImage(this.canvas, 0, 0);
  }
}
