// InputHandler.js
export default class InputHandler {
  constructor() {
    this.keysPressed = [];
    this.isMultiplayer = false;
    this.isAIPlayer = false;
    this.isPauseButtonClicked = false;
    window.addEventListener("keydown", (e) => {
      this.keysPressed[e.keyCode] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.keysPressed[e.keyCode] = false;
    });


  }

  setMultiplayerMode() {
    this.isMultiplayer = true;
    this.isAIPlayer = false; // Reset AI player mode
  }

  setAIPlayerMode() {
    this.isAIPlayer = true;
    this.isMultiplayer = false; // Reset multiplayer mode
  }

  setPauseButtonClicked() {
    this.isPauseButtonClicked = true;
  }

  resetPauseButtonClicked() {
    this.isPauseButtonClicked = false;
  }


  reset() {
    this.keysPressed = [];
    this.isMultiplayer = false;
    this.isAIPlayer = false;
  }

  getKeysPressed() {
    return this.keysPressed;
  }

  isMultiplayerMode() {
    return this.isMultiplayer;
  }

  isAIPlayerMode() {
    return this.isAIPlayer;
  }

  isPauseButtonClicked() {
    return this.isPauseButtonClicked;
  }

  togglePauseButtonClicked() {
    this.isPauseButtonClicked = !this.isPauseButtonClicked;
  }
}