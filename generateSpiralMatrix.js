/*
Given a positive integer n, generate a square matrix filled with elements from 1 to n2 in spiral order.

Example:

Input: 3
Output:
[
 [ 1, 2, 3 ],
 [ 8, 9, 4 ],
 [ 7, 6, 5 ]
]

https://github.com/JBayona/LeetCode/blob/master/scheduleFreeSlotsDoordash.js
*/

var generateMatrix = function(n) {
    let matrix = new Array(n);
    for(let i = 0; i < n; i++) {
        matrix[i] = new Array(n). fill(0);
    }
    
    let rowStart = 0;
    let rowEnd = n;
    let colStart = 0;
    let colEnd = n;
    
    let start = 1;
    while(rowStart < rowEnd && colStart < colEnd) {
        // Fill from left to right - horizontal
        for(let i = colStart; i < colEnd; i++) {
            matrix[rowStart][i] = start++;
        }
        // Increment row start
        rowStart++;
        
        // Fill from top to bottom vertical right
        for(let i = rowStart; i < rowEnd; i++){
            matrix[i][colEnd-1] = start++;
        }
        //Decrement vertical
        colEnd--;
        
        // From right to left horizontal
        if(rowStart < rowEnd){
            for(let i = colEnd - 1; i >= colStart; i--){
                matrix[rowEnd-1][i] = start++;
            }
            rowEnd--;
        }
        
        // From down to up vertical
        if(colStart < colEnd){
            for(let i = rowEnd - 1; i >= rowStart; i--){
                matrix[i][colStart] = start++;
            }
            colStart++;
        }
    }
    return matrix;
};