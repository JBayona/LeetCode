/*
Given a non-empty 2D array grid of 0's and 1's, an island is a group of 1's (representing land) connected 4-directionally
(horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

Find the maximum area of an island in the given 2D array. (If there is no island, the maximum area is 0.)

Example 1:

[[0,0,1,0,0,0,0,1,0,0,0,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,1,1,0,1,0,0,0,0,0,0,0,0],
 [0,1,0,0,1,1,0,0,1,0,1,0,0],
 [0,1,0,0,1,1,0,0,1,1,1,0,0],
 [0,0,0,0,0,0,0,0,0,0,1,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,0,0,0,0,0,0,1,1,0,0,0,0]]
Given the above grid, return 6. Note the answer is not 11, because the island must be connected 4-directionally.
Example 2:

[[0,0,0,0,0,0,0,0]]
Given the above grid, return 0.
Note: The length of each dimension in the given grid does not exceed 50.

https://leetcode.com/problems/max-area-of-island/
*/

var maxAreaOfIsland = function(grid) {
    let ROW = grid.length;
    let COL = grid[0].length;
    
    let visited = new Array(ROW);
    for(let i = 0; i < visited.length; i++) {
        visited[i] = new Array(COL).fill(0);
    }
    
    let max = 0;
    for(let i = 0; i < ROW; i++) {
        for(let j = 0; j < COL; j++) {
            // Not visited
            if(grid[i][j] === 1 && visited[i][j] === 0) {
                visited[i][j] = 1;
                dfsResult = dfs(grid, visited, i, j);
                max = Math.max(max, dfsResult);
            }
        }
    }
    return max;
};

function dfs(grid, visited, row, col, count) {
    let ROW = [ 0,-1, 0, 1];
    let COL = [-1, 0, 1, 0];

    // If we  reach here is because is valid
    let sum = 1;
    for(let i = 0; i < 4; i++) {
        let nextRow = ROW[i] + row;
        let nextCol = COL[i] + col;
        if(isSafe(grid, visited, nextRow, nextCol)) {
            visited[nextRow][nextCol] = 1;
            sum +=dfs(grid, visited, nextRow, nextCol, count);
        }
    }
    return sum;
}

function isSafe(grid, visited, row, col) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
        row >= 0 && row < ROW &&
        col >= 0 && col < COL &&
        grid[row][col] === 1 &&
        visited[row][col] === 0
    );
}