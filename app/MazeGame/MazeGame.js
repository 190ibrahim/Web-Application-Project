import Application from "../Application.js";

export default class MazeGame extends Application {
  init() {
    super.init();

    // Create the canvas element
    const containerElem = document.createElement('div');
    containerElem.className = 'maze-container';

    const canvasElem = document.createElement('canvas');
    canvasElem.width = 500;
    canvasElem.height = 550;
    canvasElem.id = 'mazeCanvas';
    containerElem.appendChild(canvasElem);

    const winElem = document.createElement('div');
    winElem.className = 'win';
    winElem.style.display = "none";

    const h1Elem = document.createElement('h1');
    h1Elem.textContent = 'Well done! You won!';
    winElem.appendChild(h1Elem);

    // Create a button element with the replay function
    const replay = document.createElement('replay');
    replay.setAttribute('data-app', 'MazeGame')
    replay.textContent = 'Replay';
    replay.className = 'replay';

    this.canvas = canvasElem;
    this.ctx = canvasElem.getContext('2d');
    this.target.appendChild(containerElem);
    this.target.appendChild(winElem);

    this.tileSize = 25;
    this.player = {
      x: canvasElem.width - this.tileSize,
      y: canvasElem.height - (this.tileSize * 5),
      radius: this.tileSize / 4,
      prevPos: {}
    };

    this.rightPressed = false;
    this.leftPressed = false;
    this.upPressed = false;
    this.downPressed = false;
let animation;
    /*this.map = [
      this.map = [
        [1,0,1],
        [1,0,1],
        [1,0,0]
    ];*/

    this.map = [
  [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1],
  [1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,1,1,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,0,0,0,0,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,1,1,0,0,1,0,1,0,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,1,0,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,1,1,1,1,0,1,0,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
  [1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0],
  [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,0,1],
  [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];
    
    const tiles = [];
    for (let i = 0; i < this.map.length; i++) {
      tiles[i] = [];
      for (let j = 0; j < this.map[i].length; j++) {
        tiles[i][j] = { x: 0, y: 0, type: "" };
      }
    }

    const drawBoard = () => {
      this.ctx.fillStyle = "#03011f";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };

    const drawMaze = () => {
      for (let i = 0; i < this.map.length; i++) {
        for (let j = 0; j < this.map[i].length; j++) {
          let tileX = j * this.tileSize;
          let tileY = i * this.tileSize;
          tiles[i][j].x = tileX;
          tiles[i][j].y = tileY;
          if (this.map[i][j] === 1) {
            tiles[i][j].type = "wall";
            drawWall(tileX, tileY);
          } else {
            drawEmpty(tileX, tileY);
          }
        }
      }
    };

    const drawWall = (x, y) => {
      this.ctx.fillStyle = "#6cacc5";
      this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
    };

    const drawEmpty = (x, y) => {
      this.ctx.fillStyle = "#03011f";
      this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
    };

    const drawPlayer = () => {
      this.ctx.beginPath();
      this.ctx.arc(
        this.player.x + this.tileSize / 2,
        this.player.y + this.tileSize / 2,
        this.player.radius,
        0,
        2 * Math.PI
      );
      this.ctx.fillStyle = "red";
      this.ctx.fill();
      this.ctx.closePath();
    };

    const updatePosition = () => {
      this.player.prevPos = { x: this.player.x, y: this.player.y };
      if (this.rightPressed) {
        this.player.x += 2;
      }
      if (this.leftPressed) {
        this.player.x -= 2;
      }
      if (this.upPressed) {
        this.player.y -= 2;
      }
      if (this.downPressed) {
        this.player.y += 2;
      }
    };

    const checkCollision = () => {
      if (this.player.x + this.tileSize > this.canvas.width) {
        console.log("That is where you started");
        this.player.x = this.player.prevPos.x;
      }
      if (this.player.y + this.player.radius < 0) {
        console.log("You won!");
        cancelAnimationFrame(animation);
        gameOver();
      }
      for (let i = 0; i < this.map.length; i++) {
        for (let j = 0; j < this.map[i].length; j++) {
          const b = tiles[i][j];
          if (
            this.player.x + this.player.radius * 3 > b.x &&
            this.player.x < b.x + this.tileSize - this.player.radius &&
            this.player.y + this.tileSize > b.y + this.player.radius &&
            this.player.y < b.y + this.tileSize - this.player.radius &&
            b.type === "wall"
          ) {
            this.player.x = this.player.prevPos.x;
            this.player.y = this.player.prevPos.y;
          }
        }
      }
    };

  //replay.style.cursor = "pointer";

    const gameOver = () => {
      console.log('Game over function called');
      this.canvas.style.visibility = "hidden";
      const win = document.querySelector(".win");
      win.style.display = "block";
      console.log('Win element display:', win.style.display);
    
      // Make the replay button visible and clickable
      replay.style.cursor = "pointer";

    
      // Append the button to the win element
      win.appendChild(replay);
    };
    
    
          replay.addEventListener("click", () => {
        // Reset the player position and visibility
        this.player.x = this.canvas.width - this.tileSize;
        this.player.y = this.canvas.height - (this.tileSize * 5);
        this.canvas.style.visibility = "visible";
        // Hide the win element
        win.style.display = "none";
        // Start the animation again
        animation = requestAnimationFrame(draw);
      });

    const keyDownHandler = (e) => {
if (e.keyCode === 39) {
  this.rightPressed = true;
} else if (e.keyCode === 37) {
  this.leftPressed = true;
} else if (e.keyCode === 38) {
  this.upPressed = true;
} else if (e.keyCode === 40) {
  this.downPressed = true;
}

    };

    const keyUpHandler = (e) => {
if (e.keyCode === 39) {
  this.rightPressed = false;
} else if (e.keyCode === 37) {
  this.leftPressed = false;
} else if (e.keyCode === 38) {
  this.upPressed = false;
} else if (e.keyCode === 40) {
  this.downPressed = false;
}

    };

    const draw = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      drawBoard();
      drawMaze();
      drawPlayer();
      updatePosition();
      checkCollision();
      animation = requestAnimationFrame(draw);
    };

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    draw();
  }
}