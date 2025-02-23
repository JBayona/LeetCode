/*
Given a matrix consists of 0 and 1, find the distance of the nearest 0 for each cell.
The distance between two adjacent cells is 1.

Example 1:
Input:
[[0,0,0],
 [0,1,0],
 [0,0,0]]
Output:
[[0,0,0],
 [0,1,0],
 [0,0,0]]

Example 2:
Input:
[[0,0,0],
 [0,1,0],
 [1,1,1]]
Output:
[[0,0,0],
 [0,1,0],
 [1,2,1]]

Note:
The number of elements of the given matrix will not exceed 10,000.
There are at least one 0 in the given matrix.
The cells are adjacent in only four directions: up, down, left and right.

https://leetcode.com/problems/01-matrix/
*/
// Time O(V + E)
// Space O(V + E)
var updateMatrix = function(mat) {
  let ROW = mat.length;
  let COL = mat[0].length;
  let result = new Array(ROW);
  let visited = new Array(ROW);

  for (let i = 0; i < ROW; i++) {
      // Mark as maximum value so we can find near distances
      result[i] = new Array(COL).fill(Infinity);
      visited[i] = new Array(COL).fill(false);
  }

  let queue = [];
  // Add to the queue all zeros as we want to run a BFS and
  // find the 1s
  for (let i = 0; i < ROW; i++) {
      for (let j = 0; j < COL; j++) {
          if (mat[i][j] === 0 && visited[i][j] === false) {
              queue.push({r: i, c: j, d: 1});
              // Mark as visited
              visited[i][j] = true;
              // We are already in the 0, nothing to validate
              result[i][j] = 0;
          }
      }
  }

  let rowK = [0, -1, 0, 1];
  let colK = [-1, 0, 1, 0];

  while (queue.length) {
      let len = queue.length;
      for (let i = 0; i < len; i++) {
          let {r, c, d} = queue.shift();
          for (let j = 0; j < 4; j++) {
              let nextRow = r + rowK[j];
              let nextCol = c + colK[j];
              // Mininize result
              if (isSafe(nextRow, nextCol, mat, visited) && d < result[nextRow][nextCol]) {
                  visited[nextRow][nextCol] = true;
                  result[nextRow][nextCol] = d;
                  queue.push({r: nextRow, c: nextCol, d: d + 1});
              }
          }
      }
  }
  return result;
};

function isSafe(row, col, mat, visited) {
  let ROW = mat.length;
  let COL = mat[0].length;
  return (
      (row >= 0 && row < ROW) &&
      (col >= 0 && col < COL) &&
      mat[row][col] === 1 &&
      visited[row][col] === false
  );
}

// Option 1
var updateMatrix = function (mat) {
  let ROW = mat.length;
  let COL = mat[0].length;
  let result = new Array(ROW);
  let visited = new Array(ROW);
  let queue = [];

  for (let i = 0; i < ROW; i++) {
    // Mark as maximum value so we can find near distances
    result[i] = new Array(COL).fill(Infinity);
    visited[i] = new Array(COL).fill(false);
  }

  // Fill initial values, we will run BFS on zeros to find 1's
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (mat[i][j] === 0 && visited[i][j] === false) {
        queue.push({ row: i, col: j, distance: 1 });
        // Mark as visited
        visited[i][j] = true;
        // We are already in the 0, nothing to validate
        result[i][j] = 0;
      }
    }
  }

  // Run BFS
  let rowK = [0, -1, 0, 1];
  let colK = [-1, 0, 1, 0];

  while (queue.length) {
    let size = queue.length;
    // Get elements for every level
    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      let x = node.row;
      let y = node.col;
      let d = node.distance;

      // Check for distance in all 4 directions
      for (let j = 0; j < 4; j++) {
        let nextRow = x + rowK[j];
        let nextCol = y + colK[j];
        // Mininize result
        if (
          isSafe(nextRow, nextCol, mat, visited) &&
          d < result[nextRow][nextCol]
        ) {
          visited[nextRow][nextCol] = true;
          result[nextRow][nextCol] = d;
          queue.push({ row: nextRow, col: nextCol, distance: d + 1 });
        }
      }
    }
  }
  return result;
};

function isSafe(row, col, mat, visited) {
  let ROW = mat.length;
  let COL = mat[0].length;
  return (
    row >= 0 &&
    row < ROW &&
    col >= 0 &&
    col < COL &&
    mat[row][col] === 1 &&
    visited[row][col] === false
  );
}

// Option 2
// BFS
var updateMatrix = function (matrix) {
  let ROW = matrix.length;
  let COL = matrix[0].length;

  // Queue to run BFS
  let queue = [];
  // Result array
  let result = new Array(ROW);
  // Visited matrix to avoid loops
  let visited = new Array(ROW).fill(false);
  // Fill out initial values
  for (let i = 0; i < visited.length; i++) {
    visited[i] = new Array(COL).fill(false);
    // Add max numbers so we can track the min numbers
    result[i] = new Array(COL).fill(Number.MAX_SAFE_INTEGER);
  }

  // Fill initial visited
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (matrix[i][j] === 0 && visited[i][j] === false) {
        queue.push({ row: i, col: j });
        // Set 0 as there's no distance to reach a rotten orange
        visited[i][j] = true;
        // For 0's there's no distance to find
        result[i][j] = 0;
      }
    }
  }
  //  Directions
  let rowK = [-1, 0, 0, 1];
  let colK = [0, -1, 1, 0];

  let distance = 1;
  // Launch BFS
  while (queue.length) {
    let size = queue.length;
    // Get elements for every level
    for (let n = 0; n < size; n++) {
      let node = queue.shift();
      let x = node.row;
      let y = node.col;

      // Visit all adjacent nodes
      for (let i = 0; i < 4; i++) {
        let newRow = x + rowK[i];
        let newCol = y + colK[i];
        if (
          isSafe(matrix, visited, newRow, newCol) &&
          distance < result[newRow][newCol]
        ) {
          visited[newRow][newCol] = true;
          result[newRow][newCol] = distance;
          queue.push({ row: newRow, col: newCol });
        }
      }
    }
    distance++;
  }

  return result;
};

function isSafe(grid, visited, row, col) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return (
    row >= 0 &&
    row < ROW &&
    col >= 0 &&
    col < COL &&
    grid[row][col] === 1 &&
    visited[row][col] === false
  );
}
