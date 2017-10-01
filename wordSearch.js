/*
Given a 2D board and a word, find if the word exists in the grid.

The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.

For example,
Given board =

[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
word = "ABCCED", -> returns true,
word = "SEE", -> returns true,
word = "ABCB", -> returns false.

https://leetcode.com/problems/word-search/description/
*/

var exist = function(board, word) {
    let row = board.length;
    let col = board[0].length;
    let result = { index: 0};
    let count = 0;
    //Lista de adyacencia
    let visited = [];
    for(let i = 0; i < row; i++){
      visited[i] = new Array(col).fill(false);
    }

    for(let i = 0; i < row; i++){
      for(let j = 0; j < col; j++){
        /*Verificamos si la primer letra forma parte de la palabra
        necesitamos verificar esto en el primer intento para no brincar
        la primer letra en caso de que sea parte de la palabra*/
        if(board[i][j] === word[result.index]){
          visited[i][j] = true;
          result.index += 1;
        }
        dfs(board, i, j, visited, word, result);
        if(word.length === result.index){
          return true;
        }else{
          result.index = 0;
        }
        count++;
      }
    }
    return false;
    //return count;
};

function dfs(grid, row, col, visited, word, result){
  //Vecinos horizontal y vertical
  let rowk = [-1, 0, 0, 1];
  let colK = [0, -1, 1, 0];

  for(let i = 0; i < 4; i++){
    let tmpRow = row + rowk[i];
    let tmpCol = col + colK[i];
    if(isSafe(grid, tmpRow, tmpCol, visited, word, result)){
      visited[tmpRow][tmpCol] = true;
      result.index += 1;
      dfs(grid, tmpRow, tmpCol, visited, word, result);
    }
  }
}

function isSafe(grid, row, column, visited, word, result){
  let ROW = grid.length;
  let COLUMN = grid[0].length;
  return (row >= 0 && row < ROW) && (column >= 0 && column < COLUMN) 
        && (grid[row][column] === word[result.index] && !visited[row][column]);
}

/*matrix = [
    ['A','B','C','E'],
    ['S','F','C','S'],
    ['A','D','E','E']
];*/
matrix = [
  ["A", "B"]
];
//word = "ABCB";
word = "BA";
console.log(exist(matrix, word));