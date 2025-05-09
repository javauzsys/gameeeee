const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const snakeSize = 10;
let snake = [{x: 50, y: 50}];
let direction = "RIGHT";
let food = generateFood();
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameStarted = false;

const startBtn = document.getElementById("startBtn");
const retryBtn = document.getElementById("retryBtn");
const scoreDisplay = document.getElementById("scoreDisplay");
const finalScoreDisplay = document.getElementById("finalScore");
const finalRecordScoreDisplay = document.getElementById("finalRecordScore");
const gameOverMessage = document.getElementById("gameOver");
const newRecordMessage = document.getElementById("newRecord");

startBtn.addEventListener("click", startGame);
retryBtn.addEventListener("click", restartGame);

document.addEventListener("keydown", changeDirection);
document.getElementById("up").addEventListener("click", () => changeDirection({ key: "ArrowUp" }));
document.getElementById("down").addEventListener("click", () => changeDirection({ key: "ArrowDown" }));
document.getElementById("left").addEventListener("click", () => changeDirection({ key: "ArrowLeft" }));
document.getElementById("right").addEventListener("click", () => changeDirection({ key: "ArrowRight" }));

function startGame() {
    gameStarted = true;
    score = 0;
    snake = [{x: 50, y: 50}];
    direction = "RIGHT";
    food = generateFood();

    canvas.style.display = "block";
    startBtn.style.display = "none";
    retryBtn.style.display = "none";
    scoreDisplay.style.display = "block";
    document.querySelector(".controls").style.display = "flex";
    gameOverMessage.style.display = "none";
    newRecordMessage.style.display = "none";

    setInterval(gameLoop, 100);
}

function restartGame() {
    gameStarted = true;
    score = 0;
    snake = [{x: 50, y: 50}];
    direction = "RIGHT";
    food = generateFood();

    canvas.style.display = "block";
    retryBtn.style.display = "none";
    scoreDisplay.style.display = "block";
    document.querySelector(".controls").style.display = "flex";
    gameOverMessage.style.display = "none";
    newRecordMessage.style.display = "none";

    setInterval(gameLoop, 100);
}

function gameLoop() {
    moveSnake();
    if (checkCollisions()) {
        gameOver();
    }
    if (checkFoodCollision()) {
        score++;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }
        food = generateFood();
    }

    drawGame();
    scoreDisplay.innerText = `Score: ${score}`;
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green";
    for (let segment of snake) {
        ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

function moveSnake() {
    const head = { ...snake[0] };

    if (direction === "LEFT") head.x -= snakeSize;
    if (direction === "RIGHT") head.x += snakeSize;
    if (direction === "UP") head.y -= snakeSize;
    if (direction === "DOWN") head.y += snakeSize;

    snake.unshift(head);
    snake.pop();
}

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function checkCollisions() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) return true;
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) return true;
    }
    return false;
}

function checkFoodCollision() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

function generateFood() {
    let foodX = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
    let foodY = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;
    return { x: foodX, y: foodY };
}

function gameOver() {
    gameStarted = false;
    gameOverMessage.style.display = "block";
    finalScoreDisplay.innerText = score;
    if (score > highScore) {
        newRecordMessage.style.display = "block";
        finalRecordScoreDisplay.innerText = score;
    }
    retryBtn.style.display = "block";
    canvas.style.display = "none";
    scoreDisplay.style.display = "none";
    document.querySelector(".controls").style.display = "none";
}

