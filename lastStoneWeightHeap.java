/*
We have a collection of stones, each stone has a positive integer weight.

Each turn, we choose the two heaviest stones and smash them together.  Suppose the stones have weights x and y with x <= y.  The result of this smash is:

If x == y, both stones are totally destroyed;
If x != y, the stone of weight x is totally destroyed, and the stone of weight y has new weight y-x.
At the end, there is at most 1 stone left.  Return the weight of this stone (or 0 if there are no stones left.)

 

Example 1:

Input: [2,7,4,1,8,1]
Output: 1
Explanation: 
We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of last stone.

https://leetcode.com/problems/last-stone-weight/
*/

// Max heap, min heap
// Insert N(Log N)
// Read O(1)

class Solution {
    public int lastStoneWeight(int[] stones) {
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>((x, y) -> y - x);
        // Insert all elements into the min heap
        for(int i = 0; i < stones.length; i++) {
            maxHeap.offer(stones[i]);
        }
        
        while(maxHeap.size() > 1) {
            int a = maxHeap.poll();
            int b = maxHeap.poll();
            
            // Both rocks are destroyed
            if(a == b) {
                continue;
            } else {
                a = a - b;
            }
            maxHeap.offer(a);
        }
        return maxHeap.size() > 0 ? maxHeap.poll() : 0;
    }
}