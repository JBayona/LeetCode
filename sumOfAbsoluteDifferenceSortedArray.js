/*
You are given an integer array nums sorted in non-decreasing order.

Build and return an integer array result with the same length as nums such that result[i] is
equal to the summation of absolute differences between nums[i] and all the other elements in the array.

In other words, result[i] is equal to sum(|nums[i]-nums[j]|) where 0 <= j < nums.length and j != i (0-indexed).

Example 1:
Input: nums = [2,3,5]
Output: [4,3,5]
Explanation: Assuming the arrays are 0-indexed, then
result[0] = |2-2| + |2-3| + |2-5| = 0 + 1 + 3 = 4,
result[1] = |3-2| + |3-3| + |3-5| = 1 + 0 + 2 = 3,
result[2] = |5-2| + |5-3| + |5-5| = 3 + 2 + 0 = 5.

Example 2:
Input: nums = [1,4,6,8,10]
Output: [24,15,13,15,21]

https://leetcode.com/problems/sum-of-absolute-differences-in-a-sorted-array/description/?envType=daily-question&envId=2023-11-25
*/

// Time O(N)
// Space O(1)
var getSumAbsoluteDifferences = function (nums) {
  /*
    The array is sorted
    Example:               8, i = 3
    Original array = 1 4 6 8 12 18 21
    La suma de la diferencia es equivalente a la suma de los números
    para hacerlos por ejemplo 8, esto es 8 * 3 = 24, para cada número i,
    la izquierda será -> nums[i] * i, sabemos que su suma de los primeros 4
    elementos es 1 + 4 + 6 = 11, entonces el valor absoluto es left = 24 - 11
    la formula es left = nums[i] * leftCount, esto porque es en orden
    creciente, para el valor absoluto la fórmula es:
    leftTotal = leftCount * nums[i] - leftSumv
    De la misma manera la derecha sería rightCount = n - i - 1;
    rightTotal = rightSum - rightCount
    * 
  */
  let n = nums.length;
  let prefixSum = new Array(n).fill(0);
  let suffixSum = new Array(n).fill(0);

  prefixSum[0] = nums[0];
  suffixSum[n - 1] = nums[n - 1];
  // Fill the prefix and suffix values
  for (let i = 1; i < n; i++) {
    // Sum from left
    prefixSum[i] = prefixSum[i - 1] + nums[i];
    // Sum from right
    suffixSum[n - i - 1] = suffixSum[n - i] + nums[n - i - 1];
  }

  let result = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let leftCount = i;
    let rightCount = n - i - 1;
    let left = nums[i] * leftCount - prefixSum[i];
    let right = suffixSum[i] - nums[i] * rightCount;
    result[i] = left + right;
  }
  return result;
};
