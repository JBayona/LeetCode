/*
Given an array of integers nums and a positive integer k, find whether it's possible to divide this array into sets of k consecutive numbers
Return True if its possible otherwise return False.
Example 1:

Input: nums = [1,2,3,3,4,4,5,6], k = 4
Output: true
Explanation: Array can be divided into [1,2,3,4] and [3,4,5,6].
Example 2:

Input: nums = [3,2,1,2,3,4,3,4,5,9,10,11], k = 3
Output: true
Explanation: Array can be divided into [1,2,3] , [2,3,4] , [3,4,5] and [9,10,11].
Example 3:

Input: nums = [3,3,2,2,1,1], k = 3
Output: true
Example 4:

Input: nums = [1,2,3,4], k = 3
Output: false
Explanation: Each array should be divided in subarrays of size 3.

https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers/
*/

// Time O(M * N)
// Space O(N)
var isPossibleDivide = function(nums, k) {
    // We can not create an array of k consecutive elements
    if(nums.length % k !== 0) {
        return false;
    }
    let map = {};
    let set = new Set(nums);
    
    // Count the frequency
    nums.forEach((num) => map[num] ? map[num]++ : map[num] = 1);
    
    // These is the number of arrays we should have, so in the while loop we are going
    // to try to create those "count" arrays,
    let count = nums.length / k;
    while(count) {
        // Get the min everytime as we need to get consecutive numbers in the array
        let min = Math.min(...set);
        // The array should be of length k, we need to start from min to k
        for(let i = min; i < min + k; i++) {
            // If the count of frequency is 0, it means we can not have consecutive numbers
            // so we need to break the loop
            if(!map[i]) {
                return false;
            }
            // Decrease the count of freq
            map[i]--;
            // If we have no more freq available, we should not consider that number anymore
            if(map[i] == 0) {
                set.delete(i);
            }
        }
        // Decrease the numbers of arrays we can create
        count--;
    }
    return true;
};