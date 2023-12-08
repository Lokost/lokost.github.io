class Bird {
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

    this.box.x = this.x;
    this.box.y = this.y;
    this.box.bottom = this.y + this.height;
    this.box.right = this.x + this.width;
  }

  birdBox() {}
}
