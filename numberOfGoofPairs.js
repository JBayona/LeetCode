/*
Given an array of integers nums.

A pair (i,j) is called good if nums[i] == nums[j] and i < j.

Return the number of good pairs.

Example 1:

Input: nums = [1,2,3,1,1,3]
Output: 4
Explanation: There are 4 good pairs (0,3), (0,4), (3,4), (2,5) 0-indexed.
Example 2:

Input: nums = [1,1,1,1]
Output: 6
Explanation: Each pair in the array are good.
Example 3:

Input: nums = [1,2,3]
Output: 0

https://leetcode.com/problems/number-of-good-pairs/
*/

// Time O(N)
// Space O(N)
var numIdenticalPairs = function(nums) {
    let result = 0;
    let hash = {};
    for(let i = 0; i < nums.length; i++) {
        let num = nums[i];
        if(num in hash) {
            let tmp = hash[num];
            result += tmp;
            tmp++;
            hash[num] = tmp;
        } else {
            hash[num] = 1;
        }
    }
    return result;
};

// Time O(N^2)
// Space O(1)
var numIdenticalPairs = function(nums) {
    let result = 0;
    for(let i = 0; i < nums.length; i++) {
        for(let j = i + 1; j < nums.length; j++) {
            if(nums[i] === nums[j]) {
                result++;
            }
        }
    }
    return result;
};