/*
Given a binary array, find the maximum length of a contiguous subarray with equal number of 0 and 1.

Example 1:
Input: [0,1]
Output: 2

Explanation: [0, 1] is the longest contiguous subarray with equal number of 0 and 1.
Example 2:
Input: [0,1,0]
Output: 2

Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.
Note: The length of the given binary array will not exceed 50,000.

https://leetcode.com/problems/contiguous-array/
*/

var findMaxLength = function(nums) {
    // Initialize 0  as index -1 cause we have not seen it before
    let hash = {0: -1};
    let result = 0;
    let count = 0;
    
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] === 0) {
            count--;
        } else {
            count++;
        }
        
        // If we find the count, means that we already see a pair of numbers
        if(count in hash) {
            result = Math.max(result, i - hash[count]);
        } else {
            hash[count] = i;
        }
    }
    return result;
};