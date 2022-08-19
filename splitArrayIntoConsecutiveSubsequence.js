/*
You are given an integer array nums that is sorted in non-decreasing order.

Determine if it is possible to split nums into one or more subsequences such that both of the
following conditions are true:
- Each subsequence is a consecutive increasing
sequence (i.e. each integer is exactly one more than the previous integer).
- All subsequences have a length of 3 or more.

Return true if you can split nums according to the above conditions, or false otherwise.

A subsequence of an array is a new array that is formed from the original array
by deleting some (can be none) of the elements without disturbing the relative positions of the remaining elements. (i.e., [1,3,5] is a subsequence of [1,2,3,4,5] while [1,3,2] is not).

Example 1:
Input: nums = [1,2,3,3,4,5]
Output: true
Explanation: nums can be split into the following subsequences:
[1,2,3,3,4,5] --> 1, 2, 3
[1,2,3,3,4,5] --> 3, 4, 5

Example 2:
Input: nums = [1,2,3,3,4,4,5,5]
Output: true
Explanation: nums can be split into the following subsequences:
[1,2,3,3,4,4,5,5] --> 1, 2, 3, 4, 5
[1,2,3,3,4,4,5,5] --> 3, 4, 5

Example 3:
Input: nums = [1,2,3,4,4,5]
Output: false
Explanation: It is impossible to split nums into consecutive increasing subsequences of length 3 or more.

https://leetcode.com/problems/split-array-into-consecutive-subsequences/
*/

// Time O(N)
// Space O(N)
var isPossible = function(nums) {
    // Only one set has been created
    if(nums.length < 3) return false;
    
    const freqMap = new Map();
    const needMap = new Map();
    nums.forEach(n => {
        if (!freqMap.has(n)) {
            freqMap.set(n, 0);
        }
        freqMap.set(n, freqMap.get(n) + 1);
    });
    
    for (let n of nums) {
        if (freqMap.get(n) === 0) {
            continue;
        } else if ((needMap.get(n) || 0) > 0) {
            // Decrement the value as we found it
            needMap.set(n, needMap.get(n) - 1);
            // Increment the next value that we need to have sequence
            needMap.set(n + 1, (needMap.get(n + 1) || 0) + 1);
        } else if ((freqMap.get(n + 1) || 0) > 0 && (freqMap.get(n + 2) || 0) > 0) {
            // If we have the next two elements, then that means that
            // we need a new subarray
            freqMap.set(n + 1, freqMap.get(n + 1) - 1);
            freqMap.set(n + 2, freqMap.get(n + 2) - 1);
            needMap.set(n + 3, (needMap.get(n + 3) || 0) + 1);
        } else {
            // We were not able to find the element and
            // we can not split the array
            return false;
        }
        // Decrement the sequence
        freqMap.set(n, freqMap.get(n) - 1);
    }
    return true;
};
