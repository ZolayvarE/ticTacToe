var readline = require('readline');

rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var rows = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

var player1 = 'Player 1';
var player2 = 'Player 2';

var printBoard = function () {
  for (var i = 0; i < 50; i++) {
    console.log('')
  }

  console.log('Tic-Tac-Toe:\n');
  var counter = 0;
  rows.forEach(function (row, index) {
    console.log(2 - index + ' ' + row.join(' | '));
    counter++;
    if (counter <= 2) {
      console.log('  --+---+--');
    }
  });
  console.log('  0   1   2\n');
};

var boardIsFull = function () {
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].includes(' ')) {
      return false;
    }
  }
  return true;
};

var turn = 0;

var markSpace = function (x, y, player) {
  var marking = (player === player1 ? 'X' : 'O');
  
  if (rows[y][x] !== ' ') {
    turn--;
    return 'That is an invalid space! Please try again!\n';
    
  }

  rows[y][x] = marking;

  if (rows[y][0] + rows[y][1] + rows[y][2] === marking + marking + marking) {
    printBoard();
    return player + ' wins!';
    rl.close();
  } else if (rows[0][x] + rows[1][x] + rows[2][x] === marking + marking + marking) {
    printBoard();
    return player + ' wins!';
    rl.close();
  } else if (y === x && ((x === 0) || (x === 1) || (x === 2))) {
    if (rows[0][2] + rows[1][1] + rows[2][0] === marking + marking + marking) {
      printBoard();
      return player + ' wins!';
      rl.close();
    }
  } else if (x + y === 2 && ((x === 0) || (x === 1) || (x === 2))) {
    if (rows[0][0] + rows[1][1] + rows[2][2] === marking + marking + marking) {
      printBoard();
      return player + ' wins!';
      rl.close();
    }
  } else if (boardIsFull()) {
    printBoard();
    return 'DRAW!';
    rl.close();
  }
};

var startGame = function (message) {
  printBoard();
  var currentPlayer = (turn % 2 ? player2 : player1);
  if (!message) {
    message = currentPlayer + ' where do you want to go?\n';
  }
  rl.question(message, function (response) {
    turn++;
    var coordinates = [];
    for (var i = 0; i < response.length; i++) {
      if ('' + Number(response[i]) !== 'NaN') {
        coordinates.push(Number(response[i]));
      }
    }

    if (coordinates.length >= 2) {
      message = markSpace(coordinates[0], 2 - coordinates[1], currentPlayer);
      startGame(message);
    } else if (message && (message.includes('win') || message.includes('DRAW'))) {
      rl.close();
    } else {
      turn--;
      startGame('That is an invalid input!\n\nPlease try again, ' + currentPlayer + '!\n');
    }
  });
  
};

printBoard();

rl.question('What should we call Player 1?\n', function (response) {
  player1 = response;
  printBoard();
  rl.question('What should we call player 2?\n', function (response) {
    player2 = response;
    startGame();
  });
});


