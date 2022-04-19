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
  queue.push([x, y]);

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
        let newRow = x + row[i];
        let newCol = y + col[i];

        // Keep rolling in the current direction until
        // we have a boundary
        while (isValid(maze, newRow, newCol)) {
          newRow += row[i];
          newCol += col[i];
        }

        // The ball will be on the wall, take a step back
        newRow -= row[i];
        newCol -= col[i];

        // If it's invalid let's continue
        if (maze[newRow][newCol] !== 0) {
          continue;
        }

        // Continue rolling and mark as visited to not loop
        // The 2 will be places for all of the corners we can
        // roll the ball.
        queue.push([newRow, newCol]);
        maze[newRow][newCol] = 2;
      }
    }
  }
  return false;
};

function isValid(maze, row, col) {
  let ROW = maze.length;
  let COL = maze[0].length;
  return (
    row >= 0 && row < ROW && col >= 0 && col < COL && maze[row][col] !== 1 // Wall
  );
}
