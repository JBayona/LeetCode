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
