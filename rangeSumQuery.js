/*
Given an integer array nums, find the sum of the elements between indices i and j (i ≤ j), inclusive.

Example:
Given nums = [-2, 0, 3, -5, 2, -1]

sumRange(0, 2) -> 1
sumRange(2, 5) -> -1
sumRange(0, 5) -> -3
Note:
You may assume that the array does not change.
There are many calls to sumRange function.

https://leetcode.com/problems/range-sum-query-immutable/
*/

/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
    cache = [];
    let sum = 0;
    nums.forEach((element, index) => {
        sum += element;
        cache[index] = sum;
    });
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
    return i === 0 ? cache[j] : cache[j] - cache[i - 1];
};

/** 
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */