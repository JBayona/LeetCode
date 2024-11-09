/*
Given a MxN matrix where each element can either be 0 or 1. We need to find the shortest path between a given source cell to a destination cell. The path can only be created out of
a cell if its value is 1.
We can only move between 1, for 0 it´s not allowed.
Expected time complexity is O(MN).

https://www.geeksforgeeks.org/shortest-path-in-a-binary-maze/
*/

// Find the shortest path (We should only be able to move between 1s)
function shortestPathBetweenSourceAndDestination(grid, start, destination) {
  // Check if both source and destination are valid
  let [xStart, yStart] = start;
  let [xEnd, yEnd] = destination;
  if(grid[xStart][xEnd] !== 1 || grid[yStart][yEnd] !== 1) {
    return -1;
  }

  let ROW = grid.length;
  let COL = grid[0].length;
  let visited = new Array(ROW);
  for(let i = 0; i < ROW; i++) {
    visited[i] = new Array(COL).fill(0);
  }

  let queue = [];
  queue.push({x:xStart, y: yStart, distance: 0});

  // Do a BFS starting from the source cell
  while(queue.length) {
    let node = queue.shift();

    // If we have reached the destination cell we are done
    if(node.x === xEnd && node.y === yEnd) {
      return node.distance;
    }

    let rowNum = [-1, 0, 0, 1];
    let colNum = [0, -1, 1, 0];

    for(let i = 0; i < 4; i++) {
      let rowNext = node.x + rowNum[i];
      let colNext = node.y + colNum[i];

      if(isSafe(grid, visited, rowNext, colNext)) {
        visited[rowNext][colNext] = true;
        queue.push({x: rowNext, y: colNext, distance: node.distance + 1});
      }
    }
  }
  // Not path found
  return -1;
}

function isSafe(grid, visited, row, col) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return (
    row >= 0 && row < ROW &&
    col >= 0 && col < COL &&
    grid[row][col] === 1 &&
    visited[row][col] === 0
  );
}

grid= [
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
  [1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 1, 0, 0, 1]
];
source = [0, 0];
destination = [3, 4];
console.log(shortestPathBetweenSourceAndDestination(grid, source, destination));
