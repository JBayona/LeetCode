function numIslands(grid) {
  let ROW = grid.length;
  let COL = grid[0].length;

  let visited = new Array(ROW);
  for(let i = 0; i < ROW; i++) {
    visited[i] = new Array(COL).fill(0);
  }

  let result = [];
  for(let i = 0; i < ROW; i++) {
    for(let j = 0; j < COL; j++) {
      if(grid[i][j] === 1 && visited[i][j] === 0) {
        visited[i][j] = 1;
        let tmp = [];
        tmp.push([i,j]);
        dfs(grid, visited, i, j, tmp);
        result.push(tmp);
      }
    }
  }
  return result;
}

function dfs(grid, visited, row, col, tmp) {
  let rowK = [-1, 0, 0, 1];
  let colK = [0, -1, 1, 0];

  for(let i = 0; i < 4; i++) {
    let nextRow = rowK[i] + row;
    let nextCol = colK[i] + col;
    if(isSafe(grid, nextRow, nextCol) && grid[nextRow][nextCol] === 1 && visited[nextRow][nextCol] === 0) {
      visited[nextRow][nextCol] = 1;
      tmp.push([nextRow, nextCol]);
      dfs(grid, visited, nextRow, nextCol, tmp);
    }
  }
}

function isSafe(grid, row, col) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return (
    row >= 0 && row < ROW &&
    col >= 0 && col < COL
  );
}

// grid = [
//   [1, 1, 1, 1, 0],
//   [1, 1, 0, 1, 0],
//   [1, 1, 0, 0, 0],
//   [0, 0, 0, 0, 0]
// ]
grid = [
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1]
];
console.log(numIslands(grid));