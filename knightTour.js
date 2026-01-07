/*
https://www.geeksforgeeks.org/the-knights-tour-problem-backtracking-1i/
*/

function knightTour() {
    // Board of 8x8
    let board = new Array(8).fill(-1);
    for(let i = 0; i < board.length; i++) {
        board[i] = new Array(8).fill(-1);
    }

    // Count the number of cells reached
    let count = 1;
    // Start of the knight (0,0)
    board[0][0] = 0

    if(solveKnightTour(0, 0, board, count)) {
        console.log('It has a solution');
        console.log(board);
        return true;
    }

    console.log("It's no possible to reach all cells");
    console.log(board);
    return false;
}

function solveKnightTour(x, y, board, count) {
    let moveX = [-1, -2, -2, -1, 1, 2,  2,  1];
    let moveY = [-2, -1,  1,  2, 2, 1, -1, -2];

    // Base case (8x8 = 64, has visited all cells)
    if(count === 64) {
        return true;
    }

    // Try all the moves from coordinate x, y
    for(let i = 0; i < 8; i++) {
        let nextX = x + moveX[i];
        let nextY = y + moveY[i];
        if(isSafe(nextX, nextY, board)) {
            board[nextX][nextY] = count;
            if(solveKnightTour(nextX, nextY, board, count + 1)) {
                return true;
            } else {
                board[nextX][nextY] = -1; // backtracking 
            }
        }
    }
    return false;
}

function isSafe(x, y, board) {
    return (
        x >= 0 && x < 8  &&
        y >= 0 && y < 8 &&
        board[x][y] === -1
    );
}

console.log(knightTour());
