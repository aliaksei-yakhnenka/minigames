/**
 * Returns a random integer number between supplied min and max.
 */
function rand_between(min, max) {
  return Math.floor(Math.random() * max) + min;
}

/**
 * Returns true with a supplied percentage of probability.
 */
function chance(probability) {
  return rand_between(1, 10000) <= probability * 100;
}

function matrixTurn(matrix) {
  var _matrix = [];
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[0].length; j++) {
      if (!_matrix[j]) {
        _matrix[j] = [];
      }
      _matrix[j][matrix.length - i - 1] = matrix[i][j];
    }
  }
  
  return _matrix;
}

/**
 * Returns true if both cells have same coordinates.
 */
function intersects(cell1, cell2) {
  return cell1.x == cell2.x && cell1.y == cell2.y;
}

function gameInit() {
  canvas = document.getElementById('minigame-canvas');
  if (!canvas || !canvas.getContext) {
    return;
  }
  
  _onGameInit = _onGameInit || function(){};
  _onGameOver = _onGameOver || function(){};
  _onGameRunBefore = _onGameRunBefore || function(){};
  _onGameRunAfter = _onGameRunAfter || function(){};
  _onGameUpdate = _onGameUpdate || function(){};
  _onGameDraw = _onGameDraw || function(){};
  _onKeyDown = _onKeyDown || function(event){};
  
  context = canvas.getContext('2d');
  window.addEventListener('keydown', gameKeydown, true);
  
  _onGameInit();
  gameCycle = setInterval(gameRun, gameCycleUpdateInterval);
}

function gameRun() {
  _onGameRunBefore();
  
  gameCycleUpdateTracker += gameCycleUpdateInterval;
  if (gameCycleUpdateTracker >= 1000 - (gameSpeed * gameCycleUpdateInterval)) {
    gameCycleUpdateTracker = 0;
    _onGameUpdate();
  }
  
  clearCanvas();
  drawGrid();
  drawScoretable();

  _onGameDraw();
  
  _onGameRunAfter();
}

function gameKeydown(event) {
  _onKeyDown(event.keyCode);
}

function gameOver() {
  clearInterval(gameCycle);
  _onGameOver();

  drawMessage('GAME OVER', COLOR_GAMEOVER);
}

function gameAddScore() {
  gameScore.score++;

  if (gameGetScore() == Math.pow(5, gameSpeed)) {
    gameSpeedUp();
  }
}

function gameGetScore() {
  return gameScore.score;
}

function gameSpeedUp() {
  gameSpeed++;
}

/**
 * Clears grid and scoretable.
 */
function clearCanvas() {
  context.clearRect(0, 0, 300, 400);
}

/**
 * Draws the grid.
 */
function drawGrid() {
  for (var x = 0; x < gameWidth; x++) {
    for (var y = 0; y < gameHeight; y++) {
      drawCell(x, y, COLOR_GRID);
    }
  }
}

/**
 * Draws a cell in x-y position with a color.
 */
function drawCell(x, y, color) {
  var p5 = cellSize * .05;
  var p10 = cellSize * .1;
  var p80 = cellSize * .8;

  context.lineWidth = p5;
  context.strokeStyle = color;
  context.fillStyle = color;

  context.beginPath();
  context.rect(x * cellSize, y * cellSize, cellSize, cellSize);
  context.closePath();
  context.stroke();

  context.fillRect(x * cellSize + p10, y * cellSize + p10, p80, p80);
}

/**
 * Outputs game info on the panel.
 */
function drawScoretable() {
  context.fillStyle = COLOR_SCORE;
  context.font = 'normal normal bold ' + scoreSize + 'px arial';
  var i = 0;
  for (var key in gameScore) {
    if (gameScore.hasOwnProperty(key)) {
      context.fillText(key + ': ' + gameScore[key], 205, ++i * scoreSize);
    }
  }
}

/**
 * Draws a big message in the center of the screen.
 */
function drawMessage(text, color) {
  context.fillStyle = color;
  context.font = 'normal normal bold ' + messageSize + 'px arial';
  context.fillText(text, 18, 218);
}
