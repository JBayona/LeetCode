/*
You are given an m x n integer matrix grid where each cell is either
0 (empty) or 1 (obstacle). You can move up, down, left, or right from and to an empty cell
in one step.

Return the minimum number of steps to walk from the upper left corner (0, 0) to the
lower right corner (m - 1, n - 1) given that you can eliminate at most k obstacles.
If it is not possible to find such walk return -1.

https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/
*/
// Time: O(N * M * k)
// Space: O(N * M)
// Key: the condition for adding new node into queue is not decided by whether
// its visited before. It should be decided by whether in the new path
// there are fewer obstacles and move is valid.
var shortestPath = function(grid, k) {
    let ROW = grid.length;
    let COL = grid[0].length;
    let visited = [];
    for (let i = 0; i < ROW; i++) {
        visited[i] = new Array(COL).fill(Infinity);
    }
    
    let queue = [];
    queue.push({x: 0, y: 0, d: 0, n: 0});

    let row = [0, -1, 0, 1];
    let col = [-1, 0, 1, 0];

    while(queue.length) {
        let len = queue.length;
        for (let i = 0; i < len; i++) {
            let {x, y, d, n} = queue.shift();
            // We reach to the lower right corner
            if (x === ROW - 1 && y === COL - 1) {
                return d;
            }

            for (let j = 0; j < 4; j++) {
                let nextRow = x + row[j];
                let nextCol = y + col[j];
                if (isSafe(nextRow, nextCol, grid)) {
                    let numberOfObstacles = n + grid[nextRow][nextCol];
                    // In order to qualify for a result, we need to improve the number of obstacles
                    // we have seen before and we need to be under or equal the limit "k" to be a
                    // candidate for improvement
                    if (numberOfObstacles < visited[nextRow][nextCol] && numberOfObstacles <= k) {
                        // Fewer number of obstacles to reach this point
                        visited[nextRow][nextCol] = numberOfObstacles;
                        queue.push({x: nextRow, y: nextCol, d: d + 1, n: numberOfObstacles});
                    }
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
