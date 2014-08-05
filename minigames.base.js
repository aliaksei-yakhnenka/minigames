// Canvas objects.
var canvas;
var context;

// Cell size in pixels.
var cellSize = 20;

// Score font size in pixels.
var scoreSize = 16;

// Big message font size in pixels.
var messageSize = 36;

var _onGameRunBefore;
var _onGameRunAfter;

// Colors.
var COLOR_GRID = 'rgba(222, 222, 222, .5)';
var COLOR_PLAYER = 'rgba(0, 64, 222, .5)';
var COLOR_OBJECT = 'rgba(0, 222, 64, .5)';
var COLOR_CROSS = 'rgba(255, 0, 0, .75)';
var COLOR_SCORE = 'rgba(0, 0, 0, .75)';
var COLOR_MESSAGE = 'rgba(64, 64, 222, .75)';
var COLOR_GAMEOVER = 'rgba(222, 0, 0, .75)';

// Direction constants.
var DIR_UP = 1;
var DIR_DOWN = 3;
var DIR_LEFT = 2;
var DIR_RIGHT = 4;

// Keyboard keys.
var KEYS = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};

// Field parameters.
var gameWidth = 10;
var gameHeight = 20;

// Main game cycle.
var gameCycle = null;

// Game update period.
var gameCycleUpdateInterval = 100;
var gameCycleUpdateTracker = 0;

// Speed of the game.
var gameSpeed = 1;

// Array of game info.
var gameScore = {
  score: 0
};

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
  for (var j = 0; j < matrix[0].length; j++) {
    for (var i = 0; i < matrix.length; i++) {
      if (!_matrix[j]) {
        _matrix[j] = [];
      }
      _matrix[j][i] = 0;
    }
  }

  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[0].length; j++) {
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
  if (!canvas || canvas.getContext) {
    return;
  }
  
  _onGameInit = _onGameInit || function(){};
  _onGameRunBefore = _onGameRunBefore || function(){};
  _onGameRunAfter = _onGameRunAfter || function(){};
  
  context = canvas.getContext('2d');
  window.addEventListener('keydown', gameKeydown, true);
  gameCycle = setInterval(gameRun, gameCycleUpdateInterval);

  _onGameInit();  
}

function gameRun() {
  _onGameRunBefore();
  gameCycleUpdateTracker += gameCycleUpdateInterval;
  if (gameCycleUpdateTracker >= 500 / gameSpeed) {
    gameCycleUpdateTracker = 0;

    _onGameUpdate();

    clearCanvas();
    drawGrid();
    drawScoretable();

    _onGameDraw();
    _onGameUpdateAfter();
  }
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
