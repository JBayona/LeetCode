/*
You are given an integer array nums and an integer k. You can partition the array into at
most k non-empty adjacent subarrays. The score of a partition is the sum of the averages of each subarray.

Note that the partition must use every integer in nums, and that the score is not necessarily an integer.
Return the maximum score you can achieve of all the possible partitions. Answers within 10-6 of the
actual answer will be accepted.

Example 1:
Input: nums = [9,1,2,3,9], k = 3
Output: 20.00000
Explanation: 
The best choice is to partition nums into [9], [1, 2, 3], [9]. The answer is 9 + (1 + 2 + 3) / 3 + 9 = 20.
We could have also partitioned nums into [9, 1], [2], [3, 9], for example.
That partition would lead to a score of 5 + 2 + 6 = 13, which is worse.

https://leetcode.com/problems/largest-sum-of-averages/description/
*/

// Option 1
var largestSumOfAverages = function(nums, k) {
  let dp = new Array(nums.length).fill(0);
  let prefixSum = new Array(nums.length + 1).fill(0);

  // Prefix sum
  // [ 0, 9, 10, 12, 15, 24 ]
  for (let i = 1; i < nums.length + 1; i++) {
      prefixSum[i] = prefixSum[i-1] + nums[i-1];
  }

  // Average
  // (24 - 0) / 5 = 4.8
  // (24 - 9) / 4 = 3.75
  // (24 - 10) / 3 = 4.6666
  // (24 - 12) / 2 = 6
  // (24 - 15) / 1 = 9
  // dp = [ 4.8, 3.75, 4.666666666666667, 6, 9 ]
  for (let i = 0; i < nums.length; i++) {
      dp[i] = (prefixSum[nums.length] - prefixSum[i]) / (nums.length - i);
  }
  
  // We only need at maximum k - 1 partition (starting 0 index)
  for (let partition = 0; partition < k-1; partition++) {
      for (let i = 0; i < nums.length; i++) {
          for (let j = i + 1; j < nums.length; j++) {
            // Greater elements will be moved to the first elements
            dp[i] = Math.max(dp[i], ((prefixSum[j] - prefixSum[i]) / (j-i)) + dp[j]);
          }
      }
  }
  return dp[0];
};

// Option 2
/*
N=5 K=1, max elements in one group is 5
N=5 K=2, max elements in one group is 4
N=5 K=3, max elements in one group is 3
N=5 K=4, max elements in one group is 2
N=5 K=5, max elements in one group is 1
 */
var largestSumOfAverages = function (nums, k) {
  let memo = new Array(nums.length);
  for (let i = 0; i < memo.length; i++) {
    memo[i] = new Array(k + 1).fill(0);
  }
  console.log(memo);
  return topDown(0, nums, k, memo);
};

function topDown(index, nums, k, memo) {
  if (k <= 0 || index >= nums.length) {
    return 0;
  }
  if (memo[index][k] !== 0) {
    return memo[index][k];
  }
  if (k === 1) {
    return calculateAvg(index, nums);
  }

  // Max elements in the group for the given K
  let sum = 0;
  let maxSize = nums.length - k;
  for (let i = index; i <= maxSize; i++) {
    sum += nums[i];
    let avg = sum / (i - index + 1);
    memo[index][k] = Math.max(
      memo[index][k],
      avg + topDown(i + 1, nums, k - 1, memo)
    );
  }
  return memo[index][k];
}

function calculateAvg(start, nums) {
  return avg(start, nums, nums.length);
}

function avg(start, nums, end) {
  let sum = 0;
  for (let i = start; i < end; i++) {
    sum += nums[i];
  }
  return sum / (end - start);
}
