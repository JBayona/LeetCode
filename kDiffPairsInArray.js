/*
Given an array of integers nums and an integer k, return the number of unique k-diff pairs in the array.

A k-diff pair is an integer pair (nums[i], nums[j]), where the following are true:
0 <= i, j < nums.length
i != j
nums[i] - nums[j] == k
Notice that |val| denotes the absolute value of val.

Example 1:
Input: nums = [3,1,4,1,5], k = 2
Output: 2
Explanation: There are two 2-diff pairs in the array, (1, 3) and (3, 5).
Although we have two 1s in the input, we should only return the number of unique pairs.

Example 2:
Input: nums = [1,2,3,4,5], k = 1
Output: 4

Explanation: There are four 1-diff pairs in the array, (1, 2), (2, 3), (3, 4) and (4, 5).
Example 3:
Input: nums = [1,3,1,5,4], k = 0
Output: 1
Explanation: There is one 0-diff pair in the array, (1, 1).
*/

// Option 1
var findPairs = function (nums, k) {
  let hash = {};
  for (let n of nums) {
    if (!(n in hash)) {
      hash[n] = 1;
    } else {
      hash[n]++;
    }
  }
  let count = 0;
  for (let key in hash) {
    // In case of k==0 check whether any number having frequency >=2 or not.
    if ((key * 1 + k in hash && k !== 0) || (k === 0 && hash[key * 1] > 1)) {
      count++;
    }
  }
  return count;
};

// Option 2
/*
var findPairs = function(nums, k) {
  nums.sort((a, b) => a - b);
  let start = 0;
  let end = 1;
  let sum = Number.MIN_SAFE_INTEGER;
  let count = 0;
  while(end < nums.length) {
      let tmp = nums[end] - nums[start];
      if(tmp === k && nums[start] + nums[end] !== sum ) {
          sum = nums[start] + nums[end];
          start++;
          end++;
          count++;
      } else if(tmp < k) { //If diff is smaller than k increase end by 1
          end++;
      } else { //else case, when diff is greater than k, increase i by 1
          start++;
      }
      // Check if i and j are not same to avoid duplicates
      if(start === end) {
          end++;
      }
  }
  return count;
}
*/
