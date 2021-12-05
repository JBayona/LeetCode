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

var exist = function(board, word) {
  if(!board.length) {
      return false;
  }
  
  for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[i].length; j++) {
      // Check if we find the first letter of the word
      if(board[i][j] === word[0]) {
        if(dfs(board, word, i, j, 0)) {
          return true;
        }
      }
    }
  }
  return false;
};

function dfs(board, word, row, col, count) {
  // We found the word
  // Break condition
  if(count === word.length) {
    return true;
  }

  // We are out of limits
  if(!isSafe(board, word, row, col, count)) {
    return false;
  }
  
  // The same letter can be used only once
  let tmp = board[row][col];
  board[row][col] = ' '; // Just set empty space to not use it again

  let found = dfs(board, word, row + 1, col, count + 1) ||
              dfs(board, word, row - 1, col, count + 1) ||
              dfs(board, word, row, col + 1, count + 1) ||
              dfs(board, word, row, col - 1, count + 1)
  
  // Reset the letter
  board[row][col] = tmp;
  return found;
}

function isSafe(board, word, row, col, count) {
  let ROW = board.length;
  let COL = board[0].length;
  return (
    row >= 0 && row < ROW &&
    col >= 0 && col < COL &&
    board[row][col] === word[count]
  );
}

board = [
    ["A","B","C","E"],
    ["S","F","C","S"],
    ["A","D","E","E"]
];
// word = "ABCCED"
word = "SEE";
console.log(exist(board, word));
