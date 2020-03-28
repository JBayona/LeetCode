/*
Given a matrix of M x N elements (M rows, N columns), return all elements of the matrix in diagonal order as shown in the below image.

 

Example:

Input:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]

Output:  [1,2,4,7,5,3,6,8,9]

Note:

The total number of elements of the given matrix will not exceed 10,000.

https://leetcode.com/problems/diagonal-traverse/
*/

var findDiagonalOrder = function(matrix) {
    if (!matrix.length) {
        return matrix;
    }
    
    const ROW = matrix.length;
    const COL = matrix[0].length;
    
    const result = [];
    let i = 0;
    let j = 0;
    let goUp = true; // direction marker

    // while result is not filled up with (ROW * COL) elements
    while (result.length < ROW * COL) {
        result.push(matrix[i][j]);
        
        if (goUp) { // if direction is top-right
            if (j === COL - 1) { // if last coloumn - move one row down and change direction
                i++;
                goUp = false;
            } else if (i === 0) { // else if first row - move one coloumn right and change direction
                j++;
                goUp = false;
            } else { // else just move diagonally to top-right
                i--;
                j++;
            }
        } else { // if direction is bottom-left
            if (i === ROW - 1) { // if last row - move right and change direction
                j++;
                goUp = true;
            } else if (j === 0) { // else if first coloumn - move down and change direction
                i++;                   
                goUp = true;
            } else { // else just move diagonally to bottom-left
                i++;
                j--;
            }
        }
    }
    return result;
};