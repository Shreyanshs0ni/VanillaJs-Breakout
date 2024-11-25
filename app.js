const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
const blockHeight = 20;
const blockWidth = 100;
const boardHeight = 400;
const boardWidth = 780;
const ballDiameter = 20;
let score = 0;

const userStart = [340, 10];
let currentPosition = userStart;

let timeId;
let xDirection = -2;
let yDirection = 2;

const ballStart = [380, 30];
let ballCurrentPosition = ballStart;

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis + blockWidth, yAxis + blockHeight];
    this.topRight = [xAxis, (yAxis = blockHeight)];
  }
}

const blocks = [
  new Block(10, 350),
  new Block(120, 350),
  new Block(230, 350),
  new Block(340, 350),
  new Block(450, 350),
  new Block(560, 350),
  new Block(670, 350),
  new Block(10, 300),
  new Block(120, 300),
  new Block(230, 300),
  new Block(340, 300),
  new Block(450, 300),
  new Block(560, 300),
  new Block(670, 300),
  new Block(10, 250),
  new Block(120, 250),
  new Block(230, 250),
  new Block(340, 250),
  new Block(450, 250),
  new Block(560, 250),
  new Block(670, 250),
];

function addBlock() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}
addBlock();

function drawUser() {
  user.style.left = userStart[0] + "px";
  user.style.bottom = userStart[1] + "px";
}

function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}
const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 20;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] <= boardWidth - blockWidth - 10) {
        currentPosition[0] += 20;
        drawUser();
      }
      break;
  }
}
document.addEventListener("keydown", moveUser);

const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

timeId = setInterval(moveBall, 20);

function checkForCollisions() {
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;
      if (blocks.length === 0) {
        scoreDisplay.innerHTML = `you win`;
        clearInterval(timeId);
        document.removeListener("keydown", moveUser);
      }
    }
  }

  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }

  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timeId);
    scoreDisplay.textContent = `you lose`;
    document.removeEventListener("keydown", moveBall);
  }
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
