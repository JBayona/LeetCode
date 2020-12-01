/*
Given an m x n matrix of non-negative integers representing the height of each unit cell in a
continent, the "Pacific ocean" touches the left and top edges of the matrix and the "Atlantic ocean"
touches the right and bottom edges. Water can only flow in four directions (up, down, left, or right) from a cell to another one with height equal or lower.

Find the list of grid coordinates where water can flow to both the Pacific and Atlantic ocean.

Note:

The order of returned grid coordinates does not matter.
Both m and n are less than 150.
 
Example:
Given the following 5x5 matrix:
  Pacific ~   ~   ~   ~   ~ 
       ~  1   2   2   3  (5) *
       ~  3   2   3  (4) (4) *
       ~  2   4  (5)  3   1  *
       ~ (6) (7)  1   4   5  *
       ~ (5)  1   1   2   4  *
          *   *   *   *   * Atlantic

Return:

[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (positions with parentheses in above matrix).

https://leetcode.com/problems/pacific-atlantic-water-flow/
*/

// Instead of figuring out which cells can flow water to ocean, let's look at the problem as figuring out cells where water may reach from both oceans.
// Of course, we need to reverse the height check i.e. water can flow from a cell with height h to another neighbor cell with height >= h.

// Cells directly connected to Pacific ocean are first row and first column so they become our start cells. We can do a DFS/BFS from these start cells to figure out all the reachable cells. Atlantic ocean is similar - we just need to treat last row and last column as start cells.

// Finally, we iterate over all the cells and add the ones that were visited by both traversals to the result.
var pacificAtlantic = function(matrix) {
    if(!matrix.length) {
        return [];
    }
    
    let pacific = new Array(matrix.length);
    let atlantic = new Array(matrix.length);
    for(let i = 0; i < matrix.length; i++) {
        pacific[i] = new Array(matrix[0].length).fill(0);
        atlantic[i] = new Array(matrix[0].length).fill(0);
    }
    
    let row = matrix.length;
    let col = matrix[0].length;
    // Run DFS from the pacific and atlantic borders
    // This mean from first row and column and last row
    // and column
    for(let i = 0; i < row; i++) {
        dfs(matrix, i, 0, pacific);
        dfs(matrix, i, col - 1, atlantic);
    }
    // Run DFS from 
    for(let i = 0; i < col; i++) {
        dfs(matrix, 0, i, pacific);
        dfs(matrix, row - 1, i, atlantic);
    }
    
    let result = [];
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            if(pacific[i][j] && atlantic[i][j]) {
                result.push([i, j]);
            }
        }
    }
    
    return result;
};

function dfs(matrix, row, col, visited) {
    visited[row][col] = true;
    let rowK = [0, -1, 0, 1];
    let colK = [-1, 0, 1, 0];
    for(let i = 0; i < 4; i++) {
        let newRow = row + rowK[i];
        let newCol = col + colK[i];
        if(isValid(newRow, newCol, matrix, visited) && matrix[newRow][newCol] >= matrix[row][col]) {
            dfs(matrix, newRow, newCol, visited);
        }
    }
}

function isValid(row, col, matrix, visited) {
    let ROW = matrix.length;
    let COL = matrix[0].length;
    return (
        row >= 0 && row < ROW &&
        col >= 0 && col < COL &&
        !visited[row][col]
    );
}
