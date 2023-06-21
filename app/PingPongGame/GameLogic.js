export default class GameLogic {
  constructor(ball, paddle1, paddle2, canvas) {
    this.ball = ball;
    this.paddle1 = paddle1;
    this.paddle2 = paddle2;
    this.canvas = canvas;

    // Get the score elements from the DOM
    this.player1ScoreElement = document.getElementById("player1Score");
    this.player2ScoreElement = document.getElementById("player2Score");

    // Check if the score elements exist in the DOM
    if (!this.player1ScoreElement || !this.player2ScoreElement) {
      console.error("Score elements not found in the DOM.");
      return;
    }

    this.player1Score = 0;
    this.player2Score = 0;

    this.updateScore();
  }

  // Update the game state
  update(keysPressed, isMultiplayer, isAIPlayer) {
    this.ball.update(); // Update the ball position
    this.paddle1.update(keysPressed, isMultiplayer, isAIPlayer); // Update paddle1 position
    this.paddleCollisionWithTheEdges(this.paddle1); // Check if paddle1 collides with the canvas edges
    this.ballCollisionWithTheEdges(this.ball); // Check if the ball collides with the canvas edges

    if (isMultiplayer) {
      this.paddle2.update(keysPressed, isMultiplayer, isAIPlayer); // Update paddle2 position
      this.paddleCollisionWithTheEdges(this.paddle2); // Check if paddle2 collides with the canvas edges
    } else if (isAIPlayer) {
      this.player2AI(this.ball, this.paddle2); // Control paddle2 with AI
    }

    this.ballPaddleCollision(this.ball, this.paddle1); // Check if the ball collides with paddle1
    this.ballPaddleCollision(this.ball, this.paddle2); // Check if the ball collides with paddle2

    this.checkScore(); // Check if the ball crosses the score boundaries
  }

  // Handle paddle collision with the canvas edges
  paddleCollisionWithTheEdges(paddle) {
    if (paddle.pos.y <= 0) {
      paddle.pos.y = 0; // Prevent the paddle from going above the canvas
    }
    if (paddle.pos.y + paddle.height >= this.canvas.height) {
      paddle.pos.y = this.canvas.height - paddle.height; // Prevent the paddle from going below the canvas
    }
  }

  // Handle ball collision with the canvas edges
  ballCollisionWithTheEdges(ball) {
    if (ball.pos.y + ball.radius >= this.canvas.height) {
      ball.velocity.y *= -1; // Reflect the ball's vertical velocity when it hits the bottom edge of the canvas
    }

    if (ball.pos.y - ball.radius <= 0) {
      ball.velocity.y *= -1; // Reflect the ball's vertical velocity when it hits the top edge of the canvas
    }
  }

  // Handle ball collision with a paddle
  ballPaddleCollision(ball, paddle) {
    let dx = Math.abs(ball.pos.x - paddle.getCenter().x);
    let dy = Math.abs(ball.pos.y - paddle.getCenter().y);
    if (
      dx <= ball.radius + paddle.getHalfWidth() &&
      dy <= paddle.getHalfHeight() + ball.radius
    ) {
      ball.velocity.x *= -1; // Reflect the ball's horizontal velocity when it collides with a paddle
    }
  }

  // AI logic for controlling paddle2
  player2AI(ball, paddle) {
    if (ball.velocity.x > 0) {
      if (ball.pos.y > paddle.pos.y) {
        paddle.pos.y += paddle.velocity.y; // Move the paddle down if the ball is below it
        if (paddle.pos.y + paddle.height >= this.canvas.height) {
          paddle.pos.y = this.canvas.height - paddle.height; // Prevent the paddle from going below the canvas
        }
      }
      if (ball.pos.y < paddle.pos.y) {
        paddle.pos.y -= paddle.velocity.y; // Move the paddle up if the ball is above it
        if (paddle.pos.y <= 0) {
          paddle.pos.y = 0; // Prevent the paddle from going above the canvas
        }
      }
    }
  }

  // Check if the ball crosses the score boundaries
  checkScore() {
    if (this.ball.pos.x <= -this.ball.radius) {
      this.player2Score += 1; // Increment player 2's score
      this.updateScore(); // Update the displayed scores
      this.respawnBall(); // Reset the ball position
    } else if (this.ball.pos.x >= this.canvas.width + this.ball.radius) {
      this.player1Score += 1; // Increment player 1's score
      this.updateScore(); // Update the displayed scores
      this.respawnBall(); // Reset the ball position
    }
  }

  // Update the displayed scores
  updateScore() {
    this.player1ScoreElement.textContent = this.player1Score;
    this.player2ScoreElement.textContent = this.player2Score;
  }

  // Reset the ball position and velocity
  respawnBall() {
    if (this.ball.velocity.x > 0) {
      this.ball.pos.x = this.canvas.width - 150; // Reset the ball's x position on the right side
      this.ball.pos.y = Math.random() * (this.canvas.height - 200) + 100; // Randomize the ball's y position
    }
    if (this.ball.velocity.x < 0) {
      this.ball.pos.x = 150; // Reset the ball's x position on the left side
      this.ball.pos.y = Math.random() * (this.canvas.height - 200) + 100; // Randomize the ball's y position
    }
    this.ball.velocity.x *= -1; // Reverse the ball's horizontal velocity
    this.ball.velocity.y *= 1; // Reset the ball's vertical velocity
  }
}
