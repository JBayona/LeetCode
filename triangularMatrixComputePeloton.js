/*
By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.

   3
  7 4
 2 4 6
8 5 9 3
   
    3.   3
  7  4  7 4
   4.   6
     9

That is, 3 + 7 + 4 + 9 = 23.

   *3*
  *7* 4
 2 *4* 6
8 5 *9* 3

* denotes the path

Write a function that finds the maximum total from top to bottom given a 2D array representing a triangle.

Just to clarify, adjacency means the immediate two numbers below the current number. For example, in the triangle

    6
   5  3
 1  8  5 

[[6],[5, 3],[1,8,5]]

the two numbers adjacent to the number 3 are 8 and 5.

Example input: [[3], [7, 4], [2, 4, 6], [8, 5, 9, 3]]
   3. i = 0;
   7  0, 1 = 0
   4   0, 1,
   9   1, 2
   
   
   3
  7 4
 2 4 6
8 5 9 3
*/

// DP
// Time O(N)
function main(input) {
  let row = input.length;
  // Bottom-up computation
  for(let i = row - 2; i >= 0; i--) {
    for(let j = 0; j <= i; j++) {
      if(input[i+1][j] > input[i+1][j+1]) {
        input[i][j] += input[i+1][j];
      } else {
        input[i][j] += input[i+1][j+1];
      }
    }
  }
  return input[0][0];
}

input = [[6],[5, 3],[1,8,5]];
input = [[3], [7, 4], [2, 4, 6], [8, 5, 9, 3]]
console.log(main(input));