/*
Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy all of the following rules:

Each of the digits 1-9 must occur exactly once in each row.
Each of the digits 1-9 must occur exactly once in each column.
Each of the the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
Empty cells are indicated by the character '.'.

https://leetcode.com/problems/sudoku-solver/
*/
// Time O(9*(M * N))
// Space O(9*(M * N))
var solveSudoku = function(board) {
    solve(board, 0, 0);
};

var solve = function(board, row, col){ 
    col = 0;  
    for(let i=row; i<9; i++){
        for(let j=col; j<9; j++){
            // We are only interested on those which have no numbers
            if(board[i][j] !== '.') continue;
            for(let c=1; c<=9; c++){
                // Check if we can set all of the combinations, try to set all of them
                if(isValid(board, i, j, c.toString())){
                    board[i][j] = c.toString();
                    // If it´s valid, break the condition
                    if(solve(board, i, j+1)){
                        return true;
                    }
                    // Reset the value
                    board[i][j] = '.';
                }
            }
            return false;
        }
    }
    return true;
}

var isValid = function(board, x, y, c){
    let rowStart = Math.floor(x/3) * 3;
    let colStart = Math.floor(y/3) * 3;
    
    // Check if we have seen the characters in either row or column
    for(let i=0; i<9; i++){
        if(board[i][y] === c || board[x][i] === c) return false;
    }
    
    // Check if we have seen the element in the bloc
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if(board[rowStart+i][colStart+j] === c) return false;
        }
    }
    
    return true;
}