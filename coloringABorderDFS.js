/*
Given a 2-dimensional grid of integers, each value in the grid represents the color of the grid square at that location.
Two squares belong to the same connected component if and only if they have the same color and are
next to each other in any of the 4 directions.

The border of a connected component is all the squares in the connected component that are either
4-directionally adjacent to a square not in the component, or on the boundary of the grid (the first or last row or column).
Given a square at location (r0, c0) in the grid and a color, color the border
of the connected component of that square with the given color, and return the final grid.

Example 1:

Input: grid = [[1,1],[1,2]], r0 = 0, c0 = 0, color = 3
Output: [[3, 3], [3, 2]]
Example 2:

Input: grid = [[1,2,2],[2,3,2]], r0 = 0, c0 = 1, color = 3
Output: [[1, 3, 3], [2, 3, 3]]
Example 3:

Input: grid = [[1,1,1],[1,1,1],[1,1,1]], r0 = 1, c0 = 1, color = 2
Output: [[2, 2, 2], [2, 1, 2], [2, 2, 2]]

https://leetcode.com/problems/coloring-a-border/
*/

var colorBorder = function(grid, r0, c0, color) {
    // Check if we need to change any color
    if(grid[r0][c0] === color) {
        return grid;
    }
    
    let ROW = grid.length;
    let COL = grid[0].length;
    let visited = new Array(ROW);
    for(let i = 0; i < ROW; i++) {
        visited[i] = new Array(COL).fill(false);
    }
    
    // Flood fill algorithm
    dfs(grid, r0, c0, grid[r0][c0], color, visited);
    return grid;
};

function dfs(grid, row, col, oldColor, color, visited) {
    let ROW = grid.length;
    let COL = grid[0].length;
    // Check for boundaries or border
    if(row < 0 || col < 0 || row >= ROW || col >= COL || visited[row][col]) {
        return false;
    }
    if(grid[row][col] !== oldColor) {
        return true;
    }
    visited[row][col] = true;
    // Check if it´s a border
    if(row === 0 || row === ROW - 1 || col === 0 || col === COL - 1) {
        grid[row][col] = color;
    }
    let a = dfs(grid, row + 1, col, oldColor, color, visited);
    let b = dfs(grid, row - 1, col, oldColor, color, visited);
    let c = dfs(grid, row, col + 1, oldColor, color, visited);
    let d = dfs(grid, row, col - 1, oldColor, color, visited);
    
    let result = a || b || c || d;
    
    // We should point it
    if(result) {
        grid[row][col] = color;
    }
    return false;
}
