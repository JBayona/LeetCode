/*
You are given an m x n binary matrix grid, where 0 represents a sea cell and 1 represents a land cell.

A move consists of walking from one land cell to another adjacent (4-directionally) land cell or walking off the boundary of the grid.

Return the number of land cells in grid for which we cannot walk off the boundary of the grid in any number of moves.

https://leetcode.com/problems/number-of-enclaves/description/?envType=study-plan-v2&envId=graph-theory
*/

var numEnclaves = function(grid) {
    let ROW = grid.length;
    let COL = grid[0].length;

    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            // Run DFS in borders only to mark all of the connected islands connected
            // from borders, this will only leave 1s non-border connected untouched
            if (grid[i][j] === 1 && (i === 0 || i === ROW - 1 || j === 0 || j === COL - 1)) {
                // Set to zero to reset and not connect again
                grid[i][j] = 0;
                dfs(i, j, grid);
            }
        }
    }
    
    // At this point all connections with the 1s in the border are already marked
    // as visited (zero override) and we just need to count the number of 1s
    let count = 0;
    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            if (grid[i][j]) {
                count++;
            }
        }
    }
    return count;
};

function dfs(row, col, grid) {
    
    let rowK = [0, -1, 0, 1];
    let colK = [-1, 0, 1, 0];

    for (let i = 0; i < 4; i++) {
        let nextRow = row + rowK[i];
        let nextCol = col + colK[i];
        if (isSafe(nextRow, nextCol, grid)) {
            // Set to zero to reset and not connect again
            grid[nextRow][nextCol] = 0;
            dfs(nextRow, nextCol, grid);
        }
    }
}

function isSafe(row, col, grid) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
        (row >= 0 && row < ROW ) &&
        (col >= 0 && col < COL) &&
        grid[row][col] === 1
    );
}