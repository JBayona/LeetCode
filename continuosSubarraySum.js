/*
Given a list of non-negative numbers and a target integer k, write a function to check if
the array has a continuous subarray of size at least 2 that sums up to a multiple of k, that is, sums up to n*k
where n is also an integer.

Example 1:

Input: [23, 2, 4, 6, 7],  k=6
Output: True
Explanation: Because [2, 4] is a continuous subarray of size 2 and sums up to 6.
Example 2:

Input: [23, 2, 6, 4, 7],  k=6
Output: True
Explanation: Because [23, 2, 6, 4, 7] is an continuous subarray of size 5 and sums up to 42.

https://leetcode.com/problems/continuous-subarray-sum/
*/

// Time O(N)
// Space O(N)
var checkSubarraySum = function(nums, k) {
    let sum = 0;
    let prefix = 0;
    let set = new Set();
    
    for(let i = 0; i < nums.length; i++) { // Set(0, 5)    sum = 0     prefix = 1
        sum += nums[i];
        if(k !== 0) {
            sum %= k;
        }
        // We already saw the value
        if(set.has(sum)) {
            return true;
        }
        set.add(prefix);
        prefix = sum;
    }
    return false;
};

// Time O(N^2)
// Space O(1)
var checkSubarraySum = function(nums, k) {
    let sum = 0;
    for(let i = 0; i < nums.length; i++) {
        sum = nums[i];
        for(let j = i + 1; j < nums.length; j++) {
            sum += nums[j];
            // Corner case
            if(sum === 0 && k == 0) {
                return true;
            }
            if(sum % k === 0) {
                return true;
            }
        }
    }
    return false;
};