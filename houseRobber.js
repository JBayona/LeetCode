/*
You are a professional robber planning to rob houses along a street.
Each house has a certain amount of money stashed, the only constraint stopping
you from robbing each of them is that adjacent houses have security system connected
and it will automatically contact the police if two adjacent houses were broken into
on the same night.

Given a list of non-negative integers representing the amount of money of each house
determine the maximum amount of money you can rob tonight without alerting the police.

Example 1:
Input: [1,2,3,1]
Output: 4

Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
             Total amount you can rob = 1 + 3 = 4.
Example 2:
Input: [2,7,9,3,1]
Output: 12

Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
             Total amount you can rob = 2 + 9 + 1 = 12.

https://leetcode.com/problems/house-robber/description/
*/

// Max sum non consecutive array

/**
 * @param {number[]} nums
 * @return {number}
 */

// DP
var rob = function(nums) {
    if(!nums.length) {
        return 0;
    }
    if(nums.length === 1) {
        return nums[0];
    }
    if(nums.length === 2) {
        return Math.max(nums[0], nums[1]);
    }
    
    let dp = new Array(nums.length). fill(0);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    for(let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);
    }
    return dp[nums.length - 1];
};

// Option 2
var rob = function(nums) {
    if(nums.length === 0) {
        return 0;
    }
    
    let inclusive = nums[0];
    let exclusive = 0;
    let tmp = 0
    
    for(let i = 1; i < nums.length; i++) {
        tmp = inclusive;
        inclusive = Math.max(inclusive, exclusive + nums[i]);
        exclusive = tmp;
    }
    
    // Inclusive is the one that holds the max value
    return inclusive;
};
