const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const snakeSize = 10;
let snake = [{x: 50, y: 50}];
let direction = "RIGHT";
let food = generateFood();

document.addEventListener("keydown", changeDirection);

function gameLoop() {
    moveSnake();
    if (checkCollisions()) {
        alert("Game Over!");
        resetGame();
    }
    if (checkFoodCollision()) {
        snake.push({x: food.x, y: food.y});
        food = generateFood();
    }

    drawGame();
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

function resetGame() {
    snake = [{x: 50, y: 50}];
    direction = "RIGHT";
    food = generateFood();
}

setInterval(gameLoop, 100);
