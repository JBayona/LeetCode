/*
Given an array of integers arr, find the sum of min(b), where b ranges over
every (contiguous) subarray of arr.
Since the answer may be large, return the answer modulo 109 + 7.

Example 1:
Input: arr = [3,1,2,4]
Output: 17
Explanation: 
Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4]. 
Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.
Sum is 17.

Example 2:
Input: arr = [11,81,94,43,3]
Output: 444

https://leetcode.com/problems/sum-of-subarray-minimums/description/
*/

/*
 [3,1,2,4]

 3 = 3
 3 1 = 1
 3 1 2 = 1
 3 1 2 4 = 1

 1 = 1
 1 2 = 1
 1 2 4 = 1

 2 = 2
 2 4 = 2

 4 = 4

 Total = 17
 */
var sumSubarrayMins = function (arr) {
  let answer = 0;
  for (let i = 0; i < arr.length; i++) {
    let min = arr[i];
    let j = i + 1;
    // Add them here as well for those with one digit min
    // like [3] [1] [2] [4]
    answer += min;
    while (j < arr.length) {
      if (arr[j] < min) {
        min = arr[j];
      }
      j++;
      answer += min;
    }
  }
  return answer % (Math.pow(10, 9) + 7);
};

// Time O(N)
var sumSubarrayMins = function (arr) {
  let ans = 0;
  let stack = [];
  let mod = 1000000007;
  stack.push(-1);

  for (let i = 0; i < arr.length + 1; i++) {
    let currVal = i <= arr.length - 1 ? arr[i] : 0;
    while (stack.at(-1) != -1 && currVal < arr[stack.at(-1)]) {
      let index = stack.pop();
      let j = stack.at(-1);
      let left = index - j;
      let right = i - index;
      let add = (left * right * arr[index]) % mod;
      ans += add;
      ans %= mod;
    }
    stack.push(i);
  }
  return ans;
};
