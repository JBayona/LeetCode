/*
Given a matrix A, return the transpose of A.

The transpose of a matrix is the matrix flipped over it's main diagonal, switching the row and column indices of the matrix.

 

Example 1:

Input: [[1,2,3],[4,5,6],[7,8,9]]
Output: [[1,4,7],[2,5,8],[3,6,9]]
Example 2:

Input: [[1,2,3],[4,5,6]]
Output: [[1,4],[2,5],[3,6]]
 

Note:

1 <= A.length <= 1000
1 <= A[0].length <= 1000

https://leetcode.com/problems/transpose-matrix/
/
Level up your coding skills and quickly land a job. This is the best place to expand your knowledge and get prepared for your next interview.
leetcode.com

*/

// Time O(R * C)
// Space O(N)
var transpose = function(A) {
    let ROW = A.length;
    let COL = A[0].length;
    
    // Create result matrix
    let result = new Array(COL);
    for(let i = 0; i < COL; i++) {
        result[i] = new Array(ROW).fill(0);
    }
    
    for(let i = 0; i < ROW; i++) {
        for(let j = 0; j < COL; j++) {
            result[j][i] = A[i][j];
        }
    }
    
    return result;
};

var transpose = function(matrix) {
    return matrix.reduce((elem, row) => row.map((_, i) => [...(elem[i] || []), row[i]]), [])
};
