/*
Design an algorithm in javascript that verifies if a user win on the connect-4 game.
We are given a board that represents a connect 4 game, we should check whether we have found a 4
connection using verticals, horizontals and diagonals, we have two indexes of the user, 0 for one
user, and 1 for the other, for -1 means a space that is not filled. Check if the user of the last move won or not.
*/
// Time O(N)
// Space O(N)
function checkWinner(board, lastRow, lastCol) {
  let player = board[lastRow][lastCol];

  // Last move was invalid
  if (player === -1) {
    return false;
  }

  // Check all four directions: horizontal, vertical, diagonal1 and diagonal2
  // 8 different moves
  // The directions are divided by type of match they can have
  const directions = [
    [
      [0, 1],
      [0, -1],
    ], // Horizontal (right, left)
    [
      [1, 0],
      [-1, 0],
    ], // Vertical (down, up)
    [
      [1, 1],
      [-1, -1],
    ], // Diagonal 1 (bottom right, top-left)
    [
      [1, -1],
      [-1, 1],
    ], // Diagonal 2 (bottom-left, top-right)
  ];

  for (let direction of directions) {
    let [dir1, dir2] = direction;
    // + 1 considerting the current turn
    let count =
      1 +
      countInDirection(...dir1, lastRow, lastCol, player, board) +
      countInDirection(...dir2, lastRow, lastCol, player, board);
    if (count >= 4) {
      return true;
    }
  }
  // No win found
  return false;
}

function countInDirection(deltaRow, deltaCol, lastRow, lastCol, player, board) {
  let count = 0;
  let r = lastRow + deltaRow;
  let c = lastCol + deltaCol;

  let ROW = board.length;
  let COL = board[0].length;

  // Look for the grid and increment whenever there's a match on any
  // of the direction
  while (r >= 0 && r < ROW && c >= 0 && c < COL && board[r][c] === player) {
    count++;
    r += deltaRow;
    c += deltaCol;
  }
  return count;
}

const board = [
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, 1, 1, 1, 1, -1, -1],
  [-1, 0, 0, 1, 0, -1, -1],
  [-1, 0, 1, 0, 0, -1, -1],
];

console.log(checkWinner(board, 3, 4)); // true (player 1 wins horizontally)
console.log(checkWinner(board, 4, 2)); // false
