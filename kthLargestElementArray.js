/*
Given an integer array nums and an integer k, return the kth largest element in the array.
Note that it is the kth largest element in the sorted order, not the kth distinct element.
Can you solve it without sorting?

Example 1:
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5

Example 2:
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4

https://leetcode.com/problems/kth-largest-element-in-an-array/description/
*/
// Time O(N Log N)
// Space O(N)
var findKthLargest = function (nums, k) {
  let minHeap = new PriorityQueue({
    compare: (a, b) => a - b,
  });

  // Add all to the queue
  for (let num of nums) {
    minHeap.enqueue(num);
    if (minHeap.size() > k) {
      minHeap.dequeue();
    }
  }
  return minHeap.dequeue();
};

// Option 2
/*
// O(n) best case, worst O(n^2)
var findKthLargest = function(nums, k) {
    let left = 0;
    let right = nums.length - 1;
	while (true) { // this problem guaranteed to have a valid answer
        let pos = partition(nums, left, right);
        if (pos == k - 1)	return nums[pos];
        else if (pos < k - 1)	left = pos + 1;
        else right = pos - 1;
	}
};

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
*/
