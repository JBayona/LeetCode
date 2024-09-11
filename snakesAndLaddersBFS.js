/*
You are given an n x n integer matrix board where the cells are labeled from 1 to n2 in a Boustrophedon
style starting from the bottom left of the board (i.e. board[n - 1][0]) and alternating direction each row.

You start on square 1 of the board. In each move, starting from square curr, do the following:

Choose a destination square next with a label in the range [curr + 1, min(curr + 6, n2)].
This choice simulates the result of a standard 6-sided die roll: i.e., there are always at most 6 destinations
regardless of the size of the board.
If next has a snake or ladder, you must move to the destination of that snake or ladder. Otherwise, you move to next.
The game ends when you reach the square n2.
A board square on row r and column c has a snake or ladder if board[r][c] != -1. The destination of that snake or
ladder is board[r][c]. Squares 1 and n2 are not the starting points of any snake or ladder.

Note that you only take a snake or ladder at most once per move. If the destination to a snake or ladder
is the start of another snake or ladder, you do not follow the subsequent snake or ladder.

For example, suppose the board is [[-1,4],[-1,3]], and on the first move, your destination square is 2.
You follow the ladder to square 3, but do not follow the subsequent ladder to 4.
Return the least number of moves required to reach the square n2. If it is not possible to reach the square, return -1.

https://leetcode.com/problems/snakes-and-ladders/description/
*/

// Time O(N^2)
// Space O(N^2)
// Approach: Get the next position based on the cell, which is the index
// Based on that index we simulate the 6 options we can have from rolling a dice
// If the cell is snake or ladder we don't use it anymore and that's why we take
// just the cell, we also need to consider for the visited elements.
var snakesAndLadders = function (board) {
  let N = board.length;
  let destination = N * N;
  let visited = new Set();

  let queue = [{ cell: 1, d: 0 }];
  visited.add(1);

  while (queue.length) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let { cell, d } = queue.shift();
      let [row, col] = getNextPosition(cell, N);
      // If snake or ladder, don't make another move
      if (board[row][col] !== -1) {
        cell = board[row][col];
      }

      if (cell === destination) {
        return d;
      }

      // Visit the 6 cells
      for (let j = 1; j < 7; j++) {
        // Based on index
        let nextCell = cell + j;
        // Skip visited
        if (visited.has(nextCell)) {
          continue;
        }
        visited.add(nextCell);
        queue.push({ cell: nextCell, d: d + 1 });
      }
    }
  }
  return -1;
};

// This position will be based on the index, we know
// that starts bottom left from 1 to N
function getNextPosition(cell, N) {
  let row = Math.floor((cell - 1) / N);
  let col = (cell - 1) % N;

  // For even rows, numbers increase from Left to Right
  // and for odd rows, numbers increase from right to left
  // Even row
  if (row % 2 === 0) {
    return [N - row - 1, col];
  }
  // Odd row
  return [N - row - 1, N - col - 1];
}
