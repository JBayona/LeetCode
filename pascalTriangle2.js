/*
Given a non-negative index k where k ≤ 33, return the kth index
row of the Pascal's triangle.

Note that the row index starts from 0.

In Pascal's triangle, each number is the sum of the two numbers directly above it.

https://leetcode.com/problems/pascals-triangle-ii/
*/
// Option 1
var getRow = function(rowIndex) {
    var row = [1];
    for(var i = 1 ; i <= rowIndex ; i++) {
        for(var j = i; j > 0; j--) {
            if(j === i)
                row[j] = 1;
            else
                row[j] = row[j - 1] + row[j];
        }
    }
    return row;
};

// Option 2
var getRow = function(rowIndex) {
    let res = new Array(rowIndex + 1).fill(0);
    res[0] = 1;
    
    if (rowIndex === 0) {
        return res;
    }
    
    for (let i = 1; i<= rowIndex; i++) {
        let temp = [...res]; // --> O(k) extra space
        for (let j = 1; j <= i; j++) {         
            res[j] = temp[j - 1] + temp[j];    
        }
    } 

    return res; 
};

index = 3;
console.log(getRow(index));