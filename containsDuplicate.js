/*
Given an array of integers, find if the array contains any duplicates.

Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.

Example 1:

Input: [1,2,3,1]
Output: true
Example 2:

Input: [1,2,3,4]
Output: false
Example 3:

Input: [1,1,1,3,3,4,3,2,4,2]
Output: true

https://leetcode.com/problems/contains-duplicate/

*/

var containsDuplicate = function(nums) {
	let hash = {};

	if(nums.length === 0) {
    return false;
	}

	for(let i = 0; i < nums.length; i++) {
        if(nums[i] in hash) {
            return true;
        } else {
            hash[nums[i]] = true;
        }
	}
	return false;
};
