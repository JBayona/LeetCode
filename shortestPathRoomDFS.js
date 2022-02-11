/*
We are located into a position, the "+" represents a wall where we cannot move,
we can move only using '.'. Find the minimum nunber of moves to reach out of
the wall, which is the boundaries.
*/

// DFS
// Time (O * M )
// Space (O * M )
function shortestPath(grid, start) {
  let [xStart, yStart] = start;
  if(grid[xStart][yStart] === '+') {
    return -1;
  }
  let ROW = grid.length;
  let COL = grid[0].length;
  let visited = [];
  for(let i = 0; i < ROW; i++) {
    visited[i] = new Array(COL).fill(false);
  }

  result = {num: Number.POSITIVE_INFINITY};
  visited[xStart][yStart] = true;
  dfs(grid, visited, xStart, yStart, 0);
  return result.num;
}

function dfs(grid, visited, row, col, count) {
  if(isOutOfRoom(grid, row,col)) {
    result.num = Math.min(result.num, count);
    return;
  }

  let ROW = [0, -1, 0, 1];
  let COL = [-1, 0, 1, 0];
  for(let i = 0; i < 4; i++) {
    let newRow = row + ROW[i];
    let newCol = col + COL[i];
    if(isSafe(grid, newRow, newCol, visited)) {
      visited[newRow][newCol] = true;
      dfs(grid, visited, newRow, newCol, count + grid[newRow][newCol])
    }
  }
}

function isOutOfRoom(grid, x, y) {
  return (
    x === 0 || x === grid.length - 1 || y === 0 || y == grid[0].length - 1
  );
}

function isSafe(grid, row, col, visited) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return (
    row >= 0 && row < ROW &&
    col >= 0 && col < COL &&
    grid[row][col] !== '+' &&
    visited[row][col] === false
  );
}

grid = [
  ['+', 5, '+', 1],
  [2, 3, 4, 10],
  ['+', '+', '+', '+'],
];
start = [1,2];
console.log(shortestPath(grid, start));