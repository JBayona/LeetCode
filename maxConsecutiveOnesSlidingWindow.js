/*
Given a binary array nums and an integer k, return the maximum number
of consecutive 1's in the array if you can flip at most k 0's.

Example 1:
Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.

Example 2:
Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.

https://leetcode.com/problems/max-consecutive-ones-iii/
*/

// Option 1
// Sliding Window
// Time Complexity O(N)
// Space complexity O(1)
/*var longestOnes = function(nums, k) {
    let left = 0;
    let right = 0;
    let result = 0;
    while(right < nums.length) {
        // If we find a zero on the left side, decrease k
        if(nums[right] === 0) {
            k--;
        }
        // If we find that k is zero
        if(k < 0) {
            // If left is zero, we just need to increase k
            // and move our left windows
            if(nums[left] === 0) {
                k++;
            }
            // Otherwise we just need to move our left window
            // even if the number is 1
            left++;
        }
        // Always move right
        right++;
    }
    // Return the window increase
    return right - left;
};*/

// Option 2
// Sliding Window
// Time Complexity O(N)
// Space complexity O(1)
var longestOnes = function(nums, k) {
    let left = 0;
    let right = 0;
    let result = 0;
    while(right < nums.length) {
        if(nums[right] === 0) {
            if(k === 0) {
                // Move left window if is 1 as we already count them
                while(nums[left] === 1) {
                    left++;
                }
                left++;
            } else {
                k--;
            }
        }
        result = Math.max(right - left + 1, result);
        right++;
    }
    return result;
};

// nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1];
nums = [0,0,0,0,0,0,0,0,1,1,1,1];
k = 3;
console.log(longestOnes(nums, k));
