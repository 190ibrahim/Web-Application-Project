import Application from "../Application.js";
import TileMap from "./TileMap.js";

export default class PacManGame extends Application {
  init() {
    super.init();

    const tileSize = 32;
    const velocity = 2;

    const containerElem = document.createElement('div');
    containerElem.className = 'pacMan-container';

    const h1Elem = document.createElement('h1');
    h1Elem.textContent = 'Pac-Man';
    h1Elem.className = 'pacMan-title';

    const canvas = document.createElement('canvas');
    canvas.width = 420;
    canvas.height = 480;
    canvas.id = 'pacManCanvas';
    containerElem.appendChild(h1Elem);
    containerElem.appendChild(canvas);

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.target.appendChild(containerElem);

    this.tileSize = tileSize;
    this.velocity = velocity;

    this.tileMap = new TileMap(this.tileSize);
    this.pacman = this.tileMap.getPacman(this.velocity);
    this.enemies = this.tileMap.getEnemies(this.velocity);

    this.gameOver = false;
    this.gameWin = false;

    this.gameLoop();
  }

  gameLoop() {
    this.tileMap.draw(this.ctx);
    this.pacman.draw(this.ctx, this.pause(), this.enemies);
    this.enemies.forEach((enemy) => enemy.draw(this.ctx, this.pause(), this.pacman));
    this.checkGameOver();
    this.checkGameWin();
    this.drawGameEnd(); // Move the drawGameEnd() call here to ensure it's called every frame

    if (!this.gameOver && !this.gameWin) {
      requestAnimationFrame(this.gameLoop.bind(this));
    }
  }

  checkGameWin() {
    if (!this.gameWin) {
      this.gameWin = this.tileMap.didWin();
      if (this.gameWin) {
        // Game win logic
      }
    }
  }

  checkGameOver() {
    if (!this.gameOver) {
      this.gameOver = this.isGameOver();
      if (this.gameOver) {
        // Game over logic
      }
    }
  }

  isGameOver() {
    return this.enemies.some(
      (enemy) => !this.pacman.powerDotActive && enemy.collideWith(this.pacman)
    );
  }

  pause() {
    return !this.pacman.madeFirstMove || this.gameOver || this.gameWin;
  }

  drawGameEnd() {
    if (this.gameOver || this.gameWin) {
      let text = "You Win!";
      if (this.gameOver) {
        text = "Game Over";
      }

      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, this.canvas.height / 3.2, this.canvas.width, 80);

      this.ctx.font = "75px comic sans";
      const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
      gradient.addColorStop(0, "magenta");
      gradient.addColorStop(0.5, "blue");
      gradient.addColorStop(1.0, "red");

      this.ctx.fillStyle = gradient;
      this.ctx.fillText(text, 10, this.canvas.height / 2);
    }
  }

  destroy() {
    super.destroy();
    cancelAnimationFrame(this.animationKey);
  }
}
