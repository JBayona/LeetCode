/*
You are given an m x n matrix maze (0-indexed) with empty cells (represented as '.') and
walls (represented as '+'). You are also given the entrance of the maze, where
entrance = [entrancerow, entrancecol] denotes the row and column of the cell you are
initially standing at.

In one step, you can move one cell up, down, left, or right. You cannot step into a cell with a wall, and you cannot step outside the maze. Your goal is to find the nearest exit from the entrance. An exit is defined
as an empty cell that is at the border of the maze. The entrance does not count as an exit.

Return the number of steps in the shortest path from the entrance to the nearest exit, or -1 if no such path exists.

https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/description/
*/

// Time O(M * N)
// Space O(M * N)
var nearestExit = function(grid, entrance) {
    if (!grid.length) {
        return 0;
    }

    let ROW = grid.length;
    let COL = grid[0].length;

    let visited = new Array(ROW);
    for (let i = 0; i < ROW; i++) {
        visited[i] = new Array(COL).fill(false);
    }

    let ROWK = [0, -1, 0, 1];
    let COLK = [-1, 0, 1, 0];

    let queue = [];
    queue.push({x: entrance[0], y: entrance[1], d: 0});
    visited[entrance[0]][entrance[1]] = true;

    while (queue.length) {
        let len = queue.length;
        for (let i = 0; i < len; i++) {
            let {x, y, d} = queue.shift();
            // We are not allowed to exit in the same entrance if it's border
            if (isExit(x, y, grid) && (x !== entrance[0] || y !== entrance[1])) {
                return d;
            }
            for (let j = 0; j < 4; j++) {
                let nextRow = x + ROWK[j];
                let nextCol = y + COLK[j];
                if (isSafe(nextRow, nextCol, grid, visited)) {
                    visited[nextRow][nextCol] = true;
                    queue.push({x: nextRow, y: nextCol, d: d + 1});
                }
            }
        }
    }
    return -1;
};

function isExit(x, y, grid) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
        x === 0 || x === ROW - 1 || y === 0 || y === COL - 1
    );
}

function isSafe(row, col, grid, visited) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
        row >= 0 && row < ROW &&
        col >= 0 && col < COL &&
        visited[row][col] === false &&
        grid[row][col] === '.'
    );
}