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
    let n = grid.length - 1;
    let queue = [];
    let visited = new Array(grid.length);
    for(let i = 0; i < grid.length; i++) {
        visited[i] = new Array(grid.length).fill(0);
    }
    
    let row = [1, -1, 0, 0, 1, 1, -1, -1];
    let col = [0, 0, 1, -1, 1, -1, 1, -1];
    
    // Init state
    queue.push({x: 0, y: 0, d: 1});
    visited[0][0] = 1;
    while(queue.length) {
        let node = queue.shift();
        if(node.x === n && node.y === n) {
            return node.d;
        }
        for(let i = 0; i < 8; i++) {
            let newRow = node.x + row[i];
            let newCol = node.y + col[i];
            if(isSafe(newRow, newCol, grid, visited)) {
                visited[newRow][newCol] = 1;
                queue.push({x: newRow, y: newCol, d: node.d + 1});
            }
        }
    }
    return -1;
};

function isSafe(row, col, grid, visited) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
        row >= 0 && row < ROW &&
        col >= 0 && col < COL &&
        grid[row][col] === 0 &&
        visited[row][col] === 0
    );
}