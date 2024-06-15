/*
Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix.
If there is no clear path, return -1.

A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right
cell (i.e., (n - 1, n - 1)) such that:

All the visited cells of the path are 0.
All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they
    share an edge or a corner).
The length of a clear path is the number of visited cells of this path.

https://leetcode.com/problems/shortest-path-in-binary-matrix/
*/

// Time O(M * N)
var shortestPathBinaryMatrix = function(grid) {
    if(!grid.length) {
        return 0;
    }
    // 0,0 should be 0 always
    if(grid[0][0]) {
        return -1;
    }

    let ROW = grid.length;
    let COL = grid[0].length;
    let visited = new Array(ROW);
    for (let i = 0; i < ROW; i++) {
        visited[i] = new Array(COL).fill(false);
    }

    let queue = [{r: 0, c: 0, d: 1}];
    visited[0][0] = true;
    
    let rowK = [0, -1, -1, -1, 0, 1, 1, 1];
    let colK = [-1, -1, 0, 1, 1, 1, 0, -1];
    
    while (queue.length) {
        let len = queue.length;
        for (let i = 0; i < len; i++) {
            let {r, c, d} = queue.shift();

            if (r === ROW - 1 && c === COL - 1) {
                return d;
            }

            for (let j = 0; j < 8; j++) {
                let nextRow = r + rowK[j];
                let nextCol = c + colK[j];
                if (isSafe(nextRow, nextCol, grid, visited)) {
                    visited[nextRow][nextCol] = true;
                    queue.push({r: nextRow, c: nextCol, d: d + 1})
                }
            }
        }
    }
    return -1;
}  


function isSafe(row, col, grid, visited) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
        (row >= 0 && row < ROW) &&
        (col >= 0 && col < COL) &&
        visited[row][col] === false &&
        grid[row][col] === 0
    );
}