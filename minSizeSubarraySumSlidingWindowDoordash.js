/*
Given an array of n positive integers and a positive integer s, find the
minimal length of a contiguous subarray of which the sum ≥ s. If there isn't one, return 0 instead.

Example: 
Input: s = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: the subarray [4,3] has the minimal length under the problem constraint.

Follow up:
If you have figured out the O(n) solution, try coding another solution of which the time complexity is O(n log n). 

https://leetcode.com/problems/minimum-size-subarray-sum/
*/

// Sliding window
// Time O(N)
var minSubArrayLen = function(target, nums) {
    if(!nums.length) {
        return 0;
    }
    
    let start = 0;
    let end = 0;
    let min = Number.MAX_SAFE_INTEGER;
    let sum = 0;
    while(end < nums.length) {
        sum += nums[end];
        // If we reach the goal
        while(sum >= target) {
            min = Math.min(end - start + 1, min);
            sum -= nums[start];
            start++;
        }
        // Increase end window
        end++;
    }
    return min !== Number.MAX_SAFE_INTEGER ? min : 0;
};

// Prefix Sum
var minSubArrayLen = function(s, nums) {
    if(!nums || !nums.length) {
        return 0;
    }
    let sum = 0;
    let i = 0;
    let j = 0;
    let min = Number.MAX_SAFE_INTEGER;
    
    
    while(j < nums.length) {
        sum += nums[j++];
        while(sum >= s) {
            min = Math.min(min, j - i);
            sum -= nums[i++];
        }
    }
    return min === Number.MAX_SAFE_INTEGER ? 0 : min;  
};
