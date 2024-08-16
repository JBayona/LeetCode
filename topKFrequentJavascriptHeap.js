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
*/

// Time O(LogN)
// Space O(N)
var topKFrequent = function(nums, k) {
    let hash = {};
    // This array saves on each space, the number of ocurrences, for
    // example, if array is [1, 1, 2], the number 1 has two ocurrendes,
    // that means it will store the number "1" in the index "2".
    let count = new Array(nums.length + 1).fill(0);
    let num = 0;
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

   for (let prop in hash) {
    heap.enqueue({number: prop, count: hash[prop]});
   }

   for (let i = 0; i < k; i++) {
    result.push(heap.dequeue().number);
   }

   return result;
};