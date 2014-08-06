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
var gameCycleUpdateInterval = 10;
var gameCycleUpdateTracker = 0;

// Speed of the game.
var gameSpeed = 0;

// Array of game info.
var gameScore = {
  score: 0
};
