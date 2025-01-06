export default class Bird {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = 1;
    this.acceleration = 0.14;
    this.speed = -5;
    this.width = 30;
    this.height = 30;
    this.sprite = new Image();
    this.sprite.src = "./assets/bird.png";

    this.box = {
      x: this.x,
      y: this.y,
      bottom: this.y + this.height,
      right: this.x + this.width,
    };
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.box = {
      x: this.x,
      y: this.y,
      bottom: this.y + this.height,
      right: this.x + this.width,
    };
  }

  draw(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y);
  }

  move() {
    this.speed += this.acceleration;
    this.y += this.speed;
  }
}
