/*
Larges continuos block
Given an 2-dimensional array of integers, find the size of the largest continuos block (vertical, horizontal)
connected of numbers with the same value
*/

// Time Complexity O(N)
function largestContinuosBlock(grid) {
  let ROW = grid.length;
  let COL = grid[0].length;

  let visited = new Array(ROW);
  for(let i = 0; i < ROW; i++) {
    visited[i] = new Array(COL).fill(0);
  }

  let result = 0;
  for(let i = 0; i < ROW; i++) {
    for(let j = 0; j < COL; j++) {
      // Only restricción is that the matrix has not been visited
      if(visited[i][j] !== 1) {
        visited[i][j] = 1;
        let count = dfs(grid, i, j, visited);
        result = Math.max(result, count);
      }
    }
  }
  return result;
}

function dfs(grid, row, col, visited) {
  let current = grid[row][col];
  // Count the consecutive elements
  let result = 1;

  let rowK = [-1, 0, 0, 1];
  let columnK = [0, -1, 1, 0];

  for(let i = 0; i < 4; i++) {
    let newRow = rowK[i] + row;
    let newCol = columnK[i] + col;
    // Check if we are under the boundaries and the current element is the same we saw earlier
    if(isSafe(grid, newRow, newCol, visited) && grid[newRow][newCol] === current) {
      // Mark as visited
      visited[newRow][newCol] = 1;
      result += dfs(grid, newRow, newCol, visited);
    }
  }
  return result;
}

function isSafe(grid, row, column, visited){
  let ROW = grid.length;
  let COLUMN = grid[0].length;
  return (
    (row >= 0 && row < ROW) &&
    (column >= 0 && column < COLUMN) &&
    visited[row][column] === 0 
  )
}


/*matrix = [
[1,2,3],
[4,1,6],
[4,5,1],
]; */// Result = 2 for two 4s
/*matrix = [
[1, 1, 1, 2, 4],
[5, 1, 5, 3, 1],
[3, 4, 2, 1, 1],
]*/ // 4 => 1s
matrix = [
[3, 3, 3, 3, 3, 1],
[3, 4, 4, 4, 3, 4],
[2, 4, 3, 3, 3, 4],
[2, 4, 4, 4, 4, 4],
]; // 11 => 4s
console.log(largestContinuosBlock(matrix));