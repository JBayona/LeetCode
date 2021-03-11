/*
Given a string columnTitle that represents the column title as appear in an Excel sheet, return
its corresponding column number.

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
Input: columnTitle = "A"
Output: 1

Example 2:
Input: columnTitle = "AB"
Output: 28

Example 3:
Input: columnTitle = "ZY"
Output: 701

Example 4:
Input: columnTitle = "FXSHRXW"
Output: 2147483647

https://leetcode.com/problems/excel-sheet-column-number/
*/

/*
ZY
Y = 25
Z = 26 * 26

ZZY
Y = 25 * Math.pow(26, 0)
Z = 26 * Math.pow(26, 1)
Z = 26 * Math.pow(26,2)

AB
B = 2 * Math.pow(26,0) = 2
A = 1 * Math.pow(26,1) = 26
= 28

A = 65 // ASCII Code
*/
// Time O(N) where N is the lenght of the string.
// Space O(1)
var titleToNumber = function(columnTitle) {
    let index = 0;
    let result = 0;
    for(let i = columnTitle.length - 1; i >= 0; i--) {
        let c = columnTitle[i];
        let pos = columnTitle[i].charCodeAt(0) - 65 + 1; // Get the ASCII code
        result += (Math.pow(26, index++) * pos);
    }
    return result;
};

/*
A = 1
.. 
..
Z = 26
AA = 27
.. 
..
ZX = 700
ZY = 701
ZZ = 702
AAA = 703
..
..
ZZZ = 18278
*/
