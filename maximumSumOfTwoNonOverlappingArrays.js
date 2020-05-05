/*
Given an array A of non-negative integers, return the maximum sum of elements in two non-overlapping (contiguous) subarrays,
which have lengths L and M.  (For clarification, the L-length subarray could occur before or after the M-length subarray.)

Formally, return the largest V for which V = (A[i] + A[i+1] + ... + A[i+L-1]) + (A[j] + A[j+1] + ... + A[j+M-1]) and either:

0 <= i < i + L - 1 < j < j + M - 1 < A.length, or
0 <= j < j + M - 1 < i < i + L - 1 < A.length.
 

Example 1:

Input: A = [0,6,5,2,2,5,1,9,4], L = 1, M = 2
Output: 20
Explanation: One choice of subarrays is [9] with length 1, and [6,5] with length 2.
Example 2:

Input: A = [3,8,1,3,2,1,8,9,0], L = 3, M = 2
Output: 29
Explanation: One choice of subarrays is [3,8,1] with length 3, and [8,9] with length 2.
Example 3:

Input: A = [2,1,5,6,0,9,5,0,3,8], L = 4, M = 3
Output: 31
Explanation: One choice of subarrays is [5,6,0,9] with length 4, and [3,8] with length 3.
 

Note:

L >= 1
M >= 1
L + M <= A.length <= 1000
0 <= A[i] <= 1000

https://leetcode.com/problems/maximum-sum-of-two-non-overlapping-subarrays/
*/

var maxSumTwoNoOverlap = function(array, L, M) {
    let presum = new Array(array.length + 1).fill(0);
    // Get the prefix of sums
    for(let i = 1; i < presum.length; i++) {
        presum[i] = presum[i-1] + array[i-1];
    }
    console.log(presum);
    
    let result = 0;
    // Iterate the array - L to avoid out of bounds
    for(let i = 0; i < presum.length - L; i++) {
        // Lsum is easy as we already have the prefix sum, let sum is easy
        let Lsum = presum[i + L] - presum[i];
        // Look for two ranges, from the current position to the left of the
        // array and from current position to the right of the array
        let Msum = 0;
        for(let j = 0; j <= i - M; j++) {
            Msum = presum[j + M] - presum[j];
            // We are interested in the maximum sum of both left and right
            result = Math.max(result, Lsum + Msum);
        }
        for(let j = i + L; j < presum.length - M; j++) {
            Msum = presum[j + M] - presum[j];
            result = Math.max(result, Lsum + Msum);
        }
    }
    return result;
};