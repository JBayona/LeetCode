/*
Given a non-empty array nums containing only positive integers, find if the array can
be partitioned into two subsets such that the sum of elements in both subsets is equal.

Example 1:
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].

Example 2:
Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.

https://leetcode.com/problems/partition-equal-subset-sum/
*/

// Memoization
var canPartition = function(nums) {
    if(!nums) {
        return false;
    }
    let sum = nums.reduce((curr, acum)=> curr + acum, 0);
    if(sum % 2 !== 0) {
        return false;
    }
    sum = sum/2;
    let memo = {};
    return dfs(nums, sum, 0, memo);
};

function dfs(nums, sum, index, memo) {
    if(sum === 0) {
        return true;
    }
    if(sum < 0 || index === nums.length) {
        return false;
    }

    if(memo[`${index}-${sum}`]) {
        return memo[`${index}-${sum}`];
    }
    // Either include the current element or skip it
    let res = dfs(nums, sum - nums[index], index + 1, memo) || dfs(nums, sum, index + 1, memo);
    // Save the result from computations.
    memo[`${index}-${sum}`] = res;
    return res;
}

// nums = [1,5,11,5]; // true
// nums = [1, 2, 3, 5]; // false
// nums = [1, 2, 3, 5, 9]; // true
nums = [1, 2, 5]; // false
console.log(canPartition(nums));
