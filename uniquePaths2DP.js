/*
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
The robot can only move either down or right at any point in time. The robot is trying to reach
the bottom-right corner of the grid (marked 'Finish' in the diagram below).
Now consider if some obstacles are added to the grids. How many unique paths would there be?
An obstacle and space is marked as 1 and 0 respectively in the grid.

https://leetcode.com/problems/unique-paths-ii/
*/

// DP
// Bottom-up
// Time O( M * N)
var uniquePathsWithObstacles = function(obstacleGrid) {
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;
    
    if(obstacleGrid[0][0] === 1) {
        return 0;
    } 
    
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

// Recursion working
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

// Recursion - Time Exceeded
/*
var uniquePathsWithObstacles = function(obstacleGrid) {
    let ROW = obstacleGrid.length;
    let COL = obstacleGrid[0].length;
    
    // Corner case, obstacle is in end location
    if (obstacleGrid[ROW - 1][COL - 1] === 1 || obstacleGrid[0][0] === 1) {
        return 0;
    }

    let count = {n: 0};
    dfs(obstacleGrid, 0, 0, count);
    return count.n;
};

function dfs(grid, row, col, count) {
    if (row === grid.length - 1 && col === grid[0].length - 1) {
        count.n++;
        return;
    }

    if (row >= grid.length || col >= grid[0].length) {
        return;
    }

    if (grid[row][col] === 1) {
        return;
    }

    dfs(grid, row + 1, col, count);
    dfs(grid, row, col + 1, count);
}
*/