/*
Given a square chessboard of N x N size, the position of Knight and position of a target is given.
We need to find out the minimum steps a Knight will take to reach the target position.

https://www.geeksforgeeks.org/minimum-steps-reach-target-knight/
*/

function minMoves(n, startRow, startCol, endRow, endCol) {
  // Write your code here
  // There are 8 possible moves
  let row = [-2, -1, 1, 2, -2, -1, 1, 2];
  let col = [-1, -2, -2, -1, 1, 2, 2, 1];

  let queue = [];
  let visited = new Set();
  // Init position
  queue.push({ x: startRow, y: startCol, d: 0 });
  visited.add(startRow + "," + startCol);

  while (queue.length) {
    let node = queue.shift();
    if (node.x === endRow && node.y === endCol) {
      return node.d;
    }
    // Look for the 8 possible positions
    for (let i = 0; i < 8; i++) {
      let newX = node.x + row[i];
      let newY = node.y + col[i];
      // Check if the move is safe
      if (isSafe(newX, newY, visited, n)) {
        visited.add(newX + "," + newY);
        queue.push({ x: newX, y: newY, d: node.d + 1 });
      }
    }
  }
  // Not found
  return -1;
}

function isSafe(row, col, visited, n) {
  return (
    row >= 0 && row < n && col >= 0 && col < n && !visited.has(row + "," + col)
  );
}
