/*
In a row of dominoes, A[i] and B[i] represent the top and bottom halves of the i-th domino.
(A domino is a tile with two numbers from 1 to 6 - one on each half of the tile.)

We may rotate the i-th domino, so that A[i] and B[i] swap values.
Return the minimum number of rotations so that all the values in A are the same, or all
the values in B are the same.

If it cannot be done, return -1.

Example 1:

Input: A = [2,1,2,4,2,2], B = [5,2,6,2,3,2]
Output: 2
Explanation: 
The first figure represents the dominoes as given by A and B: before we do any rotations.
If we rotate the second and fourth dominoes, we can make every value in the top row equal to 2, as
indicated by the second figure.

Example 2:
Input: A = [3,5,1,2,3], B = [3,6,3,3,4]
Output: -1
Explanation: 
In this case, it is not possible to rotate the dominoes to make one row of values equal.
 
https://leetcode.com/problems/minimum-domino-rotations-for-equal-row/
*/

/*
We have 4 possible options:
1. Convert array B with the first value of array A
2. Convert array B with the first value of array B
3. Convert array A with the first value of array A
4. Convert array A with the first value of array B

We need to take the min of all these possible cases
*/
var minDominoRotations = function(A, B) {
  if(!A || !B) {
    return -1;
  }
  
  let minSwapsA = Math.min(minRotations(A, B, A[0]), minRotations(A, B, B[0]));
  let minSwapsB = Math.min(minRotations(B, A, A[0]), minRotations(B, A, B[0]));
  let min = Math.min(minSwapsA, minSwapsB);
  
  return min != Number.MAX_SAFE_INTEGER ? min : -1;
    
};

// Calculates swaps to convert to array with value val by swapping with from array
function minRotations(fromArray, toArray, value) {
  let swaps = 0;
  for(let i = 0; i < fromArray.length; i++) {
    // We already have the desired value in the main array
    if(toArray[i] === value) {
        continue;
    }
    if(fromArray[i] === value) {
        swaps++;
    } else {
        // Not possible to convert into the array
        return Number.MAX_SAFE_INTEGER;
    }
  }
  return swaps;
}