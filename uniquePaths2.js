/*
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right
corner of the grid (marked 'Finish' in the diagram below).

Now consider if some obstacles are added to the grids. How many unique paths would there be?

An obstacle and space is marked as 1 and 0 respectively in the grid.

https://leetcode.com/problems/unique-paths-ii/
*/

// DP
// Bottom-up
var uniquePathsWithObstacles = function(obstacleGrid) {
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;
    
    // Set first element
    // If we have a restriction in the first element, we can do nothing
    obstacleGrid[0][0] = obstacleGrid[0][0] == 1 ? 0: 1;
    
    for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            // If we are in the first row, we can just move from the left
            if(i === 0 && j > 0) {
                obstacleGrid[i][j] = (obstacleGrid[i][j - 1] === 1 && obstacleGrid[i][j] === 0) ? 1 : 0;
            } else if(j == 0 && i > 0) {
                // If we are in the left column, we can only move to the bottom
                obstacleGrid[i][j] = (obstacleGrid[i - 1][j] === 1 && obstacleGrid[i][j] === 0) ? 1: 0
            } else if(i > 0 && j > 0){ // Not in the boundaries
                // Get the sum of the combinations from coming from the left and bottom
                obstacleGrid[i][j] = (obstacleGrid[i][j] != 1 ) ? (obstacleGrid[i-1][j] + obstacleGrid[i][j-1]) : 0;
            }
        }
    }
    return obstacleGrid[m-1][n-1];
};

// DP
var uniquePathsWithObstacles = function(obstacleGrid) {
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;
    let dp = new Array(m);
    for(let i = 0; i < m; i++) {
        dp[i] = new Array(n).fill(0);
    }
    
    // Row
    for(let i = 0; i < m; i++) {
        if(obstacleGrid[i][0] === 0) {
            dp[i][0] = 1;
        } else {
            break;
        }
    }
    
    // Column
    for(let i = 0; i < n; i++) {
        if(obstacleGrid[0][i] === 0) {
            dp[0][i] = 1;
        } else {
            break;
        }
    }
    
    for(let i = 1; i < m; i++) {
        for(let j = 1; j < n; j++) {
            if(obstacleGrid[i][j] === 0) {
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            }
        }
    }
    
    return dp[m-1][n-1];
};