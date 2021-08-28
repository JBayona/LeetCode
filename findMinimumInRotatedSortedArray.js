/*
Suppose an array of length n sorted in ascending order is rotated between 1 and n times.
For example, the array nums = [0,1,2,4,5,6,7] might become:

[4,5,6,7,0,1,2] if it was rotated 4 times.
[0,1,2,4,5,6,7] if it was rotated 7 times.
Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results
in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.

Example 1:
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.

Example 2:
Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.

Example 3:
Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times. 

https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
*/

// Time O(LogN)
// if nums[min] > nums: it's sure that min element is in the left part of array
// else we know min element is in the right side
// min is always in the start pointer
var findMin = function(nums) {
    let start = 0;
    let end = nums.length - 1;
    while(start < end) {
        let mid = Math.floor((start + end) / 2);
        if(nums[mid] > nums[end]) {
            start = mid + 1;
        } else {
            end = mid;
        }
    }
    return nums[start];
};

*/
// Time O(LogN)
// if nums[min] > nums: it's sure that min element is in the left part of array
// else we know min element is in the right side
// min is always in the start pointer
var findMin = function(nums) {
    if(nums.length === 1) {
        return nums[0];
    }
    // If the first element is less than the last element then
    // there´s no rotation
    if(nums[0] < nums[nums.length - 1]) {
        return nums[0];
    }
    // Binary Search
    let start = 0;
    let end = nums.length - 1;
    while(start <= end) {
        let mid = Math.floor((start + end) / 2);
        // This point would be the point of change. From higher to lower value.
        if(nums[mid] > nums[mid + 1]) {
            return nums[mid + 1];
        }
        if(nums[mid - 1] > nums[mid]) {
            return nums[mid];
        }
        // If mid is greater than first value, it seems that min value
        // should be in the right side
        if(nums[mid] > nums[0]) {
            start = mid + 1;
        } else {
            // if nums[0] is greater than the mid value then this means the
            // smallest value is somewhere to the left
            end = end - 1;
        }
    }
    return nums[start];
};