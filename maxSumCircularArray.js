/*
Given a circular array C of integers represented by A, find the maximum possible sum of a non-empty subarray of C.

Here, a circular array means the end of the array connects to the beginning of the array.  (Formally, C[i] = A[i] when 0 <= i < A.length, and C[i+A.length] = C[i] when i >= 0.)

Also, a subarray may only include each element of the fixed buffer A at most once.  (Formally, for a subarray C[i], C[i+1], ..., C[j], there does not exist i <= k1, k2 <= j with k1 % A.length = k2 % A.length.)

 

Example 1:

Input: [1,-2,3,-2]
Output: 3
Explanation: Subarray [3] has maximum sum 3
Example 2:

Input: [5,-3,5]
Output: 10
Explanation: Subarray [5,5] has maximum sum 5 + 5 = 10
Example 3:

Input: [3,-1,2,-1]
Output: 4
Explanation: Subarray [2,-1,3] has maximum sum 2 + (-1) + 3 = 4
Example 4:

Input: [3,-2,2,-3]
Output: 3
Explanation: Subarray [3] and [3,-2,2] both have maximum sum 3
Example 5:

Input: [-2,-3,-1]
Output: -1
Explanation: Subarray [-1] has maximum sum -1
 
https://leetcode.com/problems/maximum-sum-circular-subarray/
*/

var maxSubarraySumCircular = function(A) {
    // We could break down the array in two cases
    // 1. The subarray we are looking for is in xxxxrrrrrxxxxx
    // 2. The subarray is in both sides rrrxxxxxxxxrrr
    /// For 1. We can get the max sum using kadane's algorithm
    // For 2. We could find the Minimum Subarray which would be the sum of numbers in the middle
    // section. Take the sum of the entire array, subtract the middle section sum(min sum) to
    // get the maximum sum.
    
    // Kadane's algorithm max sum normal array
    let currentMax = A[0];
    let maxSoFar = A[0];
    for(let i = 1; i < A.length; i++) {
        currentMax += A[i];
        currentMax = Math.max(A[i], currentMax);
        maxSoFar = Math.max(currentMax, maxSoFar);
    }
    
    // Min Kadane's algorithm
    let currentMin = A[0];
    let minSoFar = A[0];
    for(let i = 1; i < A.length; i++) {
        currentMin += A[i];
        currentMin = Math.min(A[i], currentMin);
        minSoFar = Math.min(currentMin, minSoFar);
    }
    
    let totalSum = 0;
    for(let i = 0; i < A.length; i++) {
        totalSum += A[i];
    }
    
    // If all elements in the array are negative
    if(totalSum === minSoFar) {
        return maxSoFar;
    }
    
    return Math.max(maxSoFar, totalSum - minSoFar);
    
};