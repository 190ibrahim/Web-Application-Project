// GameLogic.js
export default class GameLogic {
  constructor(ball, paddle1, paddle2, canvas) {
    this.ball = ball;
    this.paddle1 = paddle1;
    this.paddle2 = paddle2;
    this.canvas = canvas;

    this.player1ScoreElement = document.getElementById("player1Score");
    this.player2ScoreElement = document.getElementById("player2Score");

    if (!this.player1ScoreElement || !this.player2ScoreElement) {
      console.error("Score elements not found in the DOM.");
      return;
    }

    this.player1Score = 0;
    this.player2Score = 0;

    this.updateScore();
  }

  update(keysPressed, isMultiplayer, isAIPlayer) {
    this.ball.update();
    this.paddle1.update(keysPressed, isMultiplayer, isAIPlayer);
    this.paddleCollisionWithTheEdges(this.paddle1);
    this.ballCollisionWithTheEdges(this.ball);

    if (isMultiplayer) {
      this.paddle2.update(keysPressed, isMultiplayer, isAIPlayer);
      this.paddleCollisionWithTheEdges(this.paddle2);
    } else if (isAIPlayer) {
      this.player2A1(this.ball, this.paddle2);
    }

    this.ballPaddleCollision(this.ball, this.paddle1);
    this.ballPaddleCollision(this.ball, this.paddle2);

    this.checkScore();
  }

  paddleCollisionWithTheEdges(paddle) {
    if (paddle.pos.y <= 0) {
      paddle.pos.y = 0;
    }
    if (paddle.pos.y + paddle.height >= this.canvas.height) {
      paddle.pos.y = this.canvas.height - paddle.height;
    }
  }

  ballCollisionWithTheEdges(ball) {
    if (ball.pos.y + ball.radius >= this.canvas.height) {
      ball.velocity.y *= -1;
    }

    if (ball.pos.y - ball.radius <= 0) {
      ball.velocity.y *= -1;
    }
  }

  ballPaddleCollision(ball, paddle) {
    let dx = Math.abs(ball.pos.x - paddle.getCenter().x);
    let dy = Math.abs(ball.pos.y - paddle.getCenter().y);
    if (
      dx <= ball.radius + paddle.getHalfWidth() &&
      dy <= paddle.getHalfHeight() + ball.radius
    ) {
      ball.velocity.x *= -1;
    }
  }

  player2A1(ball, paddle) {
    if (ball.velocity.x > 0) {
      if (ball.pos.y > paddle.pos.y) {
        paddle.pos.y += paddle.velocity.y;
        if (paddle.pos.y + paddle.height >= this.canvas.height) {
          paddle.pos.y = this.canvas.height - paddle.height;
        }
      }
      if (ball.pos.y < paddle.pos.y) {
        paddle.pos.y -= paddle.velocity.y;
        if (paddle.pos.y <= 0) {
          paddle.pos.y = 0;
        }
      }
    }
  }

  checkScore() {
    if (this.ball.pos.x <= -this.ball.radius) {
      this.player2Score += 1;
      this.updateScore();
      this.respawnBall();
    } else if (this.ball.pos.x >= this.canvas.width + this.ball.radius) {
      this.player1Score += 1;
      this.updateScore();
      this.respawnBall();
    }
  }

  updateScore() {
    this.player1ScoreElement.textContent = this.player1Score;
    this.player2ScoreElement.textContent = this.player2Score;
  }

  respawnBall() {
    if (this.ball.velocity.x > 0) {
      this.ball.pos.x = this.canvas.width - 150;
      this.ball.pos.y = Math.random() * (this.canvas.height - 200) + 100;
    }
    if (this.ball.velocity.x < 0) {
      this.ball.pos.x = 150;
      this.ball.pos.y = Math.random() * (this.canvas.height - 200) + 100;
    }
    this.ball.velocity.x *= -1;
    this.ball.velocity.y *= 1;
  }
}