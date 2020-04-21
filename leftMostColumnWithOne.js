/*
(This problem is an interactive problem.)

A binary matrix means that all elements are 0 or 1. For each individual row of the matrix, this row is sorted in non-decreasing order.

Given a row-sorted binary matrix binaryMatrix, return leftmost column index(0-indexed) with at least a 1 in it. If such index doesn't exist, return -1.

You can't access the Binary Matrix directly.  You may only access the matrix using a BinaryMatrix interface:

BinaryMatrix.get(x, y) returns the element of the matrix at index (x, y) (0-indexed).
BinaryMatrix.dimensions() returns a list of 2 elements [n, m], which means the matrix is n * m.
Submissions making more than 1000 calls to BinaryMatrix.get will be judged Wrong Answer.  Also, any solutions that attempt to circumvent the judge will result in disqualification.

For custom testing purposes you're given the binary matrix mat as input in the following four examples. You will not have access the binary matrix directly.

Example 1:

Input: mat = [[0,0],[1,1]]
Output: 0
Example 2:

Input: mat = [[0,0],[0,1]]
Output: 1
Example 3:

Input: mat = [[0,0],[0,0]]
Output: -1
Example 4:

Input: mat = [[0,0,0,1],[0,0,1,1],[0,1,1,1]]
Output: 1 

Constraints:

1 <= mat.length, mat[i].length <= 100
mat[i][j] is either 0 or 1.
mat[i] is sorted in a non-decreasing way.

https://leetcode.com/explore/challenge/card/30-day-leetcoding-challenge/530/week-3/3306/
youtube.com/watch?v=5nB8bQEbLkA
https://leetcode.com/discuss/interview-question/341247/Facebook-or-Phone-screen-or-Leftmost-column-index-of-1
*/

var leftMostColumnWithOne = function(binaryMatrix) {
    let dimensions = binaryMatrix.dimensions();
    let ROW = dimensions[0];
    let COL = dimensions[1];
    
    let result = COL;
    
    // Do a binary search for all rows
    for(let i = 0; i < ROW; i++) {
        let column = findColumn(i, COL, binaryMatrix);
        result = Math.min(result, column)
    }
    
    // if result is COL it means we didn't find a one in the matrix
    return result === COL ? -1 : result;
};

function findColumn(row,  COL, binaryMatrix) {
    let start = 0;
    let end = COL;
    while(start < end) {
        let middle = Math.floor((start + end) / 2);
        let element = binaryMatrix.get(row, middle);
        // Means that 1 is to the right
        if(element === 0) {
            start =  middle + 1;
        } else {
            end = middle;
        }
    }
    // Return the left most
    return start;
}