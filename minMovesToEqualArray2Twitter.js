/*
Given an integer array nums of size n, return the minimum number of moves required to make all array elements equal.
In one move, you can increment or decrement an element of the array by 1.
Test cases are designed so that the answer will fit in a 32-bit integer.

Example 1:
Input: nums = [1,2,3]
Output: 2
Explanation:
Only two moves are needed (remember each move increments or decrements one element):
[1,2,3]  =>  [2,2,3]  =>  [2,2,2]

Example 2:
Input: nums = [1,10,2,9]
Output: 16

https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/
*/

// The goal of all the elements is to be like the mid element
// Elements from start to mid have to add x in order to be equal as mid
// Elements from mid to end has to decrement by x to be made same as mid
// Time O(NLogN)
var minMoves2 = function(nums) {
    nums.sort((a, b) => a - b);
    let med = Math.floor(nums.length / 2);
    let result = 0;
    for(let i = 0; i < nums.length; i++) {
        result += Math.abs(nums[i] - nums[med]);
    }
    return result;
};