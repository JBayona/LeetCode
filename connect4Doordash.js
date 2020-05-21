/*
We are given a board that represents a connect 4 game, we should check whether we have found a 4
connection using verticals and diagonals, we have two indexes of the user, 0, and 1, for -1 is the
space that is not filled. Check if the user of the last move won or not.
*/

// We can refactor the function
function winningPlayerIndex(board, lastMove) {
  let rowMove = lastMove.x;
  let colMove = lastMove.y;
  player = lastMove.index;

  let ROW = board.length;
  let COL = board[0].length;
  let count = 0;

  // Check horizontal
  for(let i = 0; i < COL; i++){
    if(board[rowMove][i] === player) {
      count++;
    } else {
      count = 0;
    }
    // Return player index
    if(count >= 4) {
      return player;
    }
  }

  // Check vertical
  for(let i = 0; i < ROW; i++){
    if(board[i][colMove] === player) {
      count++;
    } else {
      count = 0;
    }
    // Return player index
    if(count >= 4) {
      return player;
    }
  }

  //From top left to bottom right
  row = rowMove;
  col = colMove;
  for(let i = 0; i < 4; i++) {
    if(row >= 0 && row < ROW && col >= 0 && col < ROW) {
      if(board[row][col] === player) {
        count++;
      } else {
        count = 0;
      }
      if(count >= 4) {
        return player;
      }
    }
    row++;
    col++;
  }

  //From bottom left to top right
  row = rowMove;
  col = colMove;
  count = 0;
  for(let i = 0; i < 4; i++) {
    if(row >= 0 && row < ROW && col >= 0 && col < ROW) {
      if(board[row][col] === player) {
        count++;
      } else {
        count = 0;
      }
      if(count >= 4) {
        return player;
      }
    }
    row--;
    col++;
  }

  // From top right to bottom left 
  row = rowMove;
  col = colMove;
  count = 0;
  for(let i = 0; i < 4; i++) {
    if(row >= 0 && row < ROW && col >= 0 && col < ROW) {
      if(board[row][col] === player) {
        count++;
      } else {
        count = 0;
      }
      if(count >= 4) {
        return player;
      }
    }
    row++;
    col--;
  }

  // From bottom right to top left 
  row = rowMove;
  col = colMove;
  count = 0;
  for(let i = 0; i < 4; i++) {
    if(row >= 0 && row < ROW && col >= 0 && col < ROW) {
      if(board[row][col] === player) {
        count++;
      } else {
        count = 0;
      }
      if(count >= 4) {
        return player;
      }
    }
    row--;
    col--;
  }
  return -1;
}

board = [
  [1, 0, 1, -1, -1],
  [1, 0, 0,  0, -1],
  [0, 0, 1,  0, -1],
  [1, 0, 1,  1,  0],
  [0,-1, 0, -1,  0],
];
// {x: 4, y: 4, index: 0}
lastMove = {x: 0, y: 1, index: 0};
console.log(winningPlayerIndex(board, lastMove));