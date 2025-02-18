/*
Given a sorted integer array arr, two integers k and x, return the k closest integers
to x in the array.
The result should also be sorted in ascending order.
An integer a is closer to x than an integer b if:

|a - x| < |b - x|, or
|a - x| == |b - x| and a < b
 
Example 1:
Input: arr = [1,2,3,4,5], k = 4, x = 3
Output: [1,2,3,4]

Example 2:
Input: arr = [1,2,3,4,5], k = 4, x = -1
Output: [1,2,3,4]

https://leetcode.com/problems/find-k-closest-elements/
*/
// Time O(N)
var findClosestElements = function (arr, k, x) {
  let start = 0;
  let end = arr.length - 1;
  while (end - start >= k) {
    if (Math.abs(arr[start] - x) > Math.abs(arr[end] - x)) {
      start++;
    } else {
      end--;
    }
  }
  let result = [];
  for (let i = start; i <= end; i++) {
    result.push(arr[i]);
  }
  return result;
};
