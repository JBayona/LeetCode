/*
You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].

Each element nums[i] represents the maximum length of a forward jump from index i. In other words
if you are at nums[i], you can jump to any nums[i + j] where:

0 <= j <= nums[i] and
i + j < n
Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].

Example 1:
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.

Example 2:
Input: nums = [2,3,0,1,4]
Output: 2

https://leetcode.com/problems/jump-game-ii
*/
// Time O(N)
// Space O(1)
var jump = function (nums) {
  //jump variable is used to store minimum number of jumps required to reach last index.
  let jump = 0;
  //left and right variables hold the sliding window.
  let left = 0;
  let right = 0;
  while (right < nums.length - 1) {
    let max = 0;
    //find maximum index that can be reached from the current sliding window(left, right).
    for (let i = left; i <= right; i++) {
      max = Math.max(max, i + nums[i]);
    }
    // For the next sliding window, right + 1 will be the new left
    // and max will be the new right.
    left = right + 1;
    right = max;
    jump++;
  }
  return jump;
};
