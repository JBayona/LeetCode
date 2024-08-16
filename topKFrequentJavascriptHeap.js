/*
Given an integer array nums and an integer k, return the k most
frequent elements. You may return the answer in any order.

Example 1:
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]

Example 2:
Input: nums = [1], k = 1
Output: [1]

https://leetcode.com/problems/top-k-frequent-elements/

https://github.com/datastructures-js/priority-queue/blob/v5/README.md#size
*/

// Time O(LogN)
// Space O(N)
var topKFrequent = function(nums, k) {
    let hash = {};
    let result = [];
    
    // Count frecuencies
    for (let i = 0; i < nums.length; i++) {
        num = nums[i];
        if (!(num in hash)) {
            hash[num] = 0;
        }
        hash[num]++;
    }
    
    // Min heap
    let heap = new PriorityQueue({
        compare: (a, b) => a.count - b.count
    });
    
    // Insert and remove if the size becomes larget than the desire
    // size, we only want size k, removes the smallets ones
    for (let prop in hash) {
        heap.enqueue({number: prop, count: hash[prop]});
        if (heap.size() > k) {
            heap.dequeue();
        }
    }
    
    while(!heap.isEmpty()) {
        result.push(heap.dequeue().number);
    }

   return result;
};

// Time O(LogN)
// Space O(N)
var topKFrequent = function(nums, k) {
    let hash = {};
    let result = [];
    
    // Count frecuencies
    for (let i = 0; i < nums.length; i++) {
        num = nums[i];
        if (!(num in hash)) {
            hash[num] = 0;
        }
        hash[num]++;
    }
    
    let heap = new PriorityQueue({
        compare: (a, b) => b.count - a.count
    });
    
    // Add all to the queue
    for (let prop in hash) {
        heap.enqueue({number: prop, count: hash[prop]});
    }
    
    // Only get the top k
    for (let i = 0; i < k; i++) {
        result.push(heap.dequeue().number);
    }
    return result;
};