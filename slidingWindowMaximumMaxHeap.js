/*
You are given an array of integers nums, there is a sliding window of size k which is moving from
the very left of the array to the very right. You can only see the k numbers in the window.
Each time the sliding window moves right by one position.

Return the max sliding window.
Example 1:
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
 
Example 2:
Input: nums = [1], k = 1
Output: [1]

https://leetcode.com/problems/sliding-window-maximum/description/
*/

// Time O(NLog N)
var maxSlidingWindow = function(nums, k) {
  let result = [];
  // Create a max heap
  let maxHeap = new PriorityQueue({
      compare: (a, b) => b.val - a.val
  });

  // Insert the first k elements in the window
  for (let i = 0; i < k; i++) {
      maxHeap.enqueue({val: nums[i], index: i});
  }

  // Add the first element to our result
  result.push(maxHeap.front().val);
  // Add the rest of the elements
  for (let i = k; i < nums.length; i++) {
      maxHeap.enqueue({val: nums[i], index: i});
      // Check if the maxElement is outside of our k window
      // if yes, move the window
      let maxElementIndex = maxHeap.front().index;
      // <= as we just added a new element
      while (maxElementIndex <= i - k) {
          maxHeap.dequeue();
          // Update the element to the latest
          maxElementIndex = maxHeap.front().index;
      }
      result.push(maxHeap.front().val);
  }
  return result;
};