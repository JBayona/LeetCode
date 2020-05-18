/*
Given an array of integers nums and an integer k. A subarray is called nice if there are k odd numbers on it.

Return the number of nice sub-arrays.

Example 1:

Input: nums = [1,1,2,1,1], k = 3
Output: 2
Explanation: The only sub-arrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].
Example 2:

Input: nums = [2,4,6], k = 1
Output: 0
Explanation: There is no odd numbers in the array.
Example 3:

Input: nums = [2,2,2,1,2,2,1,2,2,2], k = 2
Output: 16

https://leetcode.com/problems/count-number-of-nice-subarrays/
*/

var numberOfSubarrays = function(nums, k) {
    let start = 0;
    let end = 0;
    let count = 0; // How many elements satifies with the condition of nice array
    let result = 0;
    
    while(end < nums.length) {
        let num = nums[end];
        // Odd number
        if(num % 2 !== 0) {
            k--;
            count = 0;
        }
        // When k = 0 means we already found a "nice" subarray
        // Count is used to track the number of elments that satisfy
        // the condition of k odd numbers
        while(k === 0) {
            count++;
            // Even number, does not satisfy the condition
            // Even number found, break the condition
            if(nums[start] % 2 !== 0) {
                k++;
            }
            // Move left window
            start++;
        }
        result += count;
        // Move right window
        end++;
    }
    return result;
};