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

  update(keysPressed, isMultiplayer, isAIPlayer) {
    if (isMultiplayer) {
      if (keysPressed[this.upKey]) {
        this.pos.y -= this.velocity.y;
      }

      if (keysPressed[this.downKey]) {
        this.pos.y += this.velocity.y;
      }
    } else if (isAIPlayer) {
      if (keysPressed[38]) { // KEY_UP
        this.pos.y -= this.velocity.y;
      }

      if (keysPressed[40]) { // KEY_DOWN
        this.pos.y += this.velocity.y;
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = "#33ff00";
    ctx.beginPath();
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  getHalfWidth() {
    return this.width / 2;
  }

  getHalfHeight() {
    return this.height / 2;
  }

  getCenter() {
    return {
      x: this.pos.x + this.getHalfWidth(),
      y: this.pos.y + this.getHalfHeight(),
    };
  }
}
