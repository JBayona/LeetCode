/*
Larges continuos block
Given an 2-dimensional array of integers, find the size of the largest continuos block (vertical, horizontal)
connected of numbers with the same value
*/

// Time Complexity O(N)
var getMaxBlock = function(grid) {
  let result = 0;
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[0].length; j++) {
      if(grid[i][j] !== -1) {
        let count = bfs(grid, i, j);
        result = Math.max(result, count);
      }
    }
  }
  return result;
};

function bfs(grid, row, col){
  let rowK = [-1, 0, 0, 1];
  let columnK = [0, -1, 1, 0];

  let queue = [];

  // Store temporary the element
  let v = grid[row][col];
  // To avoid loops
  grid[row][col] = -1;

  queue.push({x: row, y: col});
  let result = 1;
  while(queue.length) {
    let n = queue.length;
    for(let i = 0; i < n; i++) {
      let node = queue.shift();
      let x = node.x;
      let y = node.y;
      for(let j = 0; j < 4; j++) {
        // Check if it's valid move
        let newRow = x + rowK[j];
        let newCol = y + columnK[j];
        if(isSafe(grid, newRow, newCol) && grid[newRow][newCol] === v) {
          queue.push({x: newRow, y: newCol});
          result++;
          // Mark as visited
          grid[newRow][newCol] = -1;
        }
      }
    }
  }
  return result;
}

function isSafe(grid, row, column, visited){
  let ROW = grid.length;
  let COLUMN = grid[0].length;
  return (
    (row >= 0 && row < ROW) &&
    (column >= 0 && column < COLUMN)
  )
}

//matriz = [
  //[1,2,3],
  //[4,1,6],
  //[4,5,1],
//]; // Result = 2 for two 4s
// matriz = [
  //[1, 1, 1, 2, 4],
  //[5, 1, 5, 3, 1],
  //[3, 4, 2, 1, 1],
//] // 4 => 1s
matriz = [
[3, 3, 3, 3, 3, 1],
[3, 4, 4, 4, 3, 4],
[2, 4, 3, 3, 3, 4],
[2, 4, 4, 4, 4, 4],
]; // 11 => 4s
console.log(getMaxBlock(matriz));