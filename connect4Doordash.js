/*
We are given a board that represents a connect 4 game, we should check whether we have found a 4
connection using verticals and diagonals, we have two indexes of the user, 0, and 1, for -1 is the
space that is not filled. Check if the user of the last move won or not.
*/

// Si se conecta 4 en los sentidos horizontal, vertical, diagonal izquierda y diagonal derecha se gana
function isWinning(board, x, y, player) {
  let hori = [];
  let vert = [];
  let left = [];
  let right = [];

  // We are able to move from -4 to 4
  for(let i = -4; i < 5; i++) {
    if(x + i >= 0 && y >= 0 && x + i < board.length && y < board.length) {
      vert.push(board[x+i][y]);
    }
    if(x >= 0 && y + i >= 0 && x < board.length && y + i < board.length) {
      hori.push(board[x][y+i]);
    }
    if(x + i >= 0 && y + i >= 0 && x + i < board.length && y + i < board.length) {
      left.push(board[x+i][y+i]);
    }
    if(x + i >= 0 && y - i >= 0 && x + i < board.length && y - i < board.length) {
      right.push(board[x+i][y-i]);
    }
  }
  // Arrays with all of the valid moves from -4 to 4
  console.log(hori);
  console.log(vert);
  console.log(left);
  console.log(right);

  return (
    isWin(hori, player) !== -1 ||
    isWin(vert, player) !== -1 ||
    isWin(left, player) !== -1 ||
    isWin(right, player) !== -1
  ) ? player : -1;
}

function isWin(arr, player) {
  let count = 0;
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === player) {
      count++;
    } else {
      count = 0;
    }
    if(count >= 4) {
      return player
    }
  }
  return -1;
}


board = [
  [1, 0, 1, -1, -1],
  [1, 1, 0,  0,  0],
  [0, 0, 0  ,  0, -1],
  [1, 0, 1,  1,  0],
  [0,-1, 0, -1,  0],
]
console.log(isWinning(board, 1, 1, 1))