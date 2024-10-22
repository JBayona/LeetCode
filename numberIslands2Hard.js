/*
You are given an empty 2D binary grid grid of size m x n. The grid represents a map where 0's represent
water and 1's represent land. Initially, all the cells of grid are water cells (i.e., all the cells are 0's).

We may perform an add land operation which turns the water at position into a land. You are given an array positions
where positions[i] = [ri, ci] is the position (ri, ci) at which we should operate the ith operation.

Return an array of integers answer where answer[i] is the number of islands after turning the
cell (ri, ci) into a land.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
You may assume all four edges of the grid are all surrounded by water.

https://leetcode.com/problems/number-of-islands-ii
*/

// Time O(M * N)
// Space O(M * N)
var numIslands2 = function (m, n, positions) {
  if (!positions) {
    return [];
  }

  let result = [];
  let visited = new Array(m * n).fill(-1);
  let count = 0;
  let rowK = [0, -1, 0, 1];
  let colK = [-1, 0, 1, 0];
  for (let pos of positions) {
    let [x, y] = pos;
    let index = x * n + y;
    if (visited[index] !== -1) {
      result.push(count);
      continue;
    }
    count++;
    visited[index] = index;
    for (let i = 0; i < 4; i++) {
      let nextRow = x + rowK[i];
      let nextCol = y + colK[i];
      if (isValid(m, n, nextRow, nextCol, visited)) {
        let neighborIndex = nextRow * n + nextCol;
        // Union Find
        let neighborRoot = findRoot(visited, neighborIndex);
        if (neighborRoot !== index) {
          visited[neighborRoot] = index;
          count--;
        }
      }
    }
    result.push(count);
  }
  return result;
};

function isValid(m, n, nextRow, nextCol, visited) {
  return (
    nextRow >= 0 &&
    nextRow < m &&
    nextCol >= 0 &&
    nextCol < n &&
    visited[nextRow * n + nextCol] !== -1
  );
}

function findRoot(visited, index) {
  while (index != visited[index]) {
    visited[index] = visited[visited[index]];
    index = visited[index];
  }
  return index;
}
