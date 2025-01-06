import Bird from "./flappyBird.js";
import Pipe from "./pipe.js";

// DOM
const game = {
  canvas: document.getElementById("game-canvas"),
  ctx: document.getElementById("game-canvas").getContext("2d"),
  gameContainer: document.getElementById("game-container"),
  scoreDisplay: document.getElementById("score-display"),
  jumpButton: document.getElementById("jump-button"),
};

const endMenu = {
  menu: document.getElementById("end-menu"),
  restartButton: document.getElementById("restart-button"),
  endScore: document.getElementById("end-score"),
  highScore: document.getElementById("end-highscore"),
};

const startMenu = {
  menu: document.getElementById("start"),
  startButton: document.getElementById("start-button"),
  startMsg: document.getElementById("start-mensage"),
};

const birdImg = new Image();
birdImg.src = "assets/bird.png";

// Objects
const bird = new Bird(50, 50);
const pipes = new Pipe(game.canvas);

// UI
let score = 0;
let highScore = 0;

// Game
let passed = false;
let started = false;

// Game functions
function showGame() {
  startMenu.menu.style.display = "none";
  game.gameContainer.style.display = "flex";
  game.gameContainer.style.animation = "zoom-in 1s ease-in-out forwards";
  if (
    navigator.userAgent.match(
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    )
  ) {
    game.jumpButton.style.display = "flex";
    game.jumpButton.style.animation = "zoom-in 1s ease-in-out forwards";
  }
}

function jump() {
  if (!started) {
    console.log("start");
    startGame();
  } else {
    bird.velocity = bird.speed;
    console.log(bird.velocity);
  }
}

function startGame() {
  startMenu.startMsg.style.visibility = "hidden";
  started = true;
  loop();
}

function increaseScore() {
  let passedH = bird.box.x >= pipes.x;
  let passedSuccess = bird.box.x >= pipes.right;
  let passedVDown = bird.box.y > pipes.y + pipes.gap;
  let passedVUp = bird.box.bottom < pipes.y + pipes.gap;
  let gapBiggerThanBird = pipes.gap > bird.height;
  let scoreIsZero = score <= 0;

  if (passedSuccess && (passedVDown || passedVUp) && !passedH) {
    score++;
    game.scoreDisplay.innerHTML = score;
    passed = true;
  }

  if (gapBiggerThanBird) {
    passed = false;
  }

  if (scoreIsZero) {
    game.scoreDisplay.style.visibility = "hidden";
  } else {
    game.scoreDisplay.style.visibility = "visible";
  }
}

function collisionCheck() {
  let collisionPipeUP =
    bird.box.right > pipes.top.x &&
    bird.box.x < pipes.top.right &&
    bird.box.y < pipes.top.y;

  let collisionPipeDown =
    bird.box.right > pipes.bottom.x &&
    bird.box.x < pipes.bottom.right &&
    bird.box.bottom > pipes.bottom.y;

  let collisionBorders =
    bird.box.bottom >= game.canvas.height || bird.box.y <= 0;
  if (collisionPipeUP || collisionPipeDown || collisionBorders) {
    return true;
  }
  return false;
}

function showEndMenu() {
  endMenu.menu.style.display = "flex";
  game.gameContainer.classList.add("backdrop-blur");
  endMenu.menu.style.animation = "zoom-in ease-in-out .4s forwards";
  endMenu.endScore.innerHTML = score;

  if (highScore < score) {
    highScore = score;
  }

  endMenu.highScore.innerHTML = highScore;
}

function hideEndMenu() {
  endMenu.menu.style.animation = "zoom-in ease-in-out 1s reverse forwards";
  endMenu.menu.style.display = "none";
  game.gameContainer.classList.remove("backdrop-blur");
}

function resetGame() {
  bird.x = 50;
  bird.y = 50;
  pipes.x = 400;
  pipes.y = game.canvas.height - 200;
  pipes.gap = 150;

  score = 0;
}

function loop() {
  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
  bird.draw(game.ctx);
  pipes.drawPipes(game.ctx);

  if (collisionCheck()) {
    showEndMenu();
    return;
  }

  pipes.move(score);
  bird.move();

  increaseScore();
  requestAnimationFrame(loop);
}
// Buttons Actions
window.onkeyup = function (e) {
  if (e.code == "Space" || e.code == "ArrowUp") {
    jump();
  }
};

game.canvas.ontouchstart = function () {
  jump();
};

startMenu.startButton.onclick = function () {
  showGame();
};

endMenu.restartButton.onclick = function () {
  hideEndMenu();
  resetGame();
  loop();
};
