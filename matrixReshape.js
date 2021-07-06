/*
In MATLAB, there is a handy function called reshape which can reshape an m x n matrix into
a new one with a different size r x c keeping its original data.

You are given an m x n matrix mat and two integers r and c representing the row number and
column number of the wanted reshaped matrix.

The reshaped matrix should be filled with all the elements of the original matrix in the
same row-traversing order as they were.

If the reshape operation with given parameters is possible and legal, output the new reshaped
matrix; Otherwise, output the original matrix.

https://leetcode.com/problems/reshape-the-matrix/
*/
var matrixReshape = function(mat, r, c) {
    let row = mat.length;
    let col = mat[0].length;
    
    if((row * col !== r * c) || (row === r && col === c)) {
        return mat;
    }
    
    let result = new Array(r);
    for(let i = 0; i < r; i++) {
        result[i] = new Array(c).fill(0);
    }
    let x = 0;
    let y = 0;
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            result[x][y] = mat[i][j];
            y++;
            if(y === c) {
                x++;
                y = 0;
            }
        }
    }
    return result;
};