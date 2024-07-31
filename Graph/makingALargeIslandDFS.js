/*
You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1.

Return the size of the largest island in grid after applying this operation.

An island is a 4-directionally connected group of 1s.

Example 1:
Input: grid = [[1,0],[0,1]]
Output: 3
Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.

Example 2:
Input: grid = [[1,1],[1,0]]
Output: 4
Explanation: Change the 0 to 1 and make the island bigger, only one island with area = 4.

Example 3:
Input: grid = [[1,1],[1,1]]
Output: 4
Explanation: Can't change any 0 to 1, only one island with area = 4.

https://leetcode.com/problems/making-a-large-island/description/
*/

// Time O(N^2)
// Space O(1)
// Color each island differently and try to connect
// store the area of each island to connect
var largestIsland = function(grid) {
    let ROW = grid.length;
    let COL = grid[0].length;
    let region = {};
    // 0 and 1 are reserved for the island for calculation
    region[0] = 0;

    // 0 and 1 are the current values of the grid, that's why
    // we start with 2
    // Start with an id
    let regionId = 2;
    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            if (grid[i][j] === 1) {
                grid[i][j] = regionId;
                let area = dfs(i, j, grid, regionId);
                region[regionId] = area;
                regionId++;
            }
        }
    }
    
    // This validiation is needed if we don't have any "1"
    let maxArea = (2 in region ? region[2] : 0);
    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            // Try to connect
            if (grid[i][j] === 0) {
                // calculate all his neighbors, the grid is
                // colored by ids for each island, here we identify the neighbors
                // and get its area
                let neighbors = new Set();
                neighbors.add(i > 0 ? grid[i-1][j] : 0);
                neighbors.add(j > 0 ? grid[i][j-1] : 0);
                // -1 because we are adding 1
                neighbors.add(i < ROW - 1 ? grid[i+1][j] : 0);
                neighbors.add(j < COL - 1 ? grid[i][j+1] : 0);
                // Current zero
                let area = 1;
                for (let n of neighbors) {
                    area += (n in region ? region[n] : 0);
                }
                maxArea = Math.max(maxArea, area);
            }
        }
    }
    return maxArea;
};


// Change every 0 to 1 and try
// to maximize the area
// O(N^2)
/*var largestIsland = function(grid) {
    let ROW = grid.length;
    let COL = grid[0].length;
    let visited = new Array(ROW);

    for (let i = 0; i < ROW; i++) {
        visited[i] = new Array(COL).fill(false);
    }

    let result = 0;
    let hasZero = false;
    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            if (grid[i][j] === 0 && visited[i][j] === false) {
                hasZero = true;
                grid[i][j] = 1;
                visited[i][j] = true;
                result = Math.max(result, dfs(i, j, grid, visited));
                grid[i][j] = 0;
            }
        }
    }
    // Entire matrix as has no zero
    return hasZero ? result : ROW * ROW;
};*/

function dfs(row, col, grid, regionId) {
    let rowK = [0, -1, 0, 1];
    let colK = [-1, 0, 1, 0];

    let count = 1;
    for (let i = 0; i < 4; i++) {
        let nextRow = row + rowK[i];
        let nextCol = col + colK[i];
        if (isSafe(nextRow, nextCol, grid) && grid[nextRow][nextCol] === 1) {
            grid[nextRow][nextCol] = regionId;
            count += dfs(nextRow, nextCol, grid, regionId);
        }
    }
    return count;
}

function isSafe(row, col, grid) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
        (row >= 0 && row < ROW) &&
        (col >= 0 && col < COL)
    );
}