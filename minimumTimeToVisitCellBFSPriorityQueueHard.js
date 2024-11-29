/*
You are given a m x n matrix grid consisting of non-negative integers where
grid[row][col] represents the minimum time required to be able to visit the cell (row, col), which means
you can visit the cell (row, col) only when the time you visit it is greater than or equal to grid[row][col].

You are standing in the top-left cell of the matrix in the 0th second, and you must move to any
adjacent cell in the four directions: up, down, left, and right. Each move you make takes 1 second.

Return the minimum time required in which you can visit the bottom-right cell of the matrix. If you cannot
visit the bottom-right cell, then return -1.

Example 1:
Input: grid = [[0,1,3,2],[5,1,2,5],[4,3,8,6]]
Output: 7
Explanation: One of the paths that we can take is the following:
- at t = 0, we are on the cell (0,0).
- at t = 1, we move to the cell (0,1). It is possible because grid[0][1] <= 1.
- at t = 2, we move to the cell (1,1). It is possible because grid[1][1] <= 2.
- at t = 3, we move to the cell (1,2). It is possible because grid[1][2] <= 3.
- at t = 4, we move to the cell (1,1). It is possible because grid[1][1] <= 4.
- at t = 5, we move to the cell (1,2). It is possible because grid[1][2] <= 5.
- at t = 6, we move to the cell (1,3). It is possible because grid[1][3] <= 6.
- at t = 7, we move to the cell (2,3). It is possible because grid[2][3] <= 7.
The final time is 7. It can be shown that it is the minimum time possible.

Example 2:
Input: grid = [[0,2,4],[3,2,1],[1,0,4]]
Output: -1
Explanation: There is no path from the top left to the bottom-right cell.

https://leetcode.com/problems/minimum-time-to-visit-a-cell-in-a-grid
*/
// Time: MN Log(MN)
// Space: MN
var minimumTime = function (grid) {
  let ROW = grid.length;
  let COL = grid[0].length;

  // Min heap
  let heap = new PriorityQueue({
    compare: (a, b) => a.t - b.t,
  });

  let distTime = new Array(ROW);
  for (let i = 0; i < ROW; i++) {
    distTime[i] = new Array(COL).fill(Infinity);
  }

  heap.enqueue({ x: 0, y: 0, t: 0 });

  let rowK = [0, -1, 0, 1];
  let colK = [-1, 0, 1, 0];

  // Run BFS
  while (heap.size()) {
    let { x, y, t } = heap.dequeue();

    // If node is bottom-right
    if (x === ROW - 1 && y === COL - 1) {
      return t;
    }

    for (let i = 0; i < 4; i++) {
      let nextRow = x + rowK[i];
      let nextCol = y + colK[i];
      // If not under the boundary, skip
      if (!isSafe(nextRow, nextCol, grid)) {
        continue;
      }
      let nextDistTime = 0;
      // If the current element is greater, we need to move back
      // and forth until we can move to the element
      if (grid[nextRow][nextCol] > t + 1) {
        if (x === 0 && y === 0 && t === 0) {
          continue;
        }
        // Number of seconds we need to wait until we can
        // move to this element
        let diff = grid[nextRow][nextCol] - (t + 1);
        // We spend 2 seconds to do the back and forth, otherwise
        // the back and forth + 1
        if (diff % 2 === 0) {
          nextDistTime = grid[nextRow][nextCol];
        } else {
          nextDistTime = grid[nextRow][nextCol] + 1;
        }
        // If now we can move, add it
        if (nextDistTime < distTime[nextRow][nextCol]) {
          distTime[nextRow][nextCol] = nextDistTime;
          heap.enqueue({ x: nextRow, y: nextCol, t: nextDistTime });
        }
      } else {
        // We can currently move to this element, now try to
        // minize the element
        if (t + 1 < distTime[nextRow][nextCol]) {
          distTime[nextRow][nextCol] = nextDistTime;
          heap.enqueue({ x: nextRow, y: nextCol, t: t + 1 });
        }
      }
    }
  }
  return -1;
};

function isSafe(row, col, grid) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return row >= 0 && row < ROW && col >= 0 && col < COL;
}
