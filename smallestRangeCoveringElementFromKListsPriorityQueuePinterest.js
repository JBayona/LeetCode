/*
You have k lists of sorted integers in non-decreasing order. Find the smallest range that
includes at least one number from each of the k lists.

We define the range [a, b] is smaller than range [c, d] if b - a < d - c or a < c if b - a == d - c.

Example 1:
Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
Output: [20,24]
Explanation: 
List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
List 2: [0, 9, 12, 20], 20 is in range [20,24].
List 3: [5, 18, 22, 30], 22 is in range [20,24].

Example 2:
Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
Output: [1,1]

https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/description
*/

// 1. Min-Heap: We use a min-heap to keep track of the smallest element in the current range.
// 2. At every step, we track the largest element in the current range to compute the smallest
// possible range
// 3. When processing the queue, we get the smallest element from the arrays and we try to
// update the smallest range. If we can create a smallest range, we update it.
// 4. We update the maximum element as well. The elements wil be updated to keep track the
// min and max and we try to have the smallest range
// 5. Stop condition: Once any of the lists is exhausted (i.e., there
// are no more elements to consider), the process stops.
// Time O(N Log K)
var smallestRange = function (nums) {
  // The elements are ordered on the array so we should
  // get the minimum on the first index. The minHeap will
  // pop the array with the smallest element on the heap
  let minHeap = new PriorityQueue({
    compare: (a, b) => a[0] - b[0],
  });

  let maxValue = -Infinity;
  // Insert each array on the heap
  // and always keep track of the max
  for (let i = 0; i < nums.length; i++) {
    minHeap.enqueue(nums[i]);
    maxValue = Math.max(maxValue, nums[i][0]);
  }

  let start = 0;
  let end = Infinity;
  while (!minHeap.isEmpty()) {
    // Pop the element from the heap that has the smallest
    // first element
    let arr = minHeap.dequeue();
    // Get the elemet from the array, remove it
    let minValue = arr.shift();
    // Check if we can have a smallest element and
    // update the smallest range if possible
    if (maxValue - minValue < end - start) {
      start = minValue;
      end = maxValue;
    }
    // Add the arr back with the popped element if there are
    // more elements, otherwise we are done with the process
    if (arr.length) {
      minHeap.enqueue(arr);
      maxValue = Math.max(maxValue, arr[0]);
    } else {
      // One list has been exhausted
      break;
    }
  }
  return [start, end];
};
