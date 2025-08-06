/*
Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. 
An island is surrounded by water and is formed by connecting adjacent lands
horizontally or vertically. 

You may assume all four edges of the grid are all surrounded by water.

https://leetcode.com/problems/number-of-islands/description/
*/

// Time O(M * N)
// Space O(M * N)
var numIslands = function(grid) {
  let ROW = grid.length;
  let COL = grid[0].length;

  let visited = new Array(ROW);
  for (let i = 0 ; i < ROW; i++) {
      visited[i] = new Array(COL).fill(false);
  }

  let result = 0;
  for (let i = 0; i < ROW; i++) {
      for (let j = 0; j < COL; j++) 
      if (grid[i][j] === '1' && visited[i][j] === false) {
          visited[i][j] = true;
          dfs(grid, visited, i, j);
          result++;
      }
  }
  return result;
};

function dfs(grid, visited, row, col) {
  let rowK = [0, -1, 0, 1];
  let colK = [-1, 0, 1, 0];
  for (let i = 0; i < 4; i++) {
      let nextRow = row + rowK[i];
      let nextCol = col + colK[i];
      if (isSafe(grid, visited, nextRow, nextCol)) {
          visited[nextRow][nextCol] = true;
          dfs(grid, visited, nextRow, nextCol);
      }
  }
}

function isSafe(grid, visited, row, col) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return (
      row >= 0 && row < ROW &&
      col >= 0 && col < COL &&
      visited[row][col] === false &&
      grid[row][col] === "1"
  );
}
