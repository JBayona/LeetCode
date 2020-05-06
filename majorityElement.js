/*
Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊ n/2 ⌋ times.

You may assume that the array is non-empty and the majority element always exist in the array.

Example 1:

Input: [3,2,3]
Output: 3
Example 2:

Input: [2,2,1,1,1,2,2]
Output: 2

https://leetcode.com/problems/majority-element/
*/

// Time O(N)
// Space O(N)
var majorityElement = function(nums) {
    let hash = {};
    let result = 0;
    let maxCount = 0;
    for(let i = 0; i < nums.length; i++) {
        let elem = nums[i];
        if(elem in hash) {
            hash[elem]++;
        } else {
            hash[elem] = 1;
        }
        if(hash[elem] > maxCount) {
            result = elem;
            maxCount = hash[elem];
        }
    }
    console.log(hash);
    return result;
};