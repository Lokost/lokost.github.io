export default class Pipe {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = 50;
    this.gap = 100;
    this.x = 400;
    this.y = canvas.height - 200;
    this.right = this.x + this.width;

    this.top = {
      x: this.x,
      y: this.y - this.gap,
      right: this.width + this.x,
      height: this.y,
    };

    this.bottom = {
      x: this.x,
      y: this.y + this.gap,
      right: this.width + this.x,
      height: this.canvas.height - this.y - this.gap,
    };
  }

  drawPipes(ctx) {
    ctx.fillStyle = "#00F";
    ctx.fillRect(this.x, -this.gap, this.width, this.y);
    ctx.fillRect(
      this.x,
      this.y + this.gap,
      this.width,
      this.canvas.height - this.y
    );
  }

  move(score) {
    this.x -= 2 + (score / 10 + 0.5);
    this.right = this.x + this.width;

    if (this.x < -this.width) {
      this.x = this.canvas.width;
      this.y = Math.random() * (this.canvas.height - this.gap) + this.width;
      this.right = this.x + this.width;
    }

    this.top = {
      x: this.x,
      y: this.y - this.gap,
      right: this.width + this.x,
      height: this.y,
    };

    this.bottom = {
      x: this.x,
      y: this.y + this.gap,
      right: this.width + this.x,
      height: this.canvas.height - this.y - this.gap,
    };
  }
}
