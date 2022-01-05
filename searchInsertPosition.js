/*
Given a sorted array and a target value, return the index if the target is found.
If not, return the index where it would be if it were inserted in order.

You may assume no duplicates in the array.

Example 1:

Input: [1,3,5,6], 5
Output: 2
Example 2:

Input: [1,3,5,6], 2
Output: 1
Example 3:

Input: [1,3,5,6], 7
Output: 4
Example 4:

Input: [1,3,5,6], 0
Output: 0

https://leetcode.com/problems/search-insert-position/
*/

// Option 1
// The problem is about find first element in array nums that
// are greater or equal to target. If doesn't found, return nums.length.
// Time O(Log N)
var searchInsert = function(nums, target) {
    let start = 0;
    let end = nums.length;
    while(start <= end) {
        let middle = Math.floor((start + end) / 2);
        if(nums[middle] > target) {
            end = middle - 1; // try to find in the left side
        } else if(nums[middle] < target) {
            start = middle + 1; // try to find in the right side
        } else {
            return middle;
        }
    }
    return start;
};

// Option 1
// The problem is about find first element in array nums that
// are greater or equal to target. If doesn't found, return nums.length.
// Time O(Log N)
var searchInsert = function(nums, target) {
    let start = 0;
    let end = nums.length;
    let result = nums.length;
    while(start <= end) {
        let middle = Math.floor((start + end) / 2);
        if(nums[middle] >= target) {
            result = middle;
            end = middle - 1; // try to find in the left side
        } else {
            start = middle + 1; // try to find in the right side
        }
    }
    return result;
};

// Time O(N)
var searchInsert = function(nums, target) {
    let index = 0;
    for(let i = 0; i < nums.length; i++) {
        let elem = nums[i];
        if(elem === target) {
            return i;
        } else if(elem > target) {
            return index;
        }
        index++;
    }
    return index;
};