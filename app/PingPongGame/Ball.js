export default class Ball {

constructor(pos, velocity, radius) {
this.pos = pos;
this.velocity = velocity;
this.radius = radius;
}

draw() {
ctx.fillStyle = "red";
ctx.beginPath();
ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
ctx.fill();
}

update() {
this.pos.x += this.velocity.x;
this.pos.y += this.velocity.y;
}

checkCollision(paddle) {
if (this.pos.x > paddle.pos.x - paddle.width / 2 && this.pos.x < paddle.pos.x + paddle.width / 2 && this.pos.y > paddle.pos.y - paddle.height / 2 && this.pos.y < paddle.pos.y + paddle.height / 2) {
this.velocity.x *= -1;
return true;
}
return false;
}

}