var findLongestSequence = function(grid) {

  if(!grid.length) {
   return 0;
  }

  // If the grid is not empty we know at least we have one number
  let result = {max: 1};
  let count = 1;


  let row = grid.length;
  let col = grid[0].length;

  let visited = [];
  for(let i = 0; i < row; i++) {
   visited[i] = new Array(col).fill(false);
  }

  // Run DFS for each cell as we don´t know if we can find a longest sequence with a different path
  for(let i = 0; i < row; i++) {
   for(let j = 0; j < col; j++) {
    // Mark visited to avoid cycle, we make sure we only start once for every cell
    visited[i][j] = true;
    dfs(i, j, grid, grid[i][j] + 1, result, count + 1, visited);
   }
  }

  return result.max;

};

function dfs(row, col, grid, next, result, count, visited) {
  let rowK = [ 0, -1, 0, 1];
  let colK = [-1,  0, 1, 0];

  for(let i = 0; i < 4; i++) {
   let nextRow = rowK[i] + row;
   let nextCol = colK[i] + col;
   if(isSafe(nextRow, nextCol, grid, visited) && grid[nextRow][nextCol] === next) {
    result.max = Math.max(result.max, count);
    dfs(nextRow, nextCol, grid, grid[nextRow][nextCol] + 1, result, count + 1, visited);
   }
  }
}

function isSafe(row, col, grid, visited) {
  return (
   (row >= 0 && row < grid.length) &&
   (col >= 0 && col < grid[0].length) &&
   !visited[row][col]
  );
}

// grid = [
// [3, 8, 9,  7],
// [6, 2, 10, 8],
// [7, 3, 1,  9],
// [8, 5, 9, 10]
// ]
// Result = 4 - [7,8,9,10]

// grid = [
// [1, 2, 3, 5],
// [2, 9, 8, 10],
// [3, 4, 5, 6],
// [8, 3, 11,7]
// ];
// Result = 7 - [1,2,3,4,5,6,7]

// grid = [
// [1,  2,  3, 5],
// [12, 11, 4, 10],
// [9, 10, 5, 6],
// [8, 7,  6, 7]
// ];
// Result = 12 - [1,2,3,4,5,6,7,8,9,10,11,12]

grid = [
[1,  2,   3, 4],
[8,  7,   6, 5],
[9,  10,  11, 12],
[16, 15,  14, 13]
];
// Result = 16 - [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

// grid = [
// [1, 2,  3, 5],
// [2, 10, 4, 10],
// [9, 10, 5, 6],
// [8, 7,  6, 7]
// ];
// Result = 10 - [1,2,3,4,5,6,7,8,9,10]
console.log(findLongestSequence(grid));