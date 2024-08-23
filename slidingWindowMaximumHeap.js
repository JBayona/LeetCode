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

// Time O(Log N)
var maxSlidingWindow = function(nums, k) {
    let result = [];

    // Create a Priority Queue to keep track of the maximum elements
    // in the sliding window
    const maxHeap = new PriorityQueue({ compare: (p1, p2) => p2.val - p1.val });

    // Add the first k elements in the window
    for (let i = 0; i < k; i++) {
        maxHeap.enqueue({index: i, val: nums[i]}); // Store the index and value
    }

    // Add the first element in the result, the maximum
    // Front does not remove the element from the queue
    result.push(maxHeap.front().val);

    // Iterate over the last elements starting from k
    for (let i = k; i < nums.length; i++) {
        maxHeap.enqueue({index: i, val: nums[i]});
        
        // Check if the index of the maximum element
        // in the priority queue is outside the current window
        let currentiMaxIndex = maxHeap.front().index;
        while (currentiMaxIndex <= i - k) {
            // Dequeue until the max is within the k window
            maxHeap.dequeue();
            currentiMaxIndex = maxHeap.front().index;
        }

        // Add to the result the maximum from the window
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