/*
You are given an m x n integer matrix grid where each cell is either
0 (empty) or 1 (obstacle). You can move up, down, left, or right from and
to an empty cell in one step.

Return the minimum number of steps to walk from the upper left corner (0, 0) to the
lower right corner (m - 1, n - 1) given that you can eliminate at most k obstacles.
If it is not possible to find such walk return -1.

https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/
*/

/ Time: O(N * M * k)
// Space: O(N * M)
// Key: the condition for adding new node into queue is not decided by whether
// its visited before. It should be decided by whether in the new path
// there are fewer obstacles and move is valid.
var shortestPath = function(grid, k) {
    let ROW = grid.length;
    let COL = grid[0].length;
    let blocked = [];
    
    // Visited matrix
    let visited = new Array(ROW);
    for(let i = 0; i < ROW; i++) {
        visited[i] = new Array(COL).fill(Number.MAX_SAFE_INTEGER);
    }
    
    
    let row = [-1, 0, 1, 0];
    let col = [0, 1, 0, -1];
    
    let queue = [];
    queue.push({x: 0, y: 0, n: 0, d: 0});
    while(queue.length) {
        let node = queue.shift();
        if(node.x === ROW - 1 && node.y === COL - 1) {
            return node.d;
        }
        for(let i = 0; i < 4; i++) {
            let nextRow = node.x + row[i];
            let nextCol = node.y + col[i];
            
            if(isSafe(nextRow, nextCol, grid)) {
                let numberObstacles = node.n + grid[nextRow][nextCol];
                if(numberObstacles < visited[nextRow][nextCol] && numberObstacles <= k) {
                    // Fewer number of obstacles to reach this point
                    visited[nextRow][nextCol] = numberObstacles;
                    queue.push({x: nextRow, y: nextCol, n: numberObstacles, d: node.d + 1});
                }
            }
        }
    }
    return -1;
};

function isSafe(row, col, grid) {
    let ROW = grid.length;
    let COL = grid[0].length;
    
    return (
        row >= 0 && row < ROW &&
        col >= 0 && col < COL
    );
}