/*
While your players are waiting for a game, you've developed a solitaire game for the players to pass the time with.
The player is given an NxM board of tiles from 0 to 9 like this:
  4   4   4   4
  5   5   5   4
  2   5   7   5
The player selects one of these tiles, and that tile will disappear, along with any tiles with the same
number that are connected with that tile (up, down, left, or right), and any tiles with the same number connected with those, and so on.
For example, if the 4 in the upper left corner is selected, these five tiles disappear
 >4< >4< >4< >4<
  5   5   5  >4<
  2   5   7   5
If the 5 just below it is selected, these four tiles disappear. Note that tiles are not connected diagonally.
  4   4   4   4
 >5< >5< >5<  4
  2  >5<  7   5
Write a function that, given a grid of tiles and a selected row and column of a tile, returns how many tiles will disappear.
grid1 = [[4, 4, 4, 4],
         [5, 5, 5, 4],
         [2, 5, 7, 5]]
disappear(grid1, 0, 0)  => 5
disappear(grid1, 1, 1)  => 4
disappear(grid1, 1, 0)  => 4
This is the grid from above.

Additional Inputs
grid2 = [[0, 3, 3, 3, 3, 3, 3],
         [0, 1, 1, 1, 1, 1, 3],
         [0, 2, 2, 0, 2, 1, 4],
         [0, 1, 2, 2, 2, 1, 3],
         [0, 1, 1, 1, 1, 1, 3],
         [0, 0, 0, 0, 0, 0, 0]]

grid3 = [[0]]

grid4 = [[1, 1, 1],
         [1, 1, 1],
         [1, 1, 1]]

All Test Cases
disappear(grid1, 0, 0)  => 5
disappear(grid1, 1, 1)  => 4
disappear(grid1, 1, 0)  => 4
disappear(grid2, 0, 0)  => 12
disappear(grid2, 3, 0)  => 12
disappear(grid2, 1, 1)  => 13
disappear(grid2, 2, 2)  => 6
disappear(grid2, 0, 3)  => 7
disappear(grid3, 0, 0)  => 1
disappear(grid4, 0, 0)  => 9
N - Width of the grid
M - Height of the grid
**/

function disappear(grid, row, col) {
  let visited = new Array(grid.length);
  for(let i = 0; i < visited.length; i++) {
    visited[i] = new Array(visited.length).fill(0);
  }
  // Get the first number
  let number = grid[row][col];
  // Mark the number as visited
  visited[row][col] = 1;
  let count = dfs(grid, row, col, number, visited);
  return count;
}

function dfs(grid, row, col, number, visited) {
  let ROW = [0, -1, 0, 1];
  let COL = [-1, 0, 1, 0];
  let count = 1
  for(let i = 0; i < 4; i++) {
    let nextRow = ROW[i] + row;
    let nextCol = COL[i] + col;
   if(isSafe(grid, nextRow, nextCol, number, visited)) {
    visited[nextRow][nextCol] = 1;
     count += dfs(grid, nextRow, nextCol, number, visited);
   }
  }
  return count;
}

function isSafe(grid, row, col, number, visited) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return (
    row >= 0 && row < ROW &&
    col >= 0 && col < COL &&
    !visited[row][col] &&
    grid[row][col] === number
  )
}

const grid1 = [
  [4, 4, 4, 4],
  [5, 5, 5, 4],
  [2, 5, 7, 5]
];
const grid2 = [[0, 3, 3, 3, 3, 3, 3],
         [0, 1, 1, 1, 1, 1, 3],
         [0, 2, 2, 0, 2, 1, 4],
         [0, 1, 2, 2, 2, 1, 3],
         [0, 1, 1, 1, 1, 1, 3],
         [0, 0, 0, 0, 0, 0, 0]];
const grid3 = [[0]];
const grid4 = [[1, 1, 1],
                  [1, 1, 1],
                  [1, 1, 1]];
console.log(disappear(grid1, 0, 0)); // => 5
console.log(disappear(grid1, 1, 1));
console.log(disappear(grid1, 1, 0));
console.log(disappear(grid2, 0, 0));
console.log(disappear(grid2, 3, 0));
console.log(disappear(grid2, 1, 1));
console.log(disappear(grid2, 2, 2));
console.log(disappear(grid2, 0, 3));
console.log(disappear(grid3, 0, 0));
console.log(disappear(grid4, 0, 0));

/*
All Test Cases
disappear(grid1, 0, 0)  => 5
disappear(grid1, 1, 1)  => 4
disappear(grid1, 1, 0)  => 4
disappear(grid2, 0, 0)  => 12
disappear(grid2, 3, 0)  => 12
disappear(grid2, 1, 1)  => 13
disappear(grid2, 2, 2)  => 6
disappear(grid2, 0, 3)  => 7
disappear(grid3, 0, 0)  => 1
disappear(grid4, 0, 0)  => 9
*/
