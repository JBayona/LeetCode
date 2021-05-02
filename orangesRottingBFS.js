/*
In a given grid, each cell can have one of three values:
the value 0 - representing an empty cell;
the value 1 - representing a fresh orange;
the value 2 - representing a rotten orange.

Every minute, any fresh orange that is adjacent (4-directionally) to a rotten
orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. 

If this is impossible, return -1 instead.

Example 1:
Input: [[2,1,1],[1,1,0],[0,1,1]]
Output: 4

Example 2:
Input: [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation:  The orange in the bottom left corner (row 2, column 0) is never rotten, because
rotting only happens 4-directionally.

Example 3:
Input: [[0,2]]
Output: 0
Explanation:  Since there are already no fresh oranges at minute 0, the answer is just 0.
 
Note:

1 <= grid.length <= 10
1 <= grid[0].length <= 10
grid[i][j] is only 0, 1, or 2.

https://leetcode.com/problems/rotting-oranges/
*/

// BFS
var orangesRotting = function(grid) {
    let ROW = grid.length;
    let COL = grid[0].length;
    let countOranges = 0;
    
    let queue = [];
    let visited = new Array(ROW).fill(false);
    for(let i = 0; i < visited.length; i++) {
        visited[i] = new Array(COL).fill(false);
    }
    
    // Fill initial visited
    for(let i = 0; i < ROW; i++) {
        for(let j = 0; j < COL; j++) {
            // For rotten oranges, we need to identify them
            if(grid[i][j] === 2) {
                queue.push({row: i, col: j});
                // Set 0 as there's no distance to reach a rotten orange
                visited[i][j] = 2;
            } else if(grid[i][j] === 1){ // Oranges in good state
                countOranges++;
            }
        }
    }
    
    //  Directions
    let rowK = [-1,0,0,1];
    let colK = [0,-1,1,0];
    
    let minutesPassed = 0;
    
    // Launch BFS
    while(queue.length && countOranges > 0) {
        let size = queue.length;
        minutesPassed++;
        // Get elements for every level
        for(let n = 0; n < size; n++) {
            let node = queue.shift();
            let x = node.row;
            let y = node.col;
            
            // Visit all adjacent nodes
            // Run BFS from the rotten oranges position
            for(let i = 0; i < 4; i++) {
                let newRow = x + rowK[i];
                let newCol = y + colK[i];
                if(isSafe(grid, visited, newRow, newCol)) {
                    // Update the fresh orange count
                    countOranges--;
                    // Mark orange as rotten or visited
                    visited[newRow][newCol] = 2;
                    // From where we are coming
                    queue.push({row: newRow, col: newCol});
                }
            }
        }
    }
    return countOranges === 0 ? minutesPassed : -1;
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
