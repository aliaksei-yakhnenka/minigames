var food = [];
var turns = [];
var snake = [
  {x: 5, y: 0, d: DIR_RIGHT},
  {x: 4, y: 0, d: DIR_RIGHT},
  {x: 3, y: 0, d: DIR_RIGHT},
  {x: 2, y: 0, d: DIR_RIGHT},
  {x: 1, y: 0, d: DIR_RIGHT},
  {x: 0, y: 0, d: DIR_RIGHT}
];

function _onGameInit() {
  addFood();
}

function _onGameUpdate() {
  var i;
  for (i = snake.length - 1; i >= 0; i--) {
    var next = snake[i - 1] || false;
    if (next && next.d != snake[i].d) {
      snake[i].d = next.d;
    }
  }

  var turn = turns.shift();
  if (turn) {
    snake[0].d = turn;
  }

  var lastSnake = {
    x: snake[snake.length - 1].x,
    y: snake[snake.length - 1].y,
    d: snake[snake.length - 1].d
  };

  for (i = 0; i < snake.length; i++) {
    movePart(snake[i]);
  }

  if (checkFood()) {
    snake.push(lastSnake);
  }
}

function _onGameUpdateAfter() {
  if (checkSnakeHeadIntersection()) {
    gameOver();
  }
}

function _onGameDraw() {
  drawFood();
  drawSnake();
}

function _onGameOver() {
  drawCell(snake[0].x, snake[0].y, COLOR_CROSS);
}

function _onKeyDown(key) {
  var curr = turns[0] || snake[0].d;
  switch (key) {
    case KEYS.LEFT:
      if (curr != DIR_RIGHT) {
        addTurn(DIR_LEFT);
      }
      break;
    case KEYS.UP:
      if (curr != DIR_DOWN) {
        addTurn(DIR_UP);
      }
      break;
    case KEYS.RIGHT:
      if (curr != DIR_LEFT) {
        addTurn(DIR_RIGHT);
      }
      break;
    case KEYS.DOWN:
      if (curr != DIR_UP) {
        addTurn(DIR_DOWN);
      }
      break;
  }
}

function addTurn(dir) {
  turns.push(dir);
}

function checkFood() {
  for (var i = 0; i < food.length; i++) {
    if (checkSnakeIntersection(food[i])) {
      food.splice(i, 1);
      addFood();
      gameAddScore();
      return true;
    }
  }

  return false;
}

function addFood() {
  while (true) {
    var newFood = {
      x: rand_between(0, gameWidth - 1),
      y: rand_between(0, gameHeight - 1)
    };

    if (!checkSnakeIntersection(newFood)) {
      food.push(newFood);
      return;
    }
  }
}

function checkSnakeIntersection(cell) {
  for (var i = 0; i < snake.length; i++) {
    if (intersects(snake[i], cell)) {
      return true;
    }
  }

  return false;
}

function checkSnakeHeadIntersection() {
  for (var i = 1; i < snake.length; i++) {
    if (intersects(snake[i], snake[0])) {
      return true;
    }
  }

  return false;
}

function movePart(part) {
  switch (part.d) {
    case 1:
      part.y -= 1;
      break;
    case 2:
      part.x -= 1;
      break;
    case 3:
      part.y += 1;
      break;
    case 4:
      part.x += 1;
      break;
  }

  checkPartTeleport(part);
}

function checkPartTeleport(part) {
  if (part.x < 0) {
    part.x = gameWidth - 1;
  }
  if (part.y < 0) {
    part.y = gameHeight - 1;
  }
  if (part.x == gameWidth) {
    part.x = 0;
  }
  if (part.y == gameHeight) {
    part.y = 0;
  }
}

function drawSnake() {
  for (var i = 0; i < snake.length; i++) {
    drawCell(snake[i].x, snake[i].y, COLOR_PLAYER);
  }
}

function drawFood() {
  for (var i = 0; i < food.length; i++) {
    drawCell(food[i].x, food[i].y, COLOR_OBJECT);
  }
}
