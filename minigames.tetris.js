var laying = [];

// array of 1 and 0
var _figure = null;

// array of x-y objects.
var figure = null;

var figureShift = {
  x: 4, 
  y: 0
};

var figures = [
  // t
  [ [0, 1, 0],
    [1, 1, 1] ],
  // z normal
  [ [1, 1, 0],
    [0, 1, 1] ],
  // z inverted
  [ [0, 1, 1],
    [1, 1, 0] ],
  // square
  [ [1, 1],
    [1, 1] ],
  // r normal
  [ [0, 0, 1],
    [1, 1, 1] ],
  // r inverted
  [ [1, 0, 0],
    [1, 1, 1] ],
  // ----
  [ [1, 1, 1, 1] ]
];

function _onGameInit() {
  addFigure();
}

function _onGameRunBefore() {
  console.log('_onGameRunBefore');
}

function _onGameUpdate() {
  
}

function _onGameUpdateAfter() {
  
}

function _onGameDraw() {
  drawLaying();
  drawFigure();
}

function _onGameOver() {
  
}

function _onKeyDown(key) {
  switch (key) {
    case KEYS.LEFT:
      shiftFigure(-1);
      break;
    case KEYS.UP:
      rotateFigure();
      break;
    case KEYS.RIGHT:
      shiftFigure(1);
      break;
    case KEYS.DOWN:
      break;
  }
}

function addFigure() {
  _figure = getRandomFigure();
  figure = prepareFigure(_figure);
  shiftFigure();
}

function prepareFigure(rawFigure) {
  var preparedFigure = [];
  for (var row = 0; row < rawFigure.length; row++) {
    for (var col = 0; col < rawFigure[row].length; col++) {
      if (1 == rawFigure[row][col]) {
        preparedFigure.push({
          x: col,
          y: row
        });
      }
    }
  }
  
  return preparedFigure;
}

function getRandomFigure() {
  return figures[rand_between(0, figures.length - 1)];
}

function dumpFigure(figure) {
  var output = '';
  for (var row = 0; row < figure.length; row++) {
    for (var col = 0; col < figure[0].length; col++) {
      output += figure[row][col] == 1 ? 'X' : ' ';
    }
    output += '\n';
  }
  
  console.log(output);
}

function shiftFigure(x, y) {
  x = x || 0;
  y = y || 0;
 
  figureShift.x += x;
  figureShift.y += y;

  figure = prepareFigure(_figure);
  for (var i = 0; i < figure.length; i++) {
    figure[i].x += figureShift.x;
    figure[i].y += figureShift.y;
  }
}

function rotateFigure() {
  _figure = matrixTurn(_figure);
  dumpFigure(_figure);
  figure = prepareFigure(_figure);
  shiftFigure();
}

function drawFigure() {
  for (var i = 0; i < figure.length; i++) {
    drawCell(figure[i].x, figure[i].y, COLOR_PLAYER);
  }
}

function drawLaying() {

}
