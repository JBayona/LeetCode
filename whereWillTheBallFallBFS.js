/*
You have a 2-D grid of size m x n representing a box, and you have n balls.
The box is open on the top and bottom sides.

Each cell in the box has a diagonal board spanning two corners of the cell that can
redirect a ball to the right or to the left.

- A board that redirects the ball to the right spans the top-left corner to the bottom-rightcorner
and is represented in the grid as 1.
- A board that redirects the ball to the left spans the top-right corner to the bottom-left corner
and is represented in the grid as -1.

We drop one ball at the top of each column of the box. Each ball can get stuck in the box or
fall out of the bottom. A ball gets stuck if it hits a "V" shaped pattern between two boards
or if a board redirects the ball into either wall of the box.

Return an array answer of size n where answer[i] is the column that the ball falls out of at
the bottom after dropping the ball from the ith column at the top, or -1 if the ball gets stuck in the box.

Example 1:
Input: grid = [[1,1,1,-1,-1],[1,1,1,-1,-1],[-1,-1,-1,1,1],[1,1,1,1,-1],[-1,-1,-1,-1,-1]]
Output: [1,-1,-1,-1,-1]
Explanation: This example is shown in the photo.
Ball b0 is dropped at column 0 and falls out of the box at column 1.
Ball b1 is dropped at column 1 and will get stuck in the box between column 2 and 3 and row 1.
Ball b2 is dropped at column 2 and will get stuck on the box between column 2 and 3 and row 0.
Ball b3 is dropped at column 3 and will get stuck on the box between column 2 and 3 and row 0.
Ball b4 is dropped at column 4 and will get stuck on the box between column 2 and 3 and row 1.

Example 2:
Input: grid = [[-1]]
Output: [-1]
Explanation: The ball gets stuck against the left wall.
Example 3:

Input: grid = [[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1],[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1]]
Output: [0,1,2,3,4,-1]

https://leetcode.com/problems/where-will-the-ball-fall/
*/

// BFS
// \ -> 1 right
// / -1 left
var findBall = function (grid) {
  let balls = grid[0].length;

  let result = new Array(balls).fill(-1);
  // Throw all the balls.
  for (let i = 0; i < grid[0].length; i++) {
    result[i] = bfs(grid, 0, i);
  }
  return result;
};

function bfs(grid, row, col) {
  let queue = [];
  queue.push({ row, col });
  while (queue.length) {
    let { row, col } = queue.shift();
    // Success condition for it to return the column
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
      return col;
    }
    // if current grid is 1, check the next one. If its the opposite then ball will get stuck
    // return -1 else move to next cell
    if (grid[row][col] === 1) {
      // Out of boundaries
      if (col >= grid[0].length - 1) {
        return -1;
      }
      // Next move
      if (grid[row][col + 1] === 1) {
        queue.push({ row: row + 1, col: col + 1 });
      } else if (grid[row][col + 1] === -1) {
        // Ball stuck
        return -1;
      }
    } else if (grid[row][col] === -1) {
      // Out of boundaries
      if (col <= 0) {
        return -1;
      }
      if (grid[row][col - 1] === -1) {
        queue.push({ row: row + 1, col: col - 1 });
      } else if (grid[row][col - 1] === 1) {
        // Ball stuck
        return -1;
      }
    }
  }
}
