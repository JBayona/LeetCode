/*
Given an m x n integers matrix, return the length of the longest increasing path in matrix.
From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or
move outside the boundary (i.e., wrap-around is not allowed).

https://leetcode.com/problems/longest-increasing-path-in-a-matrix/description/
*/
// Time O(M * N)
// Space O(M * N)
var longestIncreasingPath = function(matrix) {
    let ROW = matrix.length;
    let COL = matrix[0].length;
    
    let memo = new Array(ROW).fill(0);
    for(let i = 0; i < ROW; i++) {
        memo[i] = new Array(COL).fill(0);
    }
    
    let max = 0;
    for(let i = 0; i < ROW; i++){
        for(let j = 0; j < COL; j++){
            // Try to maximize the length for every position
            max = Math.max(max, dfs(matrix, memo, i, j));
        }
    }
    return max;
};

function dfs(matrix, memo, row, col){
    // Already cached
    if (memo[row][col] !== 0) {
        return memo[row][col];
    }

    let max = 1;

    let rowK = [ 0, -1, 0, 1];
    let colK = [-1,  0, 1, 0];

    for(let i = 0; i < 4; i++){            
        let nextRow = row + rowK[i];
        let nextCol = col + colK[i];

        if (isSafe(nextRow, nextCol, matrix) && matrix[nextRow][nextCol] < matrix[row][col]) {
            max = Math.max(max, 1 + dfs(matrix, memo, nextRow, nextCol));
        }
    }    
    memo[row][col] = max;
    return memo[row][col];
}

function isSafe(row, col, grid) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
        row >= 0 && row < ROW &&
        col >= 0 && col < COL
    );
}
