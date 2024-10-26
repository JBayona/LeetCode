/*
The score of an array is defined as the product of its sum and its length.

For example, the score of [1, 2, 3, 4, 5] is (1 + 2 + 3 + 4 + 5) * 5 = 75.
Given a positive integer array nums and an integer k, return the number of non-empty subarrays of nums
whose score is strictly less than k.

A subarray is a contiguous sequence of elements within an array.

Example 1:
Input: nums = [2,1,4,3,5], k = 10
Output: 6
Explanation:
The 6 subarrays having scores less than 10 are:
- [2] with score 2 * 1 = 2.
- [1] with score 1 * 1 = 1.
- [4] with score 4 * 1 = 4.
- [3] with score 3 * 1 = 3. 
- [5] with score 5 * 1 = 5.
- [2,1] with score (2 + 1) * 2 = 6.
Note that subarrays such as [1,4] and [4,3,5] are not considered because their scores are 10 and 36 respectively, while we need scores strictly less than 10.

Example 2:
Input: nums = [1,1,1], k = 5
Output: 5
Explanation:
Every subarray except [1,1,1] has a score less than 5.
[1,1,1] has a score (1 + 1 + 1) * 3 = 9, which is greater than 5.
Thus, there are 5 subarrays having scores less than 5.

https://leetcode.com/problems/count-subarrays-with-score-less-than-k/description/
*/
// Sliding Window
// Time O(N)
// Space O(1)
var countSubarrays = function(nums, k) {
    let start = 0;
    let end = 0;
    let currentSum = 0;
    let result = 0;
    while (end < nums.length) {
        let num = nums[end];
        // Add all numbers
        currentSum += num;
        // This window is not eligible anymore
        while (currentSum * (end - start + 1) >= k) {
            // Move window
            currentSum -= nums[start];
            start++;
        }
        // As the subarray is continous, the result would be the number
        // of positions we have moved further
        result += (end - start + 1);
        end++;
    }
    return result;
};