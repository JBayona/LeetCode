/* 
Given N X N matrix filled with 1 , 0 , 2 , 3 . Find whether there is a path possible from source to destination
traversing through blank cells only. You can traverse up, down, right and left.

https://www.geeksforgeeks.org/find-whether-path-two-cells-matrix/
*/
function canReach(grid) {
  let row = grid.length;
  let col = grid[0].length;

  let visited = new Array(grid.length);
  for (let i = 0; i < visited.length; i++) {
    visited[i] = new Array(visited.length).fill(0);
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] === 1 && !visited[i][j]) {
        if (checkPath(grid, i, j, visited)) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkPath(grid, row, col, visited) {
  let rowK = [0, -1, 0, 1];
  let colK = [-1, 0, 1, 0];

  if (!isSafe(grid, visited, row, col)) {
    return false;
  }

  // Mark cell as visited
  visited[row][col] = 1;

  // Base case to break recursion
  if (grid[row][col] === 2) {
    return true;
  }

  if (
    checkPath(grid, row + 0, col - 1, visited) ||
    checkPath(grid, row - 1, col + 0, visited) ||
    checkPath(grid, row + 0, col + 1, visited) ||
    checkPath(grid, row + 1, col + 0, visited)
  ) {
    return true;
  }
  // No path has been found
  return false;
}

function isSafe(grid, visited, row, col) {
  return (
    row >= 0 &&
    row < grid.length &&
    col >= 0 &&
    col < grid[0].length &&
    // we have not visited
    visited[row][col] === 0 &&
    // If we have a free space, we are on the destination or we reach the goal
    (grid[row][col] === 3 || grid[row][col] === 2 || grid[row][col] === 1)
  );
}

// 1 = source
// 2 = destination
// 3 = free space
// 0 = block
grid = [
  [0, 3, 2],
  [3, 3, 0],
  [1, 3, 0],
];
console.log(canReach(grid));
