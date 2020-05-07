/*
Given an integer matrix, find the length of the longest path that have same values. The matrix has no boundary limits.

From each cell, you can either move to two directions: horizontal or vertical. You may NOT move diagonally or move outside of the boundary.

nums = [
[1,1],
[5,5],
[5,5]
]

Return 4 ( Four 5's).
*/

function longestPathDuplicatesElementsInMatrix(grid) {
  if(!grid.length) {
    return 0;
  }

  let ROW = grid.length;
  let COL = grid[0].length;

  let visited = new Array(grid.length);
  for(let i = 0; i < grid.length; i++) {
    visited[i] = new Array(grid[0].length).fill(0);
  }

  let result = {count: 0};
  for(let i = 0; i < ROW; i++) {
    for(let j = 0; j < COL; j++) {
      dfs(grid, visited, i, j, grid[i][j], 0, result);
    }
  }
  return result.count;
}

function dfs(grid, visited, row, col, target, count, result) {
  if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || visited[row][col] || grid[row][col] != target) {
    result.count = Math.max(count, result.count);
    return;
  }

  if (grid[row][col] == target) {
    count++;
  }

  visited[row][col] = true;
  dfs(grid, visited, row + 1, col, target, count, result);
  dfs(grid, visited, row, col + 1, target, count, result);
  dfs(grid, visited, row - 1, col, target, count, result);
  dfs(grid, visited, row, col - 1, target, count, result);
  visited[row][col] = false;
}

// grid = [
//   [1, 1],
//   [4, 4],
//   [4, 4],
// ];
// grid = [
//   [1, 1, 1, 1 ],
//   [1, 1, 2, 3 ],
//   [1, 1, 2, 3 ], 
//   [2, 1, 4, 5]
// ];
grid = [
  [1, 1, 1, 1 ],
  [1, 1, 2, 3 ],
  [1, 1, 1, 3 ], 
  [2, 1, 1, 5]
];
console.log(longestPathDuplicatesElementsInMatrix(grid));