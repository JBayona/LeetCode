/*
Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Example 1:

Input: [3,2,1,5,6,4] and k = 2
Output: 5
Example 2:

Input: [3,2,3,1,2,4,5,5,6] and k = 4
Output: 4
Note: 
You may assume k is always valid array's length.

https://leetcode.com/problems/kth-largest-element-in-an-array/description/
*/

// Time O(N Log N)
// Space O(N)
var findKthLargest = function(nums, k) {
    let minHeap = new PriorityQueue({
        compare: (a, b) => a - b
    });

    // Add all to the queue
    for (let num of nums) {
        minHeap.enqueue(num);
        if (minHeap.size()> k){
            minHeap.dequeue();
        }
    }
    return minHeap.dequeue();
};

// Quick Select
//O(N) best case, worst O(N^2)
var findKthLargest = function(nums, k) {
    let left = 0;
    let right = nums.length - 1;
    // Para sacar el kth smallest es k = nums.length - k * 1
    while (true) { // this problem guaranteed to have a valid answer
        let pos = partition(nums, left, right);
        if (pos == k - 1)   return nums[pos];
        else if (pos < k - 1)   left = pos + 1;
        else right = pos - 1;
    }
};

// take pivot, put elements smaller on the left, larger on right
function partition(nums, left, right) {
    let pivot = nums[left];
    let idx = left;
    swap(nums, idx, right);
    for (let i = left; i < right; i++) 
        if (nums[i] > pivot) swap(nums, i, idx++);
    swap(nums, idx, right);
    return idx;
}

function swap(nums, i, j) {
    let tmp = nums[i];
    nums[i] = nums[j];
    nums[j] = tmp;
}


// O(NlogN)
var findKthLargest = function(nums, k) {
    let sortedArray = nums.sort((a,b) => b-a );
    return sortedArray[k-1];
};


// Creating a max/min heap cost O(K)

// Time :O(nlogk)
// Insert/Deletw: O(Log N) where n is the number of nodes/elements
class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<Integer>();
        for(int el : nums) {
            minHeap.add(el);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }

        return minHeap.poll();
    }
}

// Time :O(nlogk)
// Insert/Deletw: O(Log N) where n is the number of nodes/elements
class Solution {
    public int findKthSmallest(int[] nums, int k) {
        PriorityQueue<Integer> maxHeap = new PriorityQueue<Integer>((x, y) => y - x);
        for(int el : nums) {
            maxHeap.add(el);
            if (maxHeap.size() > k) {
                maxHeap.poll();
            }
        }

        return maxHeap.poll();
    }
}
