/*
Given an array of numbers nums, in which exactly two elements appear
only once and all the other elements appear exactly twice. Find the
two elements that appear only once.

Example:

Input:  [1,2,1,3,2,5]
Output: [3,5]
Note:

The order of the result is not important. So in the above example, [5, 3] is also correct.
Your algorithm should run in linear runtime complexity. Could you implement it using only constant space complexity?
https://leetcode.com/problems/single-number-iii/
*/

var singleNumber = function(nums) {
    let hash = {};
    for(let i = 0; i < nums.length; i++) {
        let num = nums[i];
        if(num in hash) {
            hash[num]++;
        } else {
            hash[num] = 1;
        }
    }
    
    let result = [];
    for(let prop in hash) {
        if(hash[prop] === 1) {
            result.push(prop);
        }
    }
    return result;
};
