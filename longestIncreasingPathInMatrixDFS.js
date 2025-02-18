/*
Given an m x n integers matrix, return the length of the longest increasing path in matrix.
From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or
move outside the boundary (i.e., wrap-around is not allowed).

https://leetcode.com/problems/longest-increasing-path-in-a-matrix/description/
*/

// Time O(M * N)
// Space O(M * N)
// Approach, run a DFS on every element of the matrix to always try to
// increment the lenght of the path. As we might have elements that length
// has been processed previously, we can use memoization to hold values.
// For each iteration try to get the max path.
var longestIncreasingPath = function(matrix) {
    if (matrix.lenght) {
        return -1;
    }

    let ROW = matrix.length;
    let COL = matrix[0].length;
    
    let memo = new Array(ROW);
    for (let i = 0; i < ROW; i++) {
        memo[i] = new Array(COL).fill(0);
    }

    let max = 0;
    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            max = Math.max(max, dfs(matrix, memo, i, j));
        }
    }
    return max;
};

function dfs(matrix, memo, row, col) {
    // If the element has been computed already
    if (memo[row][col] !== 0) {
        return memo[row][col];
    }

    let rowK = [0, -1, 0, 1];
    let colK = [-1, 0, 1, 0];
    let max = 1;
    for (let i = 0; i < 4; i++) {
        let nextRow = row + rowK[i];
        let nextCol = col + colK[i];
        if (isSafe(matrix, nextRow, nextCol) && matrix[nextRow][nextCol] < matrix[row][col]) {
            max = Math.max(max, 1 + dfs(matrix, memo, nextRow, nextCol));
        }
    }
    // Save in the memo for the max path at that point
    memo[row][col] = max;
    return memo[row][col];
}

function isSafe(matrix, row, col) {
    let ROW = matrix.length;
    let COL = matrix[0].length;
    return (
        row >= 0 && row < ROW &&
        col >= 0 && col < COL
    );
}