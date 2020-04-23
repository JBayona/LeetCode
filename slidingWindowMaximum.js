/*
Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.

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

// Run two loops. In the outer loop, take all subarrays of size K. In the inner loop, get the maximum of the current subarray.
//  O((n-k+1)*k) which can also be written as O(N * K).
var maxSlidingWindow = function(nums, k) {
    let result = [];
    let max = Number.MIN_SAFE_INTEGER;
    for(let i = 0; i <= nums.length - k; i++) {
        max = nums[i];
        for(let j = i; j < i + k; j++) {
            max = Math.max(max, nums[j]);
        }
        result.push(max);
    }
    return result;
};

// Time O(N*Log(K))
// Space O(k)

import java.util.*; 
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if(nums == null || nums.length == 0) {
            return new int[0];
        }
        
        int[] results = new int[nums.length - k + 1];
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>((x, y) -> y - x);
        
        for(int i = 0; i < nums.length && i < k; i++) {
            maxHeap.add(nums[i]);
        }
        
        int index = 0;
        results[index] = maxHeap.peek();
        for(int i = k; i < nums.length; i++) {
            maxHeap.remove(nums[index]);
            maxHeap.add(nums[i]);
            index++;
            results[index] = maxHeap.peek();
        }
        return results;
    }
}

// Time O(N)
// Space O(N)

import java.util.*; 
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if(nums == null || nums.length == 0) {
            return new int[0];
        }
        
        int[] results = new int[nums.length - k + 1];
        // By default treemap gives you from less element to greater element but as we set a
        // reverse order, we are going to get the greater element
        TreeMap<Integer, Integer> map = new TreeMap<>(Collections.reverseOrder());
        
        for(int i = 0; i < nums.length && i < k; i++) {
            map.put(nums[i], map.getOrDefault(nums[i], 0) + 1);
        }
        int index = 0;
        results[index] = map.firstKey();
        for(int i = k; i < nums.length; i++) {
            Integer count = map.get(nums[index]);
            if(count == 1) {
                map.remove(nums[index]);
            } else {
                map.put(nums[index], count - 1);
            }
            map.put(nums[i], map.getOrDefault(nums[i], 0) + 1);
            index++;
            results[index] = map.firstKey();
        }
        return results;
    }
}