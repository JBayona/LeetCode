/*
The array-form of an integer num is an array representing
its digits in left to right order.

For example, for num = 1321, the array form is [1,3,2,1].
Given num, the array-form of an integer, and an integer k, return the array-form of the integer num + k.

Example 1:
Input: num = [1,2,0,0], k = 34
Output: [1,2,3,4]
Explanation: 1200 + 34 = 1234

Example 2:
Input: num = [2,7,4], k = 181
Output: [4,5,5]
Explanation: 274 + 181 = 455

Example 3:
Input: num = [2,1,5], k = 806
Output: [1,0,2,1]
Explanation: 215 + 806 = 1021

https://leetcode.com/problems/add-to-array-form-of-integer/description/
*/

// Time O(N)
// Space O(1)
/*
 Example:
 [1,2,3] k = 45
 1st = 3 + 45 = 48, then result = [8] and k = 4
 2nd = 2 + 4 = 6, then result = [6, 8] and k = 0;
 3rd = 1 + 0 = 1, then result = [1, 6, 8]
 */
var addToArrayForm = function (num, k) {
  let result = [];
  let n = num.length - 1;
  while (n >= 0 || k !== 0) {
    if (n >= 0) {
      k += num[n--];
    }
    // Insert front array
    result.unshift(k % 10);
    k = Math.floor(k / 10);
  }
  return result;
};
