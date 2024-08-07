// Get all the elements from HTML

// game elements
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score-display");

// End menu elements
const resetBtt = document.getElementById("restart-button");
const endMenu = document.getElementById("end-menu");
const endScore = document.getElementById("end-score");
const endHigh = document.getElementById("end-highscore");

// start elements
const startMenu = document.getElementById("start");
const startBtt = document.getElementById("start-button");
const startMsg = document.getElementById("start-mensage");
const jumpBtt = document.getElementById("jump");

// Bird image
const birdImg = new Image();
birdImg.src = "assets/flappy_dunk.png";

// bird variables
const bird = {
  x: 50,
  y: 50,
  velocity: 1,
  acceleration: 0.14,
  speed: -5,
  width: 30,
  heigth: 30,
};

const birdBox = {
  x: bird.x,
  y: bird.y,
  bottom: bird.y + bird.heigth,
  right: bird.x + bird.width,
};

// pipes variables
const pipe = {
  width: 50,
  gap: 150,
  x: 400,
  y: canvas.height - 200,
  right: this.x + this.width,
};

const topPipeBox = {
  x: pipe.x,
  y: pipe.y - pipe.gap + bird.heigth,
  right: pipe.width + pipe.x,
  height: pipe.y,
};

const bottomPipeBox = {
  x: pipe.x,
  y: pipe.y + pipe.gap + bird.heigth,
  right: pipe.width + pipe.x,
  height: canvas.height - pipe.y - pipe.gap,
};

// score and highscore variables
let score = 0;
let highscore = 0;

// Helper variable to increase pontuation!
let passed = false;
let started = false;

// space action into the game
document.body.onkeyup = function (e) {
  if (e.code == "Space") {
    jump();
  }
};

jumpBtt.addEventListener("click", jump);

resetBtt.addEventListener("click", function () {
  hideEndMenu();
  resetGame();
  loop();
});

startBtt.addEventListener("click", function () {
  showGame();
});

function showGame() {
  startMenu.style.display = "none";
  gameContainer.style.display = "flex";
  gameContainer.style.animation = "zoom-in 1s ease-in-out forwards";
  jumpBtt.style.display = "flex";
  jumpBtt.style.animation = "zoom-in 1s ease-in-out forwards";
}

function jump() {
  if (!started) {
    startGame();
  } else {
    bird.velocity = bird.speed;
  }
}

function startGame() {
  startMsg.style.visibility = "hidden";
  started = true;
  loop();
}

function increaseScore() {
  let passedH = birdBox.x >= pipe.x;
  let passedSuccess = birdBox.x >= pipe.right;
  let passedVDown = birdBox.y > pipe.y + pipe.gap;
  let passedVUp = birdBox.bottom < pipe.y + pipe.gap;
  let gapMajorThanBird = pipe.gap > bird.height;
  let scoreIsZero = score <= 0;

  if (passedSuccess && (passedVDown || passedVUp) && !passedH) {
    score++;
    scoreDisplay.innerHTML = score;
    passed = true;
  }

  if (gapMajorThanBird) {
    passed = false;
  }

  if (scoreIsZero) {
    scoreDisplay.style.visibility = "hidden";
  } else {
    scoreDisplay.style.visibility = "visible";
  }
}

function reloadCollision() {
  birdBox.x = bird.x;
  birdBox.y = bird.y;
  birdBox.bottom = bird.y + bird.heigth;
  birdBox.right = bird.x + bird.width;

  topPipeBox.x = pipe.x;
  topPipeBox.y = pipe.y - pipe.gap + bird.heigth;
  topPipeBox.right = pipe.width + pipe.x;
  topPipeBox.height = pipe.y;

  bottomPipeBox.x = pipe.x;
  bottomPipeBox.y = pipe.y + pipe.gap + bird.heigth;
  bottomPipeBox.right = pipe.width + pipe.x;
  bottomPipeBox.height = canvas.height - pipe.y - pipe.gap;
}

function collisionCheck() {
  reloadCollision();

  let collisionPipeUP =
    birdBox.right > topPipeBox.x &&
    birdBox.x < topPipeBox.right &&
    birdBox.y < topPipeBox.y;

  let collisionPipeDown =
    birdBox.right > bottomPipeBox.x &&
    birdBox.x < bottomPipeBox.right &&
    birdBox.bottom > bottomPipeBox.y;

  let collisionBorders = birdBox.bottom >= canvas.height || birdBox.y <= 0;

  if (collisionPipeUP || collisionPipeDown || collisionBorders) {
    return true;
  }
  return false;
}

// after game
function showEndMenu() {
  endMenu.style.display = "flex";
  gameContainer.classList.add("backdrop-blur");
  endMenu.style.animation = "zoom-in ease-in-out .4s forwards";
  endScore.innerHTML = score;

  if (highscore < score) {
    highscore = score;
  }

  endHigh.innerHTML = highscore;
}

function hideEndMenu() {
  endMenu.style.animation = "zoom-in ease-in-out 1s reverse forwards";
  endMenu.style.display = "none";
  gameContainer.classList.remove("backdrop-blur");
}

function resetGame() {
  bird.x = 50;
  bird.y = 50;
  bird.velocity = 1;
  bird.acceleration = 0.14;

  pipe.x = 400;
  pipe.y = canvas.height - 200;
  pipe.gap = 150;

  score = 0;
}

//principal function
function loop() {
  // reset context after every loop iteration
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Flappy Bird
  ctx.drawImage(birdImg, bird.x, bird.y);

  // Draw pipes
  ctx.fillStyle = "#00F";
  ctx.fillRect(pipe.x, -100, pipe.width, pipe.y);
  ctx.fillRect(pipe.x, pipe.y + pipe.gap, pipe.width, canvas.height - pipe.y);

  // check collision
  if (collisionCheck()) {
    showEndMenu();
    return;
  }

  pipe.x -= 2 + (score / 10 + 0.5);
  pipe.right = pipe.x + pipe.width;

  if (pipe.x < -pipe.width) {
    pipe.x = 400;
    pipe.y = Math.random() * (canvas.height - pipe.gap) + pipe.width;
  }

  //Apply gravity to the bird and let it move
  bird.velocity += bird.acceleration;
  bird.y += bird.velocity;

  increaseScore();
  requestAnimationFrame(loop);
}

// Clean Code Applied
// Written by Gabriel Gomes: https://github.com/lokost

// Original code by: Patrick https://github.com/patlov/flappy_bird_js
