// GameLogic.js
export default class GameLogic {
  constructor(ball, paddle1, paddle2, canvas) {
    this.ball = ball;
    this.paddle1 = paddle1;
    this.paddle2 = paddle2;
    this.canvas = canvas;
  }

  update(keysPressed, isMultiplayer, isAIPlayer, isResetButtonClicked) {
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

    this.increaseScore(this.ball, this.paddle1, this.paddle2);
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


  increaseScore(ball, paddle1, paddle2) {
  const player1ScoreElement = document.getElementById("player1Score");
  const player2ScoreElement = document.getElementById("player2Score");

  if (!player1ScoreElement || !player2ScoreElement) {
    console.error("Score elements not found in the DOM.");
    return;
  }

  if (ball.pos.x <= -ball.radius) {
      paddle2.score += 1;
      player2ScoreElement.textContent = paddle2.score;
      this.respawnBall(ball, this.canvas);
    } else if (ball.pos.x >= this.canvas.width + ball.radius) {
      paddle1.score += 1;
      player1ScoreElement.textContent = paddle1.score;
      this.respawnBall(ball, this.canvas);
    }
}


  increaseScore(ball, paddle1, paddle2) {
    if (ball.pos.x <= -ball.radius) {
      paddle2.score += 1;
      document.getElementById("player2Score").textContent = paddle2.score;
      this.respawnBall(ball, this.canvas);
    } else if (ball.pos.x >= this.canvas.width + ball.radius) {
      paddle1.score += 1;
      document.getElementById("player1Score").textContent = paddle1.score;
      this.respawnBall(ball, this.canvas);
    }
  }

  respawnBall(ball, canvas) {
    if (ball.velocity.x > 0) {
      ball.pos.x = canvas.width - 150;
      ball.pos.y = Math.random() * (canvas.height - 200) + 100;
    }
    if (ball.velocity.x < 0) {
      ball.pos.x = 150;
      ball.pos.y = Math.random() * (canvas.height - 200) + 100;
    }
    ball.velocity.x *= -1;
    ball.velocity.y *= 1;
  }
}
