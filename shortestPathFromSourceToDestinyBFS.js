/*
Given a MxN matrix where each element can either be 0 or 1. We need to find
the shortest path between a given source cell to a destination cell.
The path can only be created out of a cell if its value is 1.
We can only move between 1, for 0 it´s not allowed.

Expected time complexity is O(MN).
*/

function shortestPathBetweenSourceAndDestination(grid, source, destination) {
  if(!grid.length) {
    return 0;
  }

  let visited = new Array(grid.length);
  let ROW = grid.length;
  let COL = grid[0].length;
  for(let i = 0; i < ROW; i++) {
    visited[i] = new Array(COL).fill(0);
  }

  let [xStart, yStart] = source;
  let [xEnd, yEnd] = destination;

  let row = [0, -1, 0, 1];
  let col = [-1, 0, 1, 0];

  let queue = [];
  queue.push({x: xStart, y: yStart, distance: 0});
  while(queue.length) {
    let node = queue.shift();
    // If we reach the destination
    if(node.x === xEnd && node.y === yEnd) {
      return node.distance;
    }

    for(let i = 0; i < 4; i++) {
      let nextRow = row[i] + node.x;
      let nextCol = col[i] + node.y;

      if(isSafe(grid, nextRow, nextCol, visited)) {
        // Mark as visited
        visited[nextRow][nextCol] = 1;
        queue.push({x: nextRow, y: nextCol, distance: node.distance + 1});
      }
    }
  }
  // No path found
  return -1;
}


function isSafe(grid, row, col, visited) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return (
    row >= 0 && row < ROW &&
    col >= 0 && col < COL &&
    grid[row][col] &&
    !visited[row][col]
  );
}

/*let grid = [ 
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 0],
  [1, 1, 0, 1, 1],
  [1, 0, 0, 1, 0],
  [1, 1, 1, 1, 1],
]*/ // 5
/*let grid = [ 
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1],
  [0, 1, 1, 1, 1],
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
]*/ // 11
let grid = [ 
  [1, 1, 0, 1, 1],
  [0, 0, 0, 0, 1],
  [0, 0, 1, 1, 1],
  [1, 0, 0, 0, 0],
  [1, 1, 0, 0, 0],
] // 11
let source = [0,0];
let destination = [4,1];
console.log(shortestPathBetweenSourceAndDestination(grid, source, destination));