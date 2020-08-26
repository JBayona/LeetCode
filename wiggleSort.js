/*
Given an unsorted array nums, reorder it in-place such that
nums[0] < nums[1] > nums[2] < nums[3].... Example:

Input: nums = [3,5,2,1,6,4]
Output: One possible answer is [3,5,1,6,2,4]

https://leetcode.com/problems/wiggle-sort/
*/

var wiggleSort = function(nums) {
    if(!nums.length) {
        return [];
    }
    for(let i = 1; i < nums.length; i++) {
        if(i % 2 === 1) {
            if(nums[i - 1] > nums[i]) {
                swap(i, i - 1, nums);
            }
        } else {
            if(nums[i - 1] < nums[i]) {
                swap(i, i - 1, nums);
            }
        }
    }
    return nums;
}

function swap(a, b, nums) {
    let tmp = nums[a];
    nums[a] = nums[b];
    nums[b] = tmp;
}

console.log(wiggleSort([3,5,2,1,6,4]));