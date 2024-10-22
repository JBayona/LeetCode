/*
Given an array of integers nums and an integer limit, return the size of the longest
non-empty subarray such that the absolute difference between any two elements of this subarray
is less than or equal to limit.

Example 1:
Input: nums = [8,2,4,7], limit = 4
Output: 2 
Explanation: All subarrays are: 
[8] with maximum absolute diff |8-8| = 0 <= 4.
[8,2] with maximum absolute diff |8-2| = 6 > 4. 
[8,2,4] with maximum absolute diff |8-2| = 6 > 4.
[8,2,4,7] with maximum absolute diff |8-2| = 6 > 4.
[2] with maximum absolute diff |2-2| = 0 <= 4.
[2,4] with maximum absolute diff |2-4| = 2 <= 4.
[2,4,7] with maximum absolute diff |2-7| = 5 > 4.
[4] with maximum absolute diff |4-4| = 0 <= 4.
[4,7] with maximum absolute diff |4-7| = 3 <= 4.
[7] with maximum absolute diff |7-7| = 0 <= 4. 
Therefore, the size of the longest subarray is 2.

Example 2:
Input: nums = [10,1,2,4,7,2], limit = 5
Output: 4 
Explanation: The subarray [2,4,7,2] is the longest since the maximum absolute diff is |2-7| = 5 <= 5.

Example 3:
Input: nums = [4,2,2,2,4,4,2,2], limit = 0
Output: 3

https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/description
*/

// Approach, on the window, get the difference on the smallest
// with the largest elements, we need two queues
// Time O(NLogN)
// Space O(N)
var longestSubarray = function (nums, limit) {
  let maxHeap = new PriorityQueue({
    compare: (a, b) => b.val - a.val,
  });
  let minHeap = new PriorityQueue({
    compare: (a, b) => a.val - b.val,
  });

  let start = 0;
  let end = 0;
  let result = 0;
  while (end < nums.length) {
    maxHeap.enqueue({ val: nums[end], index: end });
    minHeap.enqueue({ val: nums[end], index: end });
    // Check if the absolute difference of the max and the min
    // is exceeding the limit
    while (maxHeap.front().val - minHeap.front().val > limit) {
      // Remove the violation and move the window
      start = Math.min(minHeap.front().index, maxHeap.front().index) + 1;
      // We need to remove the elements from both
      // to keep them balanced
      while (maxHeap.front().index < start) {
        maxHeap.dequeue();
      }
      while (minHeap.front().index < start) {
        minHeap.dequeue();
      }
    }
    // Update the result
    result = Math.max(result, end - start + 1);
    end++;
  }
  return result;
};
