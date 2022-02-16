/*
Given two sparse matrices A and B, return the result of AB.

You may assume that A's column number is equal to B's row number.

Example:

A = [
  [ 1, 0, 0],
  [-1, 0, 3]
]

B = [
  [ 7, 0, 0 ],
  [ 0, 0, 0 ],
  [ 0, 0, 1 ]
]


     |  1 0 0 |   | 7 0 0 |   |  7 0 0 |
AB = | -1 0 3 | x | 0 0 0 | = | -7 0 3 |
                  | 0 0 1 |

https://leetcode.com/problems/sparse-matrix-multiplication/
*/

// Time O(N^2)
function multiply(A, B) {
  //validity check
  let C = new Array(A.length);
  for (let i = 0; i < A.length; i++) {
    C[i] = new Array(B[0].length).fill(0);
  }
  for (let i = 0; i < C.length; i++) {
    for (let k = 0; k < A[0].length; k++) {
      if (A[i][k] != 0) {
        for (let j = 0; j < C[0].length; j++) {
          C[i][j] += A[i][k] * B[k][j];
        }
      }
    }
  }
  return C;
}
