/*
Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. 

An island is surrounded by water and is formed by connecting adjacent lands
horizontally or vertically. 

You may assume all four edges of the grid are all surrounded by water.

https://leetcode.com/problems/number-of-islands/description/
*/

var numIslands = function(grid) {
  if(grid.length === 0) return 0;
  grid = grid.map(item => [...item].map(Number));
  let row = grid.length;
  let column = grid[0].length;
  let count = 0;
  /*Matrix to define visited cells, at the
  ver beginnig all are unvisited*/
  let visited = []
  for(let i = 0; i < row; i++){
    visited[i] = new Array(column).fill(false);
  }

  for(let i = 0; i < row; i++){
    for(let j = 0; j < column; j++){
      /*Si tenemos un uno y no ha sido visitado*/
      if(grid[i][j] === 1 && !visited[i][j]){
        visited[i][j] = true;
        dfs(grid, i, j, visited);
        /*Estamos contando componentes*/
        count++;
      }
    }
  }
  return count;
};

/*Función para hacer DFS a una matriz, considera a sus 8 vecinos*/
function dfs(grid, row, column, visited){
  //Vecinos Horizontal, Vertical y Diagonal
  //let rowK = [-1, -1, -1, 0, 0, 1, 1, 1];
  //let columnK = [-1, 0, 1, -1, 1, -1, 0, 1];

  //Vecinos Horizontal, Vertical
  let rowK = [-1, 0, 0, 1];
  let columnK = [0, -1, 1, 0];

  //Checa todos los vecinos (4 o 8)
  for(let i = 0; i < 8; i++){
    let nextRowk = row + rowK[i];
    let nextColk = column + columnK[i];
    if(isSafe(grid, nextRowk, nextColk, visited)){
      visited[nextRowk][columnK] = true;
      dfs(grid, nextRowk, columnK, visited);
    }
  }
}

function isSafe(grid, row, column, visited){
  let ROW = grid.length;
  let COLUMN = grid[0].length;
  return (
    (row >= 0 && row < ROW) &&
    (column >= 0 && column < COLUMN) && 
    grid[row][column] === 1 &&
    !visited[row][column];
  )
}

/*matrix = [
          [1, 1, 0, 0, 0],
          [0, 1, 0, 0, 1],
          [1, 0, 0, 1, 1],
          [0, 0, 0, 0, 0],
          [1, 0, 1, 0, 1]
        ];*/

matrix = ["11000","11000","00100","00011"];

console.log(numIslands(matrix));

/*
https://www.hackerrank.com/challenges/ctci-connected-cell-in-a-grid
*/
function cellsConected(grid){
  let visited = [];
  let result = {val: 0};
  let max = 0;
  let row = grid.length;
  let col = grid[0].length;
  for(let i = 0; i < row; i++){
    visited[i] = new Array(col).fill(false);
  }
  for(let i = 0; i < row; i++){
    for(let j = 0; j < col; j++){
      if(grid[i][j] === 1 && !visited[i][j]){
        visited[i][j] = true;
        result.val = 1;
        dfs(grid, i, j, visited, result);
        max = Math.max(max, result.val);
      }
    }
  }
  return max;
}
function dfs(grid,row,col,visited,result){
  let RowK = [-1,-1,-1,0,0,1,1,1];
  let ColK = [-1,0,1,-1,1,-1,0,1];
  for(let i = 0; i < 8; i++){
    let ROW = row + RowK[i];
    let COL = col + ColK[i];
    if(isSafe(grid,ROW,COL,visited)){
      visited[ROW][COL] = true;
      result.val++;
      dfs(grid, ROW, COL, visited, result);
    }
  }
}
function isSafe(grid, row, col, visited){
  let ROW = grid.length;
  let COL = grid[0].length;
  return(
    (row >= 0 && row < ROW) && (col >= 0 && col < COL) && 
      grid[row][col] === 1 && 
      !visited[row][col]
  );
}

grid = [
[1, 1, 0, 0],
[0, 1, 1, 0],
[0, 0, 1, 0],
[1, 0, 0, 0]
];
console.log(cellsConected(grid));
