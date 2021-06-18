/*
Given a non-empty array of integers, return the k most frequent elements.

For example,
Given [1,1,1,2,2,3] and k = 2, return [1,2].

Note: 
You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
Your algorithm's time complexity must be better than O(n log n), where n is the array's size.

https://leetcode.com/problems/top-k-frequent-elements/description/
*/

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        HashMap<Integer, Integer> map = new HashMap<>();
        
        for(int num: nums) {
            map.put(num, map.getOrDefault(num, 0) + 1);
        }
        
        // Max Priority Queue based on the key
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> map.get(b[0]) - map.get(a[0]));
        for(int key: map.keySet()){
            maxHeap.add(new int[]{key, map.get(key)});
        }
        int[] res = new int[k];
        for(int i = 0; i < k; i++){
            res[i] = maxHeap.poll()[0];
        }
        return res;
    }
}