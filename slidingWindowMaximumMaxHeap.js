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

// Time O(Log N)
var maxSlidingWindow = function (nums, k) {
  let result = [];

  // Create a Max Priority Queue to keep track of the maximum elements
  // in the sliding window
  const maxHeap = new MaxPriorityQueue({
    compare: (p1, p2) => p1.val < p2.val,
  });

  // Add the first k elements in the window
  for (let i = 0; i < k; i++) {
    maxHeap.enqueue({ index: i, val: nums[i] }); // Store the index and value
  }

  // Add the first element in the result, the maximum
  // Front does not remove the element from the queue
  result.push(maxHeap.front().val);

  // Iterate over the last elements starting from k
  for (let i = k; i < nums.length; i++) {
    maxHeap.enqueue({ index: i, val: nums[i] });

    // Check if the index of the maximum element
    // in the priority queue is outside the current window
    let currentMax = maxHeap.front().index;
    while (currentMax <= i - k) {
      // Dequeue until the max is within the k window
      maxHeap.dequeue();
      currentMax = maxHeap.front().index;
    }

    // Add to the result the maximum from the window
    result.push(maxHeap.front().val);
  }
  return result;
};
