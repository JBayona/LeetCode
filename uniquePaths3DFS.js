/*
You are given an m x n integer array grid where grid[i][j] could be:

1 representing the starting square. There is exactly one starting square.
2 representing the ending square. There is exactly one ending square.
0 representing empty squares we can walk over.
-1 representing obstacles that we cannot walk over.
Return the number of 4-directional walks from the starting square to the ending square, that walk
over every non-obstacle square exactly once.

https://leetcode.com/problems/unique-paths-iii/
*/

// Approach:
// 1. Find the start and end point.
// 2. Count all each paths using DFS
// 3. Use DFS to explore all possible paths from starting point and move each direction
// 4. Base cases: out of boundary -1, visited already, return 0.
// Time complexity: O(4^(m*n))
// Space complexity: O(m*n)
// DFS
var uniquePathsIII = function(grid) {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    // Count number of clean obstacles
    // start with 1 as it's starting in an empty position
    let countEmpty = 1;

    let ROW = grid.length;
    let COL = grid[0].length;

    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            // Identify start
            if (grid[i][j] === 1) {
                startX = i;
                startY = j;
            } else if (grid[i][j] === 2) { // Identify end point
                endX = i;
                endY = j;
            } else if (grid[i][j] === 0) {
                // Count the number of empty spaces we can walk
                countEmpty++;
            }
        }
    }

    return dfs(grid, startX, startY, endX, endY, countEmpty);
};

function dfs(grid, row, col, endX, endY, countEmpty) {
    // If out of bounds or blocker, return 0
    if(!isSafe(grid, row, col) || grid[row][col] === -1) {
        return 0;
    }
    // If we reach the end point, in order to be a valid point
    // we need to have walked across all nodes, if that's true
    // we return one result, otherwise, it's zero as we neded
    // to walk more paths
    if (row === endX && col === endY) {
        if (countEmpty === 0) {
            return 1;
        } else {
            return 0;
        }
    }
    // Avoid cycle, mark it temporarily as visited
    grid[row][col] = -1;
    let paths = (dfs(grid, row + 1, col, endX, endY, countEmpty - 1) +
                dfs(grid, row - 1, col, endX, endY, countEmpty - 1) +
                dfs(grid, row, col + 1, endX, endY, countEmpty - 1) +
                dfs(grid, row, col - 1, endX, endY, countEmpty - 1))
    // Mark is as walkeable
    grid[row][col] = 0;
    
    return paths;
}

function isSafe(grid, row, col) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
        row >= 0 && row < ROW &&
        col >= 0 && col < COL
    );
}
