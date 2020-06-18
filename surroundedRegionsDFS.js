/*
Given a 2D board containing 'X' and 'O' (the letter O), capture all regions surrounded by 'X'.

A region is captured by flipping all 'O's into 'X's in that surrounded region.

Example:

X X X X
X O O X
X X O X
X O X X

After running your function, the board should be:

X X X X
X X X X
X X X X
X O X X
Explanation:

Surrounded regions shouldn’t be on the border, which means that any 'O' on the border of the board
are not flipped to 'X'. Any 'O' that is not on the border and it is not connected to an 'O' on the
border will be flipped to 'X'. Two cells are connected if they are adjacent cells connected horizontally or vertically.

https://leetcode.com/problems/surrounded-regions/
*/

// Time O(M * N)
// Space O(M * N)
var solve = function(board) {
  if(!board.length) {
    return board;
  }
  let ROW = board.length;
  let COL = board[0].length;
  
  for(let i = 0; i < ROW; i++) {
    for(let j = 0; j < COL; j++) {
      // Run DFS in borders only
      if(board[i][j] === 'O' && (i === 0 || i == ROW - 1 || j === 0 || j === COL - 1)) {
        dfs(board, i, j);
      }
    }
  }
  
  for(let i = 0; i < ROW; i++) {
    for(let j = 0; j < COL; j++) {
      if(board[i][j] === '*') {
        board[i][j] = 'O';
      } else {
        board[i][j] = 'X';
      }
    }
  }
  return board;
};

function dfs(board, row, col) {
  // Not safe
  if(!isSafe(board, row, col)) {
      return;
  }
  if(board[row][col] === 'X' || board[row][col] === '*') {
    return;
  }
  
  // Means we have a 'O';
  board[row][col] = '*';
  dfs(board, row + 1, col);
  dfs(board, row - 1, col);
  dfs(board, row, col + 1);
  dfs(board, row, col - 1);
}

function isSafe(board, row, col) {
  let ROW = board.length;
  let COL = board[0].length;
  return (
    row >= 0 && row < ROW &&
    col >= 0 && col < COL
  );
}