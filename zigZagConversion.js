/*
The string "PAYPALISHIRING" is written in a zigzag pattern on a given
number of rows like this: (you may want to display this pattern in a fixed
font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

string convert(string s, int numRows);
 

Example 1:
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"

Example 2:
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"

Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I

Example 3:

Input: s = "A", numRows = 1
Output: "A"
 

Constraints:

1 <= s.length <= 1000
s consists of English letters (lower-case and upper-case), ',' and '.'.
1 <= numRows <= 1000

https://leetcode.com/problems/zigzag-conversion/
*/

var convert = function(s, numRows) {
    // Array with the number of rows needed
    let response = new Array(numRows).fill('');
    // Variable to track in which index of the
    // array we should concat elements
    let row = 0;
    let down = false;
    if(numRows === 1) {
        return s;
    }
    
    // Iterate the entire string
    for(let i = 0; i < s.length; i++) {
        // Concat each string in a position depending the flow
        // of the row
        response[row] += s[i];
        // If we have reached the bottom, we need to go up
        if(row === numRows - 1) {
            down = false;
        } else if(row === 0) { // Go down if we reached the top
            down = true;
        }
        
        down ? row++ : row--;
    }
    
    return response.join('');
};

var convert = function(s, numRows) {
    let array = new Array(numRows).fill('');
    let down;
    // Start the zigzag from top
    let row = 0;
    
    // Corner case, only one line
    if(numRows === 1) {
        return s;
    }
    
    // Vamos concatenando por renglones
    // subiendo y bajando rows
    for(let i = 0; i < s.length; i++) {
        // Add the element 
        array[row] += s[i];
        
        // If we reach the top, it´s time to go up
        if(row === numRows-1) {
            down = false;
        // It´s time to go down
        } else if(row === 0){
            down = true;
        }
        
        down ? row++ : row--;
    }
    return array.join('');
};

s = "PAYPALISHIRING";
numRows = 4;
console.log(convert(s, numRows));
