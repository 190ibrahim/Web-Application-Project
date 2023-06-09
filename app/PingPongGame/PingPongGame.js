// PingPongGame.js
// the PingPongGame class sets up the game by creating DOM elements,
//  initializing input handling, creating game objects, defining game update and render functions,
//  and running the game loop to keep the game logic and rendering in sync.
import Application from "../Application.js";
import Ball from "./Ball.js";
import Paddle from "./Paddle.js";
import GameLogic from "./GameLogic.js";
import Renderer from "./Renderer.js";
import InputHandler from "./InputHandler.js";

export default class PingPongGame extends Application {


  init() {
    super.init();

    // Create container div element
    const container = document.createElement("div");
    container.classList.add("PingPong-container");
    // Create canvas element
    const canvas = document.createElement("canvas");
    canvas.id = "canvas";

    // Create player 1 score element
    const player1Score = document.createElement("h1");
    player1Score.classList.add("score");
    player1Score.id = "player1Score";
    player1Score.textContent = "0";

    // Create player 2 score element
    const player2Score = document.createElement("h1");
    player2Score.classList.add("score");
    player2Score.id = "player2Score";
    player2Score.textContent = "0";

    // Create multiplayer button
    const multiplayerButton = document.createElement("button");
    multiplayerButton.textContent = "Multiplayer";
    multiplayerButton.classList.add("button", "mode-btn");
    multiplayerButton.style.left = "0";
    multiplayerButton.id = "multiplayer";

    // Create AI player button
    const aiPlayerButton = document.createElement("button");
    aiPlayerButton.textContent = "AI Player";
    aiPlayerButton.classList.add("button", "mode-btn");
    aiPlayerButton.style.right = "0";
    aiPlayerButton.id = "aiPlayer";



    // Create pause button element
    const pauseButton = document.createElement("button");
    pauseButton.textContent = "Start";
    pauseButton.classList.add("button", "mode-btn");
    pauseButton.style.left = "42%";
    pauseButton.id = "pause";

    // Append elements to container
    container.appendChild(multiplayerButton);
    container.appendChild(aiPlayerButton);
    container.appendChild(pauseButton);
    container.appendChild(canvas);
    container.appendChild(player1Score);
    container.appendChild(player2Score);

    // Append container to the document body or any desired parent element
    this.target.appendChild(container);
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Input Handler Initialization: An instance of the InputHandler class is created
    //  to handle user input and keep track of game settings.
    const inputHandler = new InputHandler();
inputHandler.setPauseButtonClicked(); // Set initial state to paused

    const KEY_UP = 38;
    const KEY_DOWN = 40;
    const KEY_W = 87; // W key
    const KEY_S = 83; // S key


    multiplayerButton.addEventListener("click", () => {
      inputHandler.setMultiplayerMode();
    });

    aiPlayerButton.addEventListener("click", () => {
      inputHandler.setAIPlayerMode();
    });

    pauseButton.addEventListener("click", () => {
      inputHandler.togglePauseButtonClicked();
      if (inputHandler.isPauseButtonClicked) {
        pauseButton.textContent = "Resume";
      } else {
        pauseButton.textContent = "Pause";
      }
    });

    function vec2(x, y) {
      return { x: x, y: y };
    }

    const ball = new Ball(vec2(200, 200), vec2(10, 10), 20);
    const paddle1 = new Paddle(vec2(0, 50), vec2(15, 15), 20, 160, KEY_W, KEY_S);
    const paddle2 = new Paddle(vec2(canvas.width - 20, 30), vec2(15, 15), 20, 160, KEY_UP, KEY_DOWN);

    const gameLogic = new GameLogic(ball, paddle1, paddle2, canvas);
    const renderer = new Renderer(ctx, canvas);

    function gameUpdate() {
      const keysPressed = inputHandler.getKeysPressed();
      // It retrieves the keys pressed from the InputHandler, determines the game mode (multiplayer or AI player)
      const isMultiplayer = inputHandler.isMultiplayerMode();
      const isAIPlayer = inputHandler.isAIPlayerMode();
      const isPauseButtonClicked = inputHandler.isPauseButtonClicked;

      if (!isPauseButtonClicked) {
        gameLogic.update(keysPressed, isMultiplayer, isAIPlayer);
      }
    }

    function draw() {
      renderer.draw(ball, paddle1, paddle2);
    }

    function gameLoop() {
//  The game loop is implemented using requestAnimationFrame().
//   Inside the loop, the gameUpdate() and draw() functions
//    are called to continuously update and render the game.
      window.requestAnimationFrame(gameLoop);

      gameUpdate();
      draw();
    }

    gameLoop();
  }
}
