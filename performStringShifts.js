/*
You are given a string s containing lowercase English letters, and a matrix shift, where shift[i] = [direction, amount]:

direction can be 0 (for left shift) or 1 (for right shift). 
amount is the amount by which string s is to be shifted.
A left shift by 1 means remove the first character of s and append it to the end.
Similarly, a right shift by 1 means remove the last character of s and add it to the beginning.
Return the final string after all operations.

 

Example 1:

Input: s = "abc", shift = [[0,1],[1,2]]
Output: "cab"
Explanation: 
[0,1] means shift to left by 1. "abc" -> "bca"
[1,2] means shift to right by 2. "bca" -> "cab"
Example 2:

Input: s = "abcdefg", shift = [[1,1],[1,1],[0,2],[1,3]]
Output: "efgabcd"
Explanation:  
[1,1] means shift to right by 1. "abcdefg" -> "gabcdef"
[1,1] means shift to right by 1. "gabcdef" -> "fgabcde"
[0,2] means shift to left by 2. "fgabcde" -> "abcdefg"
[1,3] means shift to right by 3. "abcdefg" -> "efgabcd"
 

Constraints:

1 <= s.length <= 100
s only contains lower case English letters.
1 <= shift.length <= 100
shift[i].length == 2
0 <= shift[i][0] <= 1
0 <= shift[i][1] <= 100

https://leetcode.com/explore/challenge/card/30-day-leetcoding-challenge/529/week-2/3299/
*/

// Using extra space
var stringShift = function(s, shift) {
    let number = shift.length;
    let array = s.split('');
    for(let i = 0; i < number; i++) {
        let instructions = shift[i];
        let direction = instructions[0];
        let amount = instructions[1];
        // Left rotation
        if(direction === 0) {
            array = rotateLeft(array,  amount);
        } else {
            array = rotateRight(array,  amount);
        }
    }
    return array.join('');
};

function rotateLeft(array, k) {
    let result = [];
    k = k%array.length;
    for(let i = 0; i < array.length; i++) {
        result[i] = array[k];
        k++;
        if(k >= array.length) {
            k = k - array.length;
        }
    }
    return result;
}

function rotateRight(array, k) {
  let result = [];
  let index = 0;
  for(let i = 0; i < array.length; i++) {
    index = (k + i)%array.length;
    result[index] = array[i];
  }
  return result;
}