/*
You are given a 0-indexed m x n binary matrix land where a 0 represents a hectare of forested land and a 1 represents a hectare of farmland.

To keep the land organized, there are designated rectangular areas of hectares that consist entirely of farmland.
These rectangular areas are called groups. No two groups are adjacent, meaning farmland in one group is not four-directionally adjacent to another farmland in a different group.

land can be represented by a coordinate system where the top left corner of land is (0, 0) and the bottom right corner of land is (m-1, n-1).
Find the coordinates of the top left and bottom right corner of each group of farmland. A group of farmland with a top left corner at (r1, c1) and
a bottom right corner at (r2, c2) is represented by the 4-length array [r1, c1, r2, c2].

Return a 2D array containing the 4-length arrays described above for each group of farmland in land. If there are no groups of farmland, return an empty array. You may return the answer in any order.

https://leetcode.com/problems/find-all-groups-of-farmland/description/?envType=daily-question&envId=2024-04-20
*/

var findFarmland = function (land) {
  let ROW = land.length;
  let COL = land[0].length;

  let visited = [];
  for (let i = 0; i < ROW; i++) {
    visited[i] = new Array(COL).fill(false);
  }

  let result = [];
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (land[i][j] && !visited[i][j]) {
        visited[i][j] = true;
        // First i and j represent the top left of the first 1
        let tmp = [i, j, i, j];
        dfs(land, visited, i, j, tmp);
        result.push(tmp);
      }
    }
  }
  return result;
};

function dfs(grid, visited, row, col, tmp) {
  let rowK = [0, -1, 0, 1];
  let colK = [-1, 0, 1, 0];

  for (let i = 0; i < 4; i++) {
    let nextRow = rowK[i] + row;
    let nextCol = colK[i] + col;
    if (isSafe(grid, visited, nextRow, nextCol)) {
      visited[nextRow][nextCol] = true;
      // Set top left corner
      tmp[0] = Math.min(tmp[0], nextRow);
      tmp[1] = Math.min(tmp[1], nextCol);
      // Set bottom right corner
      tmp[2] = Math.max(tmp[2], nextRow);
      tmp[3] = Math.max(tmp[3], nextCol);
      dfs(grid, visited, nextRow, nextCol, tmp);
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
    grid[row][col] && // Grid has 1
    !visited[row][col] // Not visited
  );
}

// grid = [[1,0,0],[0,1,1],[0,1,1]];
// grid = [[1,1],[1,1]];
grid = [[[0]]];
// grid = [[1]]
console.log(findFarmland(grid));
