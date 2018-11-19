/*
Find the max number of connected colors, where each number in the grid
represents one color,

https://www.youtube.com/watch?v=IWvbPIYQPFM
*/
function maxConnectedColors(grid) {
  let row = grid.length;
  let col = grid[0].length;

  // Matrix to track seen
  let seen = new Array(row);
  for(let i = 0; i < row; i++) {
   seen[i] = new Array(col).fill(0);
  }

  let max = {count: 0};
  let result = 0;
  for(let i = 0; i < row; i++) {
   for(let j = 0; j < col; j++) {
    if(!seen[i][j]) {
     seen[i][j] = 1;
     max.count = 1;
     dfs(grid, seen, i, j, max);
     result = Math.max(result, max.count);
    }
   }
  }
  return result;
}

function dfs(grid, seen, x, y, result) {
  let x_row = [ 0, -1, 0, 1];
  let y_col = [-1,  0, 1, 0];

  for(let i = 0; i < 4; i++) {
   let x_next = x_row[i] + x;
   let y_next = y_col[i] + y;
   // Check if we are on the limits and we are looking for the same color
   if(isValid(grid, seen, x_next, y_next) && grid[x][y] === grid[x_next][y_next]) {
    result.count++;
    // Mark as visited
    seen[x_next][y_next] = 1;
    // Run DFS
    dfs(grid, seen, x_next, y_next, result);
   }
  }
}

function isValid(grid, seen, x, y) {
  return (
   x >= 0 && x < grid.length &&
   y >= 0 && y < grid[0].length &&
   !seen[x][y]
  );
}

grid = [
[1, 1, 2, 3],
[1, 2, 3, 2],
[3, 2, 2, 2]
];
console.log(maxConnectedColors(grid));