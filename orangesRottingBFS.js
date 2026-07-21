/*
In a given grid, each cell can have one of three values:
the value 0 - representing an empty cell;
the value 1 - representing a fresh orange;
the value 2 - representing a rotten orange.

Every minute, any fresh orange that is adjacent (4-directionally) to a rotten
orange becomes rotten.
Return the minimum number of minutes that must elapse until no cell has a fresh orange. 
If this is impossible, return -1 instead.

Example 1:
Input: [[2,1,1],[1,1,0],[0,1,1]]
Output: 4

Example 2:
Input: [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation:  The orange in the bottom left corner (row 2, column 0) is never rotten, because
rotting only happens 4-directionally.

Example 3:
Input: [[0,2]]
Output: 0
Explanation:  Since there are already no fresh oranges at minute 0, the answer is just 0.
 
Note:
1 <= grid.length <= 10
1 <= grid[0].length <= 10
grid[i][j] is only 0, 1, or 2.

https://leetcode.com/problems/rotting-oranges/
*/
// Option 1
// Time O(M * N)
// Space O(M * N)
var orangesRotting = function (grid) {
  let ROW = grid.length;
  let COL = grid[0].length;

  let queue = [];
  let freshOrange = 0;
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      // Identify fresh and rotten oranges
      if (grid[i][j] === 2) {
        queue.push({ row: i, col: j });
      } else if (grid[i][j] === 1) {
        freshOrange++;
      }
    }
  }

  let rowK = [0, -1, 0, 1];
  let colK = [-1, 0, 1, 0];

  let time = 0;
  // Important to have freshOranges in the loop as we might
  // be counting already rotten oranges, we don't need to count those.
  while (queue.length && freshOrange > 0) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let { row, col } = queue.shift();
      for (let j = 0; j < 4; j++) {
        let nextRow = row + rowK[j];
        let nextCol = col + colK[j];
        if (isSafe(grid, nextRow, nextCol) && grid[nextRow][nextCol] === 1) {
          // Mark the orange as rotten to avoid cycle
          grid[nextRow][nextCol] = 2;
          freshOrange--;
          queue.push({ row: nextRow, col: nextCol });
        }
      }
    }
    time++;
  }
  return freshOrange === 0 ? time : -1;
};

function isSafe(grid, row, col) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return row >= 0 && row < ROW && col >= 0 && col < COL;
}

// Option 2
// Time O(M * N)
// Space O(M * N)
var orangesRotting = function (grid) {
  let ROW = grid.length;
  let COL = grid[0].length;

  let visited = new Array(ROW);
  for (let i = 0; i < ROW; i++) {
    visited[i] = new Array(COL).fill(false);
  }

  let queue = [];
  let freshOranges = 0;
  // Identify fresh and rotten oranges
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (grid[i][j] === 1) {
        freshOranges++;
      } else if (grid[i][j] === 2) {
        queue.push({ row: i, col: j });
        visited[i][j] = true;
      }
    }
  }

  let rowK = [0, -1, 0, 1];
  let colK = [-1, 0, 1, 0];

  let minutes = 0;
  // Important to have freshOranges in the loop as we might
  // be counting already rotten oranges, we don't need to count those.
  while (queue.length && freshOranges > 0) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let { row, col } = queue.shift();
      for (let j = 0; j < 4; j++) {
        let nextRow = row + rowK[j];
        let nextCol = col + colK[j];
        if (isSafe(grid, visited, nextRow, nextCol)) {
          // Decrement fresh orange
          freshOranges--;
          visited[nextRow][nextCol] = true;
          queue.push({ row: nextRow, col: nextCol });
        }
      }
    }
    // Each minute has passed
    minutes++;
  }
  return freshOranges === 0 ? minutes : -1;
};

function isSafe(grid, visited, row, col) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return (
    row >= 0 &&
    row < ROW &&
    col >= 0 &&
    col < COL &&
    visited[row][col] === false &&
    grid[row][col] === 1 // add fresh oranges at will be expired
  );
}
