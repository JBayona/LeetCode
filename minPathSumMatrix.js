/*
Given a m x n grid filled with non-negative numbers, find a path from top left to
bottom right which minimizes the sum of all numbers along its path.
Note: You can only move either down or right at any point in time.
Example:

Input:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
Output: 7

Explanation: Because the path 1→3→1→1→1 minimizes the sum.

https://leetcode.com/problems/minimum-path-sum/
*/

var minPathSum = function(grid) {
    const ROW = grid.length;
    const COL = grid[0].length;
    
    for(let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            // at start, do nothing
            if (i === 0 && j === 0) continue;
            
            if (i !== 0 && j !== 0) {
                // We are in the middle
                grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
            } else if (i === 0) { 
                // Agains the ceiling
                grid[i][j] += grid[i][j - 1];
            } else if (j === 0) { 
                // Agains the left wall
                grid[i][j] += grid[i - 1][j];
            }
        }    
    }

    return grid[ROW - 1][COL - 1]
};

// DP

var minPathSum = function(grid) {
    if(grid.length === 0 || grid === null) return 0;
    
    const ROW = grid.length;
    const COL = grid[0].length;

    // Mark the first row
    for(let i = 1; i < ROW; i++){
         grid[i][0] = grid[i][0] + grid[i-1][0];
    }
    
    // Mark the first column
    for(let i = 1; i < COL; i++){
        grid[0][i] = grid[0][i] + grid[0][i-1];
    }
    
    // if grid is n * 1 or 1 * n, the result is already calculated
    if (ROW != 1 && COL != 1) {
        // traverse the entire matrix
        for (let i = 1; i < ROW; i ++) {
            for (let j = 1; j < COL; j++) {
                grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
            }
        }
    }
    
    return grid[ROW - 1][COL - 1];
};
