/*
We are located into a position, the "+" represents a wall where we cannot move,
we can move only using '.'. Find the minimum nunber of moves to reach out of
the wall, which is the boundaries.
*/
// BFS
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
  let queue = [];
  visited[xStart][yStart] = true;
  queue.push({x: xStart, y: yStart, seconds: 0});

  let row = [0, -1, 0, 1];
  let col = [-1, 0, 1, 0];
  while(queue.length) {
    let node = queue.shift();
    if(isOutOfRoom(grid, node.x, node.y)) {
      return node.seconds;
    }
    for(let i = 0; i < 4; i++) {
      let newRow = node.x + row[i];
      let newCol = node.y + col[i];
      if(isSafe(grid, newRow, newCol, visited)) {
        visited[newRow][newCol] = true;
        queue.push({x: newRow, y: newCol, seconds: node.seconds + 1});
      }
    }
  }
  return -1;
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
    grid[row][col] === '.' &&
    visited[row][col] === false
  );
}

grid = [
  ['+', '.', '+', '.'],
  ['.', '.', '.', '+'],
  ['+', '+', '+', '+'],
];
start = [1,2];
console.log(shortestPath(grid, start));
