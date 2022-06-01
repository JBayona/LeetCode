/*
Given an integer columnNumber, return its corresponding column title as it appears in an Excel sheet.

For example:
A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28 
...
 
Example 1:
Input: columnNumber = 1
Output: "A"

Example 2:
Input: columnNumber = 28
Output: "AB"

Example 3:
Input: columnNumber = 701
Output: "ZY"

https://leetcode.com/problems/excel-sheet-column-title/
*/

var convertToTitle = function(n) {
    // A = 65, Z = 90
    if(n <= 26) {
        return String.fromCharCode(n + 65 - 1);
    }
    let result = '';
    while(n > 0) {
        let charCode = (n - 1) % 26;
        result = String.fromCharCode(65 + charCode) + result;
        n = (n - charCode) / 26 | 0;
    }
    return result;
};