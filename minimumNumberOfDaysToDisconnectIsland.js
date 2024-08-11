/*
You are given an m x n binary grid grid where 1 represents land and 0 represents water.
An island is a maximal 4-directionally (horizontal or vertical) connected group of 1's.

The grid is said to be connected if we have exactly one island, otherwise is said disconnected.
In one day, we are allowed to change any single land cell (1) into a water cell (0).

Return the minimum number of days to disconnect the grid.

https://leetcode.com/problems/minimum-number-of-days-to-disconnect-island
*/

// To disconnect an island, we need to disconnect the cells, we need to minimum number of days. The goal
// is to disconnect the island, we can try to split the island in two or more parts.
// Return 0 if the island is already disconnected.
// Basically the question asked to split the component. Split one component to two.
// Either the component is split or there are no zeros
// We are trying to return the minimum number of days to split the component so we can
// either have 0, if it's disconnected, 1 or maximum 2 days as we can always split one component by taking
// a corner and splitting, for example:
//. 1111.   1011
//  1111 -> 0111 -> Answer is maximum two
//. 1111.   1111
// Approach: Try to see if the matrix is already disconnected, if no, try to do one day, if not
// try to take either two cells
// Time O(m×n×(m×n)) where (m) and (n) are the grid dimensions. Accounts for DFS and check connectivity after every cell
// Space O(m×n)
var minDays = function (grid) {
  let ROW = grid.length;
  let COL = grid[0].length;

  if (isDisconnected(grid)) {
    return 0;
  }

  // First try changing one cell
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (grid[i][j] === 1) {
        // Change one cell
        grid[i][j] = 0;
        if (isDisconnected(grid)) {
          return 1;
        }
        grid[i][j] = 1;
      }
    }
  }

  // Try disconnecting any two cells
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      // Disconnect the first cell
      if (grid[i][j] === 1) {
        grid[i][j] = 0;
        for (let m = 0; m < ROW; m++) {
          for (let n = 0; n < ROW; n++) {
            // Disconnect the second cell
            if (grid[m][n] === 1) {
              grid[m][n] = 0;
              if (isDisconnected(grid)) {
                return 2;
              }
              grid[m][n] = 1;
            }
          }
        }
        grid[i][j] = 0;
      }
    }
  }
  return 2;
};

// Count number of islands to see how many components we have
// As we are changing cells, if we have a corner and we have it
// zero, it will have zero islands so that will be a disconnection
function isDisconnected(grid) {
  let ROW = grid.length;
  let COL = grid[0].length;

  let visited = new Array(ROW);
  for (let i = 0; i < ROW; i++) {
    visited[i] = new Array(COL).fill(false);
  }

  let components = 0;
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (grid[i][j] === 1 && visited[i][j] === false) {
        // If we have components > 1 at this points this means
        // we already have different islands not connected so we don't
        // need to disconnect anything else
        if (components >= 1) {
          return true;
        }
        visited[i][j] = true;
        // dfs(grid, visited, i, j);
        bfs(grid, visited, i, j);
        components++;
      }
    }
  }
  return components === 0;
}

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

function bfs(grid, visited, row, col) {
  let rowK = [0, -1, 0, 1];
  let colK = [-1, 0, 1, 0];
  let queue = [];
  queue.push({ row, col });

  while (queue.length) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let { row, col } = queue.shift();
      for (let j = 0; j < 4; j++) {
        let nextRow = row + rowK[j];
        let nextCol = col + colK[j];
        if (isSafe(grid, visited, nextRow, nextCol)) {
          visited[nextRow][nextCol] = true;
          queue.push({ row: nextRow, col: nextCol });
        }
      }
    }
  }
}

function isSafe(grid, visited, row, col) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return (
    row >= 0 &&
    row < ROW &&
    col >= 0 &&
    col < COL &&
    grid[row][col] &&
    !visited[row][col]
  );
}
