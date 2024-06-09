/*
In a given 2D binary array A, there are two islands.
(An island is a 4-directionally connected group of 1s not connected to any other 1s.)

Now, we may change 0s to 1s so as to connect the two islands together to form 1 island.

Return the smallest number of 0s that must be flipped.  (It is guaranteed that the answer is at least 1.)
Example 1:

Input: A = [[0,1],[1,0]]
Output: 1
Example 2:

Input: A = [[0,1,0],[0,0,0],[0,0,1]]
Output: 2
Example 3:

Input: A = [[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
Output: 1

https://leetcode.com/problems/shortest-bridge/
*/
// Time Complexity O(N * M) whew N number of rows and M number of columns
var shortestBridge = function(grid) {
  let row = grid.length;
  let col = grid[0].length;
  
  let found = false;
  // We need to mark the first island
  // by paiting
  for(let i = 0; i < row; i++) {
      for(let j = 0; j < col; j++) {
          // Just mark the first one
          if(grid[i][j] === 1) {
              found = true;
              dfs(grid, i, j);
              break;
          }
      }
      if(found) {
          break;
      }
  }
  
  // At this point the first island is painted
  let queue = [];
  for(let i = 0; i < row; i++) {
      for(let j = 0; j < col; j++) {
          if(grid[i][j] === '#') {
              // Keep track of the indexes of the marked island
              queue.push([i,j]);
          }
      }
  }
  
  // BFS
  let rowK = [-1, 0, 0, 1];
  let columnK = [0, -1, 1, 0];
  let steps = 0;
  while(queue.length) {
      let size = queue.length;
      for(let i = 0; i < size; i++) {
          let node = queue.shift();
          let [x, y] = node;
          for(let j = 0; j < 4; j++) {
              let newRow = rowK[j] + x;
              let newCol = columnK[j] + y;
              // We are looking for the positions that are not painted
              // every time we look for the vertical and horizontal valid
              // moves, we mark them and as soon as we find a "1" it means
              // that the grid can be connected now, as we have been flipping
              // the zeroes to get the minimum steps to connect
              if(isSafe(grid, newRow, newCol) && grid[newRow][newCol] !== '#') {
                  // We finally connect the islands
                  if(grid[newRow][newCol] === 1) {
                      console.log(grid);
                      return steps;
                  }
                  // Paint now if we can not make it
                  grid[newRow][newCol] = '#';
                  queue.push([newRow, newCol]);
              }
          }
      }
      steps++;
  }
  return steps;
};

// Paint all the first island
function dfs(grid, row, col) {
  grid[row][col] = '#'; // Mark the first island
  let rowK = [-1, 0, 0, 1];
  let columnK = [0, -1, 1, 0];
  for(let i = 0; i < 4; i++) {
      let newRow = rowK[i] + row;
      let newCol = columnK[i] + col;
      if(isSafe(grid, newRow, newCol) && grid[newRow][newCol] === 1) {
          dfs(grid, newRow, newCol);
      }
  }
}

function isSafe(grid, row, col) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return(
      row >= 0 && row < ROW &&
      col >= 0 && col < COL
  );
}