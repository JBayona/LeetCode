/*
Given a non-empty array of non-negative integers nums, the degree of this array is defined as the maximum frequency of any one of its elements.

Your task is to find the smallest possible length of a (contiguous) subarray of nums, that has the same degree as nums.

Example 1:
Input: [1, 2, 2, 3, 1]
Output: 2
Explanation: 
The input array has a degree of 2 because both elements 1 and 2 appear twice.
Of the subarrays that have the same degree:
[1, 2, 2, 3, 1], [1, 2, 2, 3], [2, 2, 3, 1], [1, 2, 2], [2, 2, 3], [2, 2]
The shortest length is 2. So return 2.

https://leetcode.com/problems/degree-of-an-array/
*/

var findShortestSubArray = function(nums) {
    let map = {};
    let max = 0;
    // Get frequencies for all the elements in the array
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] in map) {
            map[nums[i]]++;
        } else {
            map[nums[i]] = 1;
        }
        max = Math.max(max, map[nums[i]]);
    }
    
    // No duplicate values
    if(max ===  1) {
        return 1;
    }
    
    let freq = Object.keys(map);
    let listFreq = [];
    for(let i = 0; i < freq.length; i++) {
        if(map[freq[i]] === max) {
            listFreq.push(freq[i] * 1);
        }
    }
    
    let minResult = Number.MAX_SAFE_INTEGER;
    for(let i = 0; i < listFreq.length; i++) {
        let start = 0;
        let end = nums.length - 1;
        while(nums[start] !== listFreq[i] || nums[end] !== listFreq[i]) {
            if(nums[start] !== listFreq[i]) {
                start++;
            }
            if(nums[end] !== listFreq[i]) {
                end--;
            }
        }
        minResult = Math.min(minResult, end - start + 1);
    }
    return minResult;
};
