/*
Given an integer array nums and an integer k, return true if it is possible to
divide this array into k non-empty subsets whose sums are all equal.

Example 1:
Input: nums = [4,3,2,3,5,2,1], k = 4
Output: true
Explanation: It is possible to divide it into 4 subsets (5), (1, 4), (2,3), (2,3) with equal sums.

Example 2:
Input: nums = [1,2,3,4], k = 3
Output: false

https://leetcode.com/problems/partition-to-k-equal-sum-subsets/
*/

// Time O(N!)
var canPartitionKSubsets = function (nums, k) {
  // Get the total sum
  let sum = nums.reduce((current, prev) => (current += prev));

  // There should be an exact division in order to create subsets
  if (sum % k !== 0) {
    return false;
  }

  let targetSum = sum / k;
  let seen = new Set();
  return backtrack(nums, 0, 0, k, targetSum, seen);
};

function backtrack(nums, count, currentSum, k, targetSum, seen) {
  // We were able to create k-1 subsets then we know we
  // are good as the last one will be ok as well
  if (count == k - 1) {
    return true;
  }

  if (currentSum > targetSum) {
    return false;
  }

  // If current sum is ok, then increment subset and look for more
  if (currentSum === targetSum) {
    return backtrack(nums, count + 1, 0, k, targetSum, seen);
  }

  // Try not picked elements
  for (let i = 0; i < nums.length; i++) {
    if (!seen.has(i)) {
      // Mark as visited
      seen.add(i);
      // If using current ith element in this subset leads to make all valid subsets.
      if (backtrack(nums, count, currentSum + nums[i], k, targetSum, seen)) {
        return true;
      }

      // Backtrack as it was not possible
      seen.delete(i);
    }
  }
  // We were not able to make a combination
  return false;
}


// Optimized approach
let canPartitionKSubsets = (arr, k) => {
    let totalArraySum = 0;
    let n = arr.length;

    for (let i = 0; i < n; ++i) {
         totalArraySum += arr[i];
    }

    // If total sum not divisible by k, we can't make subsets.
    if (totalArraySum % k != 0) { 
        return false;
    }

    // Sort in decreasing order.
    arr.sort(function (a, b) { 
        return b - a; 
    });

    let targetSum = totalArraySum / k;
    let taken = new Array(n).fill(false);

    return backtrack(arr, 0, 0, 0, k, targetSum, taken);
};

let backtrack = (arr, index, count, currSum, k, targetSum, taken) => {
    let n = arr.length;
      
    // We made k - 1 subsets with target sum and last subset will also have target sum.
    if (count == k - 1) { 
        return true;
    }

    // No need to proceed further.
    if (currSum > targetSum) { 
        return false;
    }

    // When curr sum reaches target then one subset is made.
    // Increment count and reset current sum.
    if (currSum == targetSum) {
        return backtrack(arr, 0, count + 1, 0, k, targetSum, taken);
    }

    // Try not picked elements to make some combinations.
    // We'll pick elements that we have not picked and start from the
    // ones we have not seen, if we are able to make a subset we'll
    // start from the next element and skip those picked
    for (let j = index; j < n; j++) {
        if (!taken[j]) {
            // Include this element in current subset.
            taken[j] = true;

            // If using current jth element in this subset leads to make all valid subsets.
            if (backtrack(arr, j + 1, count, currSum + arr[j], k, targetSum, taken)) {
                return true;
            }

            // Backtrack step.
            taken[j] = false;
        }
    } 

    // We were not able to make a valid combination after picking each element from the array,
    // hence we can't make k subsets.
    return false;
};


// Optimized backtrack + memoization
let canPartitionKSubsets = (arr, k) => {
    let totalArraySum = 0;
    let n = arr.length;

    for (let i = 0; i < n; ++i) {
         totalArraySum += arr[i];
    }

    // If total sum not divisible by k, we can't make subsets.
    if (totalArraySum % k != 0) { 
        return false;
    }

    // Sort in decreasing order.
    arr.sort(function (a, b) { 
        return b - a; 
    });

    let targetSum = totalArraySum / k;
    let taken = new Array(n).fill(false);
    
    let memo = {};

    return backtrack(arr, 0, 0, 0, k, targetSum, taken, memo);
};

let backtrack = (arr, index, count, currSum, k, targetSum, taken, memo) => {
    let n = arr.length;
      
    // We made k - 1 subsets with target sum and last subset will also have target sum.
    if (count == k - 1) { 
        return true;
    }

    // No need to proceed further.
    if (currSum > targetSum) { 
        return false;
    }
    
    // If we have already computed the current combination.
    if (memo[taken] != null) {
        return memo[taken];
    }

    // When curr sum reaches target then one subset is made.
    // Increment count and reset current sum.
    if (currSum == targetSum) {
        return memo[taken] = backtrack(arr, 0, count + 1, 0, k, targetSum, taken, memo);
    }

    // Try not picked elements to make some combinations.
    for (let j = index; j < n; j++) {
        if (!taken[j]) {
            // Include this element in current subset.
            taken[j] = true;

            // If using current jth element in this subset leads to make all valid subsets.
            if (backtrack(arr, j + 1, count, currSum + arr[j], k, targetSum, taken, memo)) {
                return memo[taken] = true;
            }

            // Backtrack step.
            taken[j] = false;
        }
    } 

    // We were not able to make a valid combination after picking each element from the array,
    // hence we can't make k subsets.
    return memo[taken] = false;
};