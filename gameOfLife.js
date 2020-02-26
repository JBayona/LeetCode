/*
According to the Wikipedia's article: "The Game of Life, also known simply as Life, is a cellular automaton
devised by the British mathematician John Horton Conway in 1970."

Given a board with m by n cells, each cell has an initial state live (1) or dead (0). Each cell interacts with
its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):

1. Any live cell with fewer than two live neighbors dies, as if caused by under-population.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by over-population..
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

Write a function to compute the next state (after one update) of the board given its current state. The next state
is created by applying the above rules simultaneously to every cell in the current state, where births and deaths occur simultaneously.

Example:

Input: 
[
  [0,1,0],
  [0,0,1],
  [1,1,1],
  [0,0,0]
]
Output: 
[
  [0,0,0],
  [1,0,1],
  [0,1,1],
  [0,1,0]
]

Follow up:

Could you solve it in-place? Remember that the board needs to be updated at the same time: You cannot update some
cells first and then use their updated values to update other cells.
In this question, we represent the board using a 2D array. In principle, the board is infinite, which would cause
problems when the active area encroaches the border of the array. How would you address these problems?

https://leetcode.com/problems/game-of-life/
*/

// No podemos modificarl a matriz al vuelo porque luego nos va a alterar el resultado
// Una solución es crear una matriz del mismo tamaño y usar eso pero usaremos espacio extra


// Ahora podemos usar un par de elementos para marcar el siguiente estado
// marcar de muerto => viva = -1
// marcar de viva => muerta = 2
var gameOfLife = function(board) {
    if(!board || !board.length) {
        return;
    }
    let ROW = board.length;
    let COL = board[0].length;
    
    // Try to get the next state of the matrix
    for(let i = 0; i < ROW; i++) {
        for(let j = 0; j < COL; j++) {
            if(board[i][j] === 0) {
                let liveNeighbors = count(board, i, j);
                if(liveNeighbors === 3) {
                    board[i][j] = -1;
                }
            }
            
            if(board[i][j] === 1) {
                let liveNeighbors = count(board, i, j);
                if(liveNeighbors < 2 || liveNeighbors > 3) {
                    board[i][j] = 2;
                }
            }
            
        }
    }
    
    update(board);
    return update;
};

function update(board) {
    let ROW = board.length;
    let COL = board[0].length;
    for(let i = 0; i < ROW; i++) {
        for(let j = 0; j < COL; j++) {
            if(board[i][j] === -1) {
                board[i][j] = 1;
            }
            
            if(board[i][j] === 2) {
                board[i][j] = 0;
            }
        }
    }
}

function count(board, row, col) {
    let moveX = [-1, -1, -1,  0, 0,  1, 1, 1];
    let moveY = [-1,  0,  1, -1, 1, -1, 0, 1];
    let result = 0;
    
    for(let i = 0; i < 8; i++) {
        let newRow = row + moveX[i];
        let newCol = col + moveY[i];
        
        if(isValid(board, newRow, newCol)) {
            if(board[newRow][newCol] === 1 || board[newRow][newCol] === 2) {
                result++;
            }
        }
    }
    return result;
}
    
function isValid(board, row, col) {
    let ROW = board.length;
    let COL = board[0].length;
    return (
        (row >= 0 && row < ROW) &&
        (col >= 0 && col < COL)
    )
}