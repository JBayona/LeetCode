/*
There is a 1-based binary matrix where 0 represents land and 1 represents water. You are given integers row and col representing
the number of rows and columns in the matrix, respectively.

Initially on day 0, the entire matrix is land. However, each day a new cell becomes flooded with water. You are given a 1-based 2D array cells,
where cells[i] = [ri, ci] represents that on the ith day, the cell on the rith row and cith column (1-based coordinates) will be covered
with water (i.e., changed to 1).

You want to find the last day that it is possible to walk from the top to the bottom by only walking on land cells.
You can start from any cell in the top row and end at any cell in the bottom row. You can only travel in the
four cardinal directions (left, right, up, and down).

Return the last day where it is possible to walk from the top to the bottom by only walking on land cells.

https://leetcode.com/problems/last-day-where-you-can-still-cross/description/?envType=daily-question&envId=2025-12-31
*/

// Time For Binary Search O(log(row×col)) + BFS O(row×col) = O((row×col)log(row×col))
// Space O(row × col)

// This problem is monotonic, if you can cross one day, it won't be possible later
// if you can cross on a day d, you might be able to cross on a day later, so this
// point us to binary search
// Approach
// 1. Run binary search on day "mid", mark it as water
// 2. Run BFS / DFS from land top to bottom row
var latestDayToCross = function (row, col, cells) {
  // Binary Search
  let left = 0;
  let right = cells.length - 1;
  while (left < right) {
    // We need +1 otherwise left = mid will loop forever
    const mid = Math.floor((left + right + 1) / 2);
    if (bfs(mid, row, col, cells)) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }
  return left;
};

function bfs(day, row, col, cells) {
  let grid = new Array(row);
  for (let i = 0; i < row; i++) {
    grid[i] = new Array(col).fill(0);
  }

  for (let i = 0; i < day; i++) {
    const [row, col] = cells[i];
    // -1 as this is 1-based and mark it as water
    grid[row - 1][col - 1] = 1;
  }

  let visited = new Array(row);
  for (let i = 0; i < row; i++) {
    visited[i] = new Array(col).fill(false);
  }

  // BFS
  let queue = [];

  // Identify from the top land where we can start
  for (let i = 0; i < col; i++) {
    if (grid[0][i] === 0) {
      queue.push({ r: 0, c: i });
      visited[0][i] = true;
    }
  }

  let rowK = [0, -1, 0, 1];
  let colK = [-1, 0, 1, 0];

  while (queue.length) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let { r, c } = queue.shift();
      // Check if we have left the island (goal)
      if (r === row - 1) {
        return true;
      }
      for (let j = 0; j < 4; j++) {
        let nextRow = r + rowK[j];
        let nextCol = c + colK[j];
        if (isSafe(nextRow, nextCol, grid, visited)) {
          queue.push({ r: nextRow, c: nextCol });
          visited[nextRow][nextCol] = true;
        }
      }
    }
  }
  return false;
}

function isSafe(row, col, grid, visited) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return (
    row >= 0 && row < ROW &&
    col >= 0 && col < COL &&
    visited[row][col] === false &&
    grid[row][col] === 0
  );
}
