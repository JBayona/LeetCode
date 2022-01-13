/*
Given a matrix consists of 0 and 1, find the distance of the nearest 0 for each cell.

The distance between two adjacent cells is 1.
Example 1:

Input:
[[0,0,0],
 [0,1,0],
 [0,0,0]]

Output:
[[0,0,0],
 [0,1,0],
 [0,0,0]]
Example 2:

Input:
[[0,0,0],
 [0,1,0],
 [1,1,1]]

Output:
[[0,0,0],
 [0,1,0],
 [1,2,1]]

Note:

The number of elements of the given matrix will not exceed 10,000.
There are at least one 0 in the given matrix.
The cells are adjacent in only four directions: up, down, left and right.

https://leetcode.com/problems/01-matrix/
*/

// BFS
var updateMatrix = function(matrix) {
    let ROW = matrix.length;
    let COL = matrix[0].length;
    
    // Queue to run BFS
    let queue = [];
    // Result array
    let result = new Array(ROW);
    // Visited matrix to avoid loops
    let visited = new Array(ROW).fill(false);
    // Fill out initial values
    for(let i = 0; i < visited.length; i++) {
        visited[i] = new Array(COL).fill(false);
        // Add max numbers so we can track the min numbers
        result[i] = new Array(COL).fill(Number.MAX_SAFE_INTEGER);
    }
    
    // Fill initial visited
    for(let i = 0; i < ROW; i++) {
        for(let j = 0; j < COL; j++) {
            if(matrix[i][j] === 0 && visited[i][j] === false) {
                queue.push({row: i, col: j});
                // Set 0 as there's no distance to reach a rotten orange
                visited[i][j] = true;
                // For 0's there's no distance to find
                result[i][j] = 0;
            }
        }
    }
    //  Directions
    let rowK = [-1,0,0,1];
    let colK = [0,-1,1,0];
    
    let distance = 1;
    // Launch BFS
    while(queue.length) {
        let size = queue.length;
        // Get elements for every level
        for(let n = 0; n < size; n++) {
            let node = queue.shift();
            let x = node.row;
            let y = node.col;

            // Visit all adjacent nodes
            for(let i = 0; i < 4; i++) {
                let newRow = x + rowK[i];
                let newCol = y + colK[i];
                if(isSafe(matrix, visited, newRow, newCol) && distance < result[newRow][newCol]) {
                    visited[newRow][newCol] = true;
                    result[newRow][newCol] = distance;
                    queue.push({row: newRow, col: newCol});
                }
            }
        }
        distance++;
    }
    
    return result;
    
};

function isSafe(grid,visited,row,col){
  let ROW = grid.length;
  let COL = grid[0].length;
  return (
      (row >= 0 && row < ROW) &&
      (col >= 0 && col < COL) &&
      grid[row][col] === 1 &&
      visited[row][col] === false);
} 