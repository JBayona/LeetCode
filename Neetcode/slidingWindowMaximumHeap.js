/*
Given an array nums, there is a sliding window of size k which is moving from the very
left of the array to the very right. You can only see the k numbers in the window.
Each time the sliding window moves right by one position. Return the max sliding window.

Follow up:
Could you solve it in linear time?
Example:

Input: nums = [1,3,-1,-3,5,3,6,7], and k = 3
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
 

Constraints:

1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4
1 <= k <= nums.length

https://leetcode.com/problems/sliding-window-maximum/
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

// Run two loops. In the outer loop, take all subarrays of size K.
// In the inner loop, get the maximum of the current subarray.
//  O((n-k+1)*k) which can also be written as O(N * K).
var maxSlidingWindow = function(nums, k) {
    let result = [];
    let max = Number.MIN_SAFE_INTEGER;
    for(let i = 0; i < nums.length - k + 1; i++) {
        max = nums[i];
        for(let j = i; j < i + k; j++) {
            max = Math.max(max, nums[j]);
        }
        result.push(max);
    }
    return result;
};

// Brute force
// Time O(N^2)
var maxSlidingWindow = function(nums, k) {
    let result = [];
    let max = Number.MIN_SAFE_INTEGER;
    // There are n - k + 1 windows
    for(let i = 0; i < nums.length - k + 1; i++) {
        max = nums[i];
        for(let j = 1 ; j < k; j++) {
            max = Math.max(max, nums[i + j]);
        }
        result.push(max);
    }
    return result;
};