/*
Given a non-empty array of integers, every element appears twice except for one. Find that single one.
Note:
Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?
Example 1:
Input: [2,2,1]
Output: 1

Example 2:
Input: [4,1,2,1,2]
Output: 4

https://leetcode.com/problems/single-number/description/
*/

var singleNumber = function(nums) {
    let result = 0;
    for(let i = 0; i < nums.length; i++) {
        result ^= nums[i];
    }
    return result;
};

// If it´s sorted
var singleNumberSorted = function(nums) {
    let result = 0;
    let start = 0;
    let end = nums.length;
    while(start <= end) {
        let mid = Math.floor((start + end) / 2);
        // Single num
        if(nums[mid -1] !== nums[mid] && nums[mid+1] !== nums[mid]) {
            return nums[mid];
        } else if(nums[mid] === nums[mid-1]) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return -1;
};

nums = [1,1,2,2,4];
console.log(singleNumberSorted(nums));