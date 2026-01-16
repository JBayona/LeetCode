/*
You are given a map in form of a two-dimensional integer grid where 1 represents land and 0 represents water.
Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

The island doesn't have "lakes" (water inside that isn't connected to the water around the island). One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

Example:
Input:
[[0,1,0,0],
 [1,1,1,0],
 [0,1,0,0],
 [1,1,0,0]]

Output: 16
Explanation: The perimeter is the 16 yellow stripes in the image below:
*/
// Option 1
var islandPerimeter = function (grid) {
  let result = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      // Only run when a land is found
      if (grid[i][j]) {
        //check if land above is water (or top edge)
        if (i == 0 || grid[i - 1][j] == 0) {
          result++;
        }
        //check if land right is water (or right edge)
        if (j == grid[0].length - 1 || grid[i][j + 1] == 0) {
          result++;
        }
        //check if left land is water (or left edge)
        if (j == 0 || grid[i][j - 1] == 0) {
          result++;
        }
        // check land below is water (or bottom edge)
        if (i == grid.length - 1 || grid[i + 1][j] == 0) {
          result++;
        }
      }
    }
  }
  return result;
};

// Option 2
var islandPerimeter = function (grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      // Runs when an island is found
      if (grid[i][j] === 1) {
        return dfs(grid, i, j);
      }
    }
  }
};

function dfs(grid, row, col) {
  let perimeter = 0;
  let ROW = grid.length;
  let COL = grid[0].length;
  // Water
  if (row < 0 || row >= ROW || col < 0 || col >= COL || grid[row][col] === 0) {
    return 1;
  }
  // Visited already
  if (grid[row][col] === -1) {
    return 0;
  }
  // Change to avoid re-visit
  grid[row][col] = -1;
  perimeter +=
    dfs(grid, row + 1, col) +
    dfs(grid, row, col + 1) +
    dfs(grid, row - 1, col) +
    dfs(grid, row, col - 1);
  return perimeter;
}
