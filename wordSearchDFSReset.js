/*
Given a 2D board and a word, find if the word exists in the grid.
The word can be constructed from letters of sequentially adjacent cell, where
"adjacent" cells are those horizontally or vertically neighboring. The same letter
cell may not be used more than once.
For example,
Given board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
word = "ABCCED", -> returns true,
iword = "SEE", -> returns true,
word = "ABCB", -> returns false.

https://leetcode.com/problems/word-search/description/
*/

var exist = function (board, word) {
  if (!board.length || !word) {
    return false;
  }

  let ROW = board.length;
  let COL = board[0].length;
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (board[i][j] === word[0]) {
        if (dfs(board, word, i, j, 0)) {
          return true;
        }
      }
    }
  }
  return false;
};

function dfs(board, word, row, col, index) {
  // If the word is found
  if (index === word.length) {
    return true;
  }

  // If the move is not valid
  if (!isSafe(board, word, row, col, index)) {
    return false;
  }

  let tmp = board[row][col];
  board[row][col] = " ";
  let isFound =
    dfs(board, word, row + 1, col, index + 1) ||
    dfs(board, word, row, col + 1, index + 1) ||
    dfs(board, word, row - 1, col, index + 1) ||
    dfs(board, word, row, col - 1, index + 1);

  board[row][col] = tmp;
  return isFound;
}

function isSafe(board, word, row, col, index) {
  let ROW = board.length;
  let COL = board[0].length;
  return (
    row >= 0 &&
    row < ROW &&
    col >= 0 &&
    col < COL &&
    board[row][col] === word[index]
  );
}

board = [
  ["A", "B", "C", "E"],
  ["S", "F", "C", "S"],
  ["A", "D", "E", "E"],
];
// word = "ABCCED"
word = "SEE";
console.log(exist(board, word));
