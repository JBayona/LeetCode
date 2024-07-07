/*
There is a ball in a maze with empty spaces (represented as 0) and walls (represented as 1).
The ball can go through the empty spaces by rolling up, down, left or right
but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction.

Given the m x n maze, the ball's start position and the destination
where start = [startrow, startcol] and destination = [destinationrow, destinationcol]
return true if the ball can stop at the destination, otherwise return false.

You may assume that the borders of the maze are all walls (see examples).

https://leetcode.com/problems/the-maze/
*/

// BFS
// Time O(N * M)
// The 2 will be placed all over the corners we
// can stop the ball, otherwise we'll keep rolling it
var hasPath = function (maze, start, destination) {
  let [x, y] = start;

  let queue = [];
  let visited = new Set();
  queue.push([x, y]);
  visited.add(`${x}-${y}`)

  let row = [-1, 0, 1, 0];
  let col = [0, 1, 0, -1];

  while (queue.length) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let [x, y] = queue.shift();
      if (x === destination[0] && y === destination[1]) {
        return true;
      }
      for (let i = 0; i < 4; i++) {
        let nextRow = x;
        let nextCol = y;

        // Keep rolling in the current direction until
        // we have a boundary
        while (isValid(maze, nextRow + row[i], nextCol + col[i]) && maze[nextRow + row[i]][nextCol + col[i]] === 0) {
          nextRow += row[i];
          nextCol += col[i];
        }

        // If it's invalid let's continue, keep exploring all options
        if (visited.has(`${nextRow}-${nextCol}`)) {
          continue;
        }

        // Continue rolling and mark as visited to not loop
        // The 2 will be places for all of the corners we can
        // roll the ball.
        queue.push([nextRow, nextCol]);
        visited.add(`${nextRow}-${nextCol}`);
        // maze[newRow][newCol] = 2;
      }
    }
  }
  return false;
};

function isValid(maze, row, col) {
  let ROW = maze.length;
  let COL = maze[0].length;
  return (
    row >= 0 && row < ROW && col >= 0 && col < COL
  );
}