export default class InputHandler {
  constructor() {
    this.keysPressed = []; // Array to store the keys that are currently being pressed
    this.isMultiplayer = false; 
    this.isAIPlayer = false;
    this.isPauseButtonClicked = false;

    // Event listener for keydown event to track pressed keys
    window.addEventListener("keydown", (e) => {
      this.keysPressed[e.keyCode] = true; // Set the corresponding key code as true in the keysPressed array
    });

    // Event listener for keyup event to track released keys
    window.addEventListener("keyup", (e) => {
      this.keysPressed[e.keyCode] = false; // Set the corresponding key code as false in the keysPressed array
    });
  }

  // Set the input handler to multiplayer mode
  setMultiplayerMode() {
    this.isMultiplayer = true;
    this.isAIPlayer = false; // Reset AI player mode
  }

  // Set the input handler to AI player mode
  setAIPlayerMode() {
    this.isAIPlayer = true;
    this.isMultiplayer = false; // Reset multiplayer mode
  }

  // Set the pause button as clicked
  setPauseButtonClicked() {
    this.isPauseButtonClicked = true;
  }

  // Reset the pause button click state
  resetPauseButtonClicked() {
    this.isPauseButtonClicked = false;
  }

  // Reset the input handler state
  reset() {
    this.keysPressed = [];
    this.isMultiplayer = false;
    this.isAIPlayer = false;
  }

  // Get the array of keys that are currently pressed
  getKeysPressed() {
    return this.keysPressed;
  }

  // Check if the input handler is in multiplayer mode
  isMultiplayerMode() {
    return this.isMultiplayer;
  }

  // Check if the input handler is in AI player mode
  isAIPlayerMode() {
    return this.isAIPlayer;
  }

  // Check if the pause button is clicked
  isPauseButtonClicked() {
    return this.isPauseButtonClicked;
  }

  // Toggle the state of the pause button clicked flag
  togglePauseButtonClicked() {
    this.isPauseButtonClicked = !this.isPauseButtonClicked;
  }
}
