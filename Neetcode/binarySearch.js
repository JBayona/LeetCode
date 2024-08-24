/*
Given a sorted (in ascending order) integer array nums of n elements and a target value, write a function to search target in nums. If target exists, then return its index, otherwise return -1.

Example 1:
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4

Example 2:
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1

https://leetcode.com/problems/binary-search/description/
*/

/*
Binary Search Algorithm
Time Complexity O(log(N))
*/

var search = function(nums, target) {
    let mid = 0;
    let start = 0;
    let end = nums.length-1;    
    while(start <= end) {
        mid = Math.floor((start+end)/2);
        if(target === nums[mid]) {
            return mid;
        }
        if(target < nums[mid]) {
            end = mid-1
        } else {
            start = mid + 1;
        }
    }
    return -1;
};

// Recursive

var search = function(nums, target) {
    let mid = 0;
    let start = 0;
    let end = nums.length-1;
    
    return binarySearch(start, end, nums, target);
};

function binarySearch(start, end, nums, target) {
    // Base Case
    if(start <= end) {
        mid = Math.floor((start+end)/2);
        if(target === nums[mid]) {
            return mid;
        }
        if(target < nums[mid]) {
            return binarySearch(start, mid-1, nums, target);
        } else {
            return binarySearch(mid+1, end, nums, target);
        }
    }
    return -1
}

array = [1,2,3,4,5,6,7,8,9];
target = 6;
console.log(binarySearch(array, target));
