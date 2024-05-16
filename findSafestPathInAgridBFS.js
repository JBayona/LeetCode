/*
You are given a 0-indexed 2D matrix grid of size n x n, where (r, c) represents:

A cell containing a thief if grid[r][c] = 1
An empty cell if grid[r][c] = 0
You are initially positioned at cell (0, 0). In one move, you can move to any
adjacent cell in the grid, including cells containing thieves.

The safeness factor of a path on the grid is defined as the minimum manhattan distance
from any cell in the path to any thief in the grid.

Return the maximum safeness factor of all paths leading to cell (n - 1, n - 1).
An adjacent cell of cell (r, c), is one of the cells (r, c + 1), (r, c - 1), (r + 1, c) and (r - 1, c) if it exists.

The Manhattan distance between two cells (a, b) and (x, y) is equal to |a - x| + |b - y|
where |val| denotes the absolute value of val.

https://leetcode.com/problems/find-the-safest-path-in-a-grid/description/?envType=daily-question&envId=2024-05-15
*/
/*
The problem can be approached by thinking of it as
a shortest path problem where we need to first calculate
the minimum distance from each cell to the nearest cell
with a value of 1. Once we have these distances, we need to
determine the maximum safeness factor for the path from the
top-left to the bottom-right corner of the grid.
*/
// Time complexity:O(n^2) because we perform BFS twice over an n x n grid.
// Space complexity:O(n^2)to store the distance and maxDistance matrices, and
// the queue can hold up to n^2 elements in the worst case.
var maximumSafenessFactor = function (grid) {
  let ROW = grid.length;
  let COL = grid[0].length;

  // Initialize distances and queue
  const distance = Array.from({ length: ROW }, () => Array(COL).fill(Infinity));
  const queue = [];

  // Add all 1s to the queue and set their distance to 0
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (grid[i][j] === 1) {
        queue.push({ row: i, col: j });
        distance[i][j] = 0;
      }
    }
  }

  let rowK = [0, -1, 0, 1];
  let colK = [-1, 0, 1, 0];
  // BFS to calculate minimum distance from each cell to nearest 1
  while (queue.length) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      for (let i = 0; i < 4; i++) {
        let nextRow = node.row + rowK[i];
        let nextCol = node.col + colK[i];
        if (
          isSafe(grid, nextRow, nextCol) &&
          distance[nextRow][nextCol] === Infinity
        ) {
          queue.push({ row: nextRow, col: nextCol });
          distance[nextRow][nextCol] = distance[node.row][node.col] + 1;
        }
      }
    }
  }

  // Initializequeue for the second BFS
  const maxDistance = Array.from({ length: ROW }, () => Array(COL).fill(0));
  queue.length = 0;
  maxDistance[0][0] = distance[0][0];
  // Start from 0,0 and we need to get to n-1, n-1
  queue.push({ row: 0, col: 0, score: distance[0][0] });

  while (queue.length) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let node = queue.shift();

      //if (node.row === ROW - 1 && node.col === COL - 1) {
      //    return node.score;
      //}

      for (let i = 0; i < 4; i++) {
        let nextRow = node.row + rowK[i];
        let nextCol = node.col + colK[i];
        if (isSafe(grid, nextRow, nextCol)) {
          const newDistance = Math.min(
            maxDistance[node.row][node.col],
            distance[nextRow][nextCol]
          );
          if (newDistance > maxDistance[nextRow][nextCol]) {
            maxDistance[nextRow][nextCol] = newDistance;
            queue.push({
              row: nextRow,
              col: nextCol,
              score: distance[nextRow][nextCol],
            });
          }
        }
      }
    }
  }
  return maxDistance[ROW - 1][COL - 1];
};

const isSafe = (grid, row, col) => {
  let ROW = grid.length;
  let COL = grid[0].length;
  return row >= 0 && row < ROW && col >= 0 && col < COL;
};
