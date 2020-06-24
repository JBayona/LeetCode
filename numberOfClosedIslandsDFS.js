/*
Given a 2D grid consists of 0s (land) and 1s (water).  An island is a maximal 4-directionally connected group of 0s and a closed island is an island totally (all left, top, right, bottom) surrounded by 1s.

Return the number of closed islands.
Example 1:

Input: grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
Output: 2
Explanation: 
Islands in gray are closed because they are completely surrounded by water (group of 1s).

Example 2:
Input: grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
Output: 1
Example 3:

Input: grid = [[1,1,1,1,1,1,1],
               [1,0,0,0,0,0,1],
               [1,0,1,1,1,0,1],
               [1,0,1,0,1,0,1],
               [1,0,1,1,1,0,1],
               [1,0,0,0,0,0,1],
               [1,1,1,1,1,1,1]]
Output: 2

https://leetcode.com/problems/number-of-closed-islands/
*/

var closedIsland = function(grid) {
  let answer = 0;
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[0].length; j++) {
      if(grid[i][j] === 0) {
        // Check if the 0 isn´t border/connected to border
        let found = dfs(grid, i, j);
        if(found) {
          answer++;
        }
      }
    }
  }
  return answer;
};

function dfs(grid, row, col) {
  if(grid[row][col] === 1) {
    return true;
  }

  if(!isSafe(grid, row, col)) {
    return false;
  }
  
  // In order to be a closed island, the island should be surrounded by water
  // so we can ignore the edges of the grid
  if(row === 0 || col === 0 || row === grid.length - 1 || col === grid[0].length - 1) {
    return false;
  }
  
  // Mark as water to move
  grid[row][col] = 1;
  
  // Travel four directions
  let left;
  let right;
  let top;
  let down;
  
  left = dfs(grid, row, col - 1);
  right = dfs(grid, row, col + 1);
  top = dfs(grid, row - 1, col);
  down = dfs(grid, row + 1, col);
  
  return left && right && top && down;
}

function isSafe(grid, row, col) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return (
    row >= 0 && row < ROW &&
    col >= 0 && col < COL
  );
}