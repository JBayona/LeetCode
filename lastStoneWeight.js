/*
We have a collection of stones, each stone has a positive integer weight.

Each turn, we choose the two heaviest stones and smash them together.  Suppose the stones
have weights x and y with x <= y.  The result of this smash is:
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
var lastStoneWeight = function(stones) {
    let maxHeap = new PriorityQueue({
        compare: (a, b) => b - a
    });

    // Add all stones
    for (let stone of stones) {
        maxHeap.enqueue(stone);
    }

    // We can have two rocks with the same size and all rocks
    // are smashed, there are no more rocks to analyze
    // This can be translated to while(maxHeap.size() > 1)
    while (maxHeap.size() > 1) {
        // Potentially weighter
        let stoneA = maxHeap.dequeue();
        let stoneB = maxHeap.dequeue();
        // As this is a maxHeap, stoneA will always be either greater
        // or the same, if the value is not the same we know it's greater
        // and only on that scenario we need to add it back
        if (stoneA !== stoneB) {
            maxHeap.enqueue(stoneA - stoneB);
        }
    }
    return maxHeap.isEmpty() ? 0 : maxHeap.dequeue();
};
