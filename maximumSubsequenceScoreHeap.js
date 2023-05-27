/*
You are given two 0-indexed integer arrays nums1 and nums2 of equal length n and
a positive integer k.
You must choose a subsequence of indices from nums1 of length k.

For chosen indices i0, i1, ..., ik - 1, your score is defined as:

The sum of the selected elements from nums1 multiplied with the minimum of the selected elements from nums2.
It can defined simply as: (nums1[i0] + nums1[i1] +...+ nums1[ik - 1]) * min(nums2[i0] , nums2[i1], ... ,nums2[ik - 1]).
Return the maximum possible score.

A subsequence of indices of an array is a set that can be derived from the set {0, 1, ..., n-1} by
deleting some or no elements.

 
Example 1:
Input: nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3
Output: 12

Explanation: 
The four possible subsequence scores are:
- We choose the indices 0, 1, and 2 with score = (1+3+3) * min(2,1,3) = 7.
- We choose the indices 0, 1, and 3 with score = (1+3+2) * min(2,1,4) = 6. 
- We choose the indices 0, 2, and 3 with score = (1+3+2) * min(2,3,4) = 12. 
- We choose the indices 1, 2, and 3 with score = (3+3+2) * min(1,3,4) = 8.
Therefore, we return the max score, which is 12.

Example 2:
Input: nums1 = [4,2,3,1,1], nums2 = [7,5,10,9,6], k = 1
Output: 30
Explanation: 
Choosing index 2 is optimal: nums1[2] * nums2[2] = 3 * 10 = 30 is the maximum possible score.

https://leetcode.com/problems/maximum-subsequence-score/
*/

// Time O(NLogK)
// Space O(K)
var maxScore = function (nums1, nums2, k) {
  let res = 0;
  let sum = 0;
  let heap = new MinPriorityQueue({ priority: (element) => element });

  // Merge values from the second array and the first one
  const merged = nums1.map((nums1Val, i) => [nums2[i], nums1Val]);
  // Sort based on the values from the second array (nums2)
  // From greater to smaller elements
  merged.sort((a, b) => b[0] - a[0]);

  for (let elem of merged) {
    let [maxN2, num1] = elem;
    // If the heap has already the K size
    if (heap.size() === k) {
      // Get the minimum value
      sum -= heap.dequeue().element;
    }

    sum += num1;
    heap.enqueue(num1);

    // Everytime we reach the size k, we know that maxN2 will
    // hold the smallest value of the subsequence as it was sorted
    // in decreasing order
    if (heap.size() === k) {
      res = Math.max(res, sum * maxN2);
    }
  }
  return res;
};
