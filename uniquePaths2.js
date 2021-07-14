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


// Option 3
// DFS + Memoization
var uniquePathsWithObstacles = function(obstacleGrid) {
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;
    
    // Edge cases
    if(
        obstacleGrid == null || m == 0 || n == 0 ||
        obstacleGrid[m - 1][n - 1] == 1 || obstacleGrid[0][0] == 1
    ) {
        return 0;
    }
    
    
    let memo = new Array(m);
    let visited = new Array(m);
    for(let i = 0; i < m; i++) {
        visited[i] = new Array(n).fill(0);
        memo[i] = new Array(n).fill(null);
    }
    
    // Record the last element, otherewise it will break
    memo[m-1][n-1] = 1;
    dfs(obstacleGrid, visited, 0, 0, memo);
    return memo[0][0];
};

function dfs(matrix, visited, row, col, memo) {
    if(!isSafe(matrix, visited, row, col)) {
        return 0;
    } else if(memo[row][col] != null) {
        return memo[row][col];
    }
    console.log('ENTRA');
    let count = 0;
    // Mark it as visited
    visited[row][col] = 1;
    count += dfs(matrix, visited, row + 1, col, memo);
    count += dfs(matrix, visited, row, col + 1, memo);
    // Reset
    visited[row][col] = 0;
    
    memo[row][col] = count;
    return count;
}

function isSafe(matrix, visited, row, col) {
    let ROW = matrix.length;
    let COL = matrix[0].length;
    return (
        row >= 0 && row < ROW &&
        col >= 0 && col < COL &&
        visited[row][col] !== 1 &&
        matrix[row][col] !== 1
    )
}