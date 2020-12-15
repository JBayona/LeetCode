/*
Given an array A of integers and integer K, return the maximum S such that there
exists i < j with A[i] + A[j] = S and S < K. If no i, j exist satisfying this equation, return -1.

https://leetcode.com/problems/two-sum-less-than-k/
*/

// Sort + Two pointers
// Time O(N Log N)
// Space O(1)
function twoSumLessThanK(A, K) {
    // Sort the array first
    A.sort((a,b) => a - b);

    let left = 0;
    let right = A.length - 1;
    let answer = 0;
    while(left < right) {
        if(A[left] + A[right] < K) {
            answer = Math.max(A[left] + A[right], max);
            left++;
        } else {
            right--;
        }
    }

    return answer;
}