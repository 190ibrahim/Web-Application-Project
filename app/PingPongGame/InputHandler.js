// InputHandler.js
export default class InputHandler {
  constructor() {
    this.keysPressed = [];
    this.isMultiplayer = false;
    this.isAIPlayer = false;
    this.resetButtonClicked  = false;
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

  setResetButtonClicked() {
    this.resetButtonClicked  = true;
  }

  resetResetButtonClicked() {
    this.resetButtonClicked  = false;
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
    this.resetResetButtonClicked();
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

  isResetButtonClicked() {
    return this.resetButtonClicked ;
  }


  isPauseButtonClicked() {
    return this.isPauseButtonClicked;
  }

  togglePauseButtonClicked() {
    this.isPauseButtonClicked = !this.isPauseButtonClicked;
  }
}