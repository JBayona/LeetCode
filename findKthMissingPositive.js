/*
Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.
Return the kth positive integer that is missing from this array.

Example 1:
Input: arr = [2,3,4,7,11], k = 5
Output: 9
Explanation: The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing
positive integer is 9.

Example 2:
Input: arr = [1,2,3,4], k = 2
Output: 6
Explanation: The missing positive integers are [5,6,7,...]. The 2nd missing positive integer is 6.

https://leetcode.com/problems/kth-missing-positive-number/description/
*/

// Option 1 Binary Search
// Time O(LogN)
var findKthPositive = function (arr, k) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2);
    if (arr[mid] - mid - 1 < k) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left + k;
};

// Option 2
// Time O(N)
// Space O(N)
var findKthPositive = function (arr, k) {
  let max = Math.max(...arr);
  let seen = {};
  for (let n of arr) {
    seen[n] = true;
  }

  let i = 1;
  for (; i < max; i++) {
    if (!(i in seen)) {
      k--;
    }
    if (k === 0) {
      return i;
    }
  }

  if (k > 0) {
    return i + k;
  }
};
