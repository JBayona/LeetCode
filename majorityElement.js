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
// Space O(1)
var majorityElement = function(nums) {
    // Get the middle of the nums
    let middle = nums.length / 2;
    let map = {};
    for (let i = 0; i < nums.length; i++) {
        let n = nums[i];
        if (!(n in map)) {
            map[n] = 0;
        }
        map[n]++;
        // As soon as we reach a number greater than middle
        // we return the element, it's guaranteed a number
        if (map[n] > middle){
            return n;
        }
    }
};

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