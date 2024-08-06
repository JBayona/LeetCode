/*
You are given an 8 x 8 matrix representing a chessboard. There is exactly one white rook represented by 'R'
some number of white bishops 'B', and some number of black pawns 'p'. Empty squares are represented by '.'.
A rook can move any number of squares horizontally or vertically (up, down, left, right) until it reaches
another piece or the edge of the board. A rook is attacking a pawn if it can move to the pawn's square in one move.

Note: A rook cannot move through other pieces, such as bishops or pawns. This means a rook cannot attack a pawn if there is another piece blocking the path.
Return the number of pawns the white rook is attacking.

https://leetcode.com/problems/available-captures-for-rook/description/
*/
// Look for all directions to either find a pawn or bishop
// break if any of those are found
var numRookCaptures = function (board) {
  let ROW = board.length;
  let COL = board[0].length;
  let count = 0;

  let row;
  let col;
  // Find the element
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (board[i][j] === "R") {
        row = i;
        col = j;
        break;
      }
    }
  }

  // Go left
  let left = row;
  while (left >= 0) {
    if (isPawn(board, left, col)) {
      count++;
      break;
    } else if (isBishops(board, left, col)) {
      break;
    }
    left--;
  }

  // Go right
  let right = row;
  while (right < ROW) {
    if (isPawn(board, right, col)) {
      count++;
      break;
    } else if (isBishops(board, right, col)) {
      break;
    }
    right++;
  }

  // Go down
  let down = col;
  while (down < COL) {
    if (isPawn(board, row, down)) {
      count++;
      break;
    } else if (isBishops(board, row, down)) {
      break;
    }
    down++;
  }

  // Go up
  let up = col;
  while (up >= 0) {
    if (isPawn(board, row, up)) {
      count++;
      break;
    } else if (isBishops(board, row, up)) {
      break;
    }
    up--;
  }

  return count;
};

function isPawn(board, row, col) {
  return board[row][col] === "p";
}

function isBishops(board, row, col) {
  return board[row][col] === "B";
}
