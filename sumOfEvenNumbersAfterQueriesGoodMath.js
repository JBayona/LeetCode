/*
You are given an integer array nums and an array queries where queries[i] = [vali, indexi].
For each query i, first, apply nums[indexi] = nums[indexi] + vali, then print the sum of the even values of nums.
Return an integer array answer where answer[i] is the answer to the ith query.

Example 1:
Input: nums = [1,2,3,4], queries = [[1,0],[-3,1],[-4,0],[2,3]]
Output: [8,6,2,4]
Explanation: At the beginning, the array is [1,2,3,4].
After adding 1 to nums[0], the array is [2,2,3,4], and the sum of even values is 2 + 2 + 4 = 8.
After adding -3 to nums[1], the array is [2,-1,3,4], and the sum of even values is 2 + 4 = 6.
After adding -4 to nums[0], the array is [-2,-1,3,4], and the sum of even values is -2 + 4 = 2.
After adding 2 to nums[3], the array is [-2,-1,3,6], and the sum of even values is -2 + 6 = 4.

Example 2:
Input: nums = [1], queries = [[4,0]]
Output: [0]

https://leetcode.com/problems/sum-of-even-numbers-after-queries/
*/

// Option 1 optimized
var sumEvenAfterQueries = function (nums, queries) {
  // First calculate the sum of even
  let evenSum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
      evenSum += nums[i];
    }
  }

  let result = [];
  for (let i = 0; i < queries.length; i++) {
    let [val, index] = queries[i];
    // Was even, so we need to decrement the value
    if (nums[index] % 2 === 0) {
      evenSum -= nums[index];
    }
    nums[index] += val;
    // Here it will always enter whether the value was even or it's still even
    if (nums[index] % 2 === 0) {
      evenSum += nums[index];
    }
    result.push(evenSum);
  }
  return result;
};
