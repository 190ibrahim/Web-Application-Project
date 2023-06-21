export default class Paddle {
  constructor(pos, velocity, width, height, upKey, downKey) {
    this.pos = pos;
    this.velocity = velocity;
    this.width = width;
    this.height = height;
    this.score = 0;
    this.upKey = upKey;
    this.downKey = downKey;
  }

  // Update the paddle's position based on user input
  update(keysPressed, isMultiplayer, isAIPlayer) {
    if (isMultiplayer) {
      // Update position based on the specified up and down keys for multiplayer mode
      if (keysPressed[this.upKey]) {
        this.pos.y -= this.velocity.y;
      }

      if (keysPressed[this.downKey]) {
        this.pos.y += this.velocity.y;
      }
    } else if (isAIPlayer) {
      // Update position based on the hardcoded key codes for AI player (up and down arrow keys)
      if (keysPressed[38]) { // KEY_UP
        this.pos.y -= this.velocity.y;
      }

      if (keysPressed[40]) { // KEY_DOWN
        this.pos.y += this.velocity.y;
      }
    }
  }

  // Draw the paddle on the canvas
  draw(ctx) {
    ctx.fillStyle = "#33ff00"; // Set fill color to green
    ctx.beginPath();
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height); // Draw a filled rectangle representing the paddle
  }

  // Return half the width of the paddle
  getHalfWidth() {
    return this.width / 2;
  }

  // Return half the height of the paddle
  getHalfHeight() {
    return this.height / 2;
  }

  // Return the center coordinates of the paddle
  getCenter() {
    return {
      x: this.pos.x + this.getHalfWidth(),
      y: this.pos.y + this.getHalfHeight(),
    };
  }
}
