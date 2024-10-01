/*
The n-queens puzzle is the problem of placing n queens on an n×n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle.
Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both
indicate a queen and an empty space respectively.

https://leetcode.com/problems/n-queens/submissions/
https://www.youtube.com/watch?v=xouin83ebxE
*/
// Time O(N!)
// Space O(N)
var solveNQueens = function(n) {
    let ROW = n;
    let COL = n;
    let board = new Array(n);
    for (let i = 0; i < ROW; i++) {
        board[i] = new Array(COL).fill(false);
    }
    return queens(board, 0)
};

function queens(board, row) {
    let list = [];
    if (row === board.length) {
        list.push(addRow(board));
        return list;
    }
    // Place all the queens and check for every row and col
    for (let col = 0; col < board.length; col++) {
        // Place and check if it's safe to place the queen
        if (isSafe(board, row, col)) {
            board[row][col] = true;
            list.push(...queens(board, row + 1));
            // Backtrack
            board[row][col] = false;
        }
    }
    return list;
}

function isSafe(board, row, col) {
    // Check vertical row
    for (let i = 0; i < row; i++) {
        if(board[i][col]) {
            return false;
        }
    }
    // Check for diagonal left
    let maxLeft = Math.min(row, col);
    for (let i = 1; i < maxLeft + 1; i++) {
        if (board[row - i][col - i]) {
            return false;
        }
    }
    // Check for diagonal right
    let maxRight = Math.min(row, board.length - col - 1);
    for (let i = 1; i < maxRight + 1; i++) {
        if (board[row - i][col + i]) {
            return false;
        }
    }
    return true;
}

function addRow(board) {
    let answer = [];
    for (let i = 0; i < board.length; i++) {
        let s = '';
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j]) {
                s += 'Q';
            } else {
                s += '.';
            }
        }
        answer.push(s);
    }
    return answer;
}
