/*
Given an integer array nums, you need to find one continuous subarray that if you only sort this
subarray in ascending order, then the whole array will be sorted in ascending order.

Return the shortest such subarray and output its length.

Example 1:
Input: nums = [2,6,4,8,10,9,15]

Output: 5
Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.

Example 2:
Input: nums = [1,2,3,4]
Output: 0

Example 3:
Input: nums = [1]
Output: 0

https://leetcode.com/problems/shortest-unsorted-continuous-subarray/
*/

// Option 1
// Time O(N)
// Space O(1)
var findUnsortedSubarray = function(nums) {
    // To avoid results where the arrays are the same
    let rightIndex = 0;
    let leftIndex = nums.length - 1;
    let prev = nums[0];
    
    // Get the right boundary
    for(let i = 1; i < nums.length; i++) {
        if(nums[i] < prev) {
            rightIndex = i;
        } else {
            prev = nums[i];
        }
    }
    
    // Get the left boundary
    prev = nums[nums.length -1];
    for(let i = nums.length - 2; i >= 0; i--) {
        if(nums[i] > prev) {
            leftIndex = i;
        } else {
            prev = nums[i];
        }
    }
    return leftIndex < rightIndex ? rightIndex - leftIndex + 1 : 0;
};

// Option 2
var findUnsortedSubarray = function(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    // Copy the array
    let sorted = nums.concat().sort((a, b) => a - b);
    
    while(left < right) {
        if(nums[left] === sorted[left]) {
            left++;
            continue;
        } else if(nums[right] === sorted[right]) {
            right--;
            continue;
        } else {
            break;
        }
    }
    return right - left === 0 ? 0 : right - left + 1;
};

// Option 3
var findUnsortedSubarray = function(nums) {
    let indexStart = 0;
    let indexEnd = 0;
    let original = nums;
    let sorted = nums.concat().sort((a,b) => a - b);
    
    // If both arrays are the same
    if(original + '' === sorted + '') {
        return 0;
    }
    
    let flag = false;
    for(let i = 0; i < nums.length; i++) {
        if(!flag && nums[i] !== sorted[i]) {
            indexStart = i;
            flag = true;
        } else if(flag && nums[i] !== sorted[i]) {
            indexEnd = i;
        }
    }
    return indexEnd - indexStart + 1;
};