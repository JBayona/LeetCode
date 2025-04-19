/*
Given a 2D board containing 'X' and 'O' (the letter O), capture all regions surrounded by 'X'.
A region is captured by flipping all 'O's into 'X's in that surrounded region.
Example:

X X X X
X O O X
X X O X
X O X X

After running your function, the board should be:

X X X X
X X X X
X X X X
X O X X
Explanation:

Surrounded regions shouldn’t be on the border, which means that any 'O' on the border of the board
are not flipped to 'X'. Any 'O' that is not on the border and it is not connected to an 'O' on the
border will be flipped to 'X'. Two cells are connected if they are adjacent cells connected horizontally or vertically.

https://leetcode.com/problems/surrounded-regions/
*/
// Approach, we need to run a DFS only on the border of the grid whenever
// we find there's a "O", if we find it, we ran a DFS and we mark to "*"
// whenever the cell is valid, otherwise everything else will be a cross.
// We convert all "O" to "*" which is what we want to keep.
// Time O(M * N)
// Space O(M * N)
var solve = function(board) {
    if (!board.length) {
        return [];
    }

    let ROW = board.length;
    let COL = board[0].length;
    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            // Run DFS only on borders and when there's a "O"
            if (board[i][j] === 'O' && (i === 0 || i === ROW - 1 || j === 0 || j === COL - 1)) {
                dfs(board, i, j);
            }
        }
    }

    // Convert the grid into the desidre format
    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            if (board[i][j] === '*') {
                board[i][j] = 'O';
            } else {
                board[i][j] = 'X'
            }
        }
    }
    return board;
};

function dfs(grid, row, col) {
    // Out of boundaries
    if (!isSafe(grid, row, col)) {
        return;
    }

    // The cell is not valid or it has been coverted before
    if (grid[row][col] === 'X' || grid[row][col] === '*') {
        return;
    }

    grid[row][col] = '*';
    dfs(grid, row + 1, col);
    dfs(grid, row, col + 1);
    dfs(grid, row - 1, col);
    dfs(grid, row, col - 1);
}

function isSafe(grid, row, col) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
        row >= 0 && row < ROW &&
        col >= 0 && col < COL &&
        grid[row][col] === 'O'
    );
}
