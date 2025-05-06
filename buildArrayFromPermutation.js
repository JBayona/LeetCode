/*
Given a zero-based permutation nums (0-indexed), build an array ans of the same length where ans[i] = nums[nums[i]] for each 0 <= i < nums.length and return it.

A zero-based permutation nums is an array of distinct integers from 0 to nums.length - 1 (inclusive).

Example 1:
Input: nums = [0,2,1,5,3,4]
Output: [0,1,2,4,5,3]
Explanation: The array ans is built as follows: 
ans = [nums[nums[0]], nums[nums[1]], nums[nums[2]], nums[nums[3]], nums[nums[4]], nums[nums[5]]]
    = [nums[0], nums[2], nums[1], nums[5], nums[3], nums[4]]
    = [0,1,2,4,5,3]

    Example 2:
Input: nums = [5,0,1,2,3,4]
Output: [4,5,0,1,2,3]
Explanation: The array ans is built as follows:
ans = [nums[nums[0]], nums[nums[1]], nums[nums[2]], nums[nums[3]], nums[nums[4]], nums[nums[5]]]
    = [nums[5], nums[0], nums[1], nums[2], nums[3], nums[4]]
    = [4,5,0,1,2,3]

https://leetcode.com/problems/build-array-from-permutation/
*/

// Time O(N)
// Space O(1)
var buildArray = function(nums) {
    let result = new Array(nums.length).fill(0);

    for (let i = 0; i < nums.length; i++) {
        let val = nums[i];
        result[i] = nums[val];
    }

    return result;
};

// Time O(N)
// Space O(N)
// Approach: Multiply each number with a base "x" in this case 1024 as the limit
// is max 1000, so any number greater than 1000 will do the thing. Whenever we want
// the original value we can just divide by 1024 and that will be constant space.
var buildArray = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        nums[i] += (1024 * (nums[nums[i]] % 1024));
    }

    for (let i = 0; i < nums.length; i++) {
        nums[i] = Math.floor(nums[i]/1024);
    }

    return nums;
};