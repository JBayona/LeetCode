/*
You are given an m x n integer matrix grid​​​.

A rhombus sum is the sum of the elements that form the border of a regular rhombus shape in grid​​​.
The rhombus must have the shape of a square rotated 45 degrees with each of the corners centered in a grid cell.
Below is an image of four valid rhombus shapes with the corresponding colored cells that should be included
in each rhombus sum:

https://leetcode.com/problems/get-biggest-three-rhombus-sums-in-a-grid/description
*/

/**
 * *Time: O(N^2)
 * *Space: O(N X M + number of squares)
 */
const getBiggestThree = (grid) => {
  const set = new Set();

  const N = grid.length;
  const M = grid[0].length;

  const length = Math.floor(N / 2);
  const width = Math.floor(M / 2);

  let square = Math.min(length, width); // max possile size of square

  // decrement size of square to find max sum
  while (square > 0) {
    for (let i = 0; i < grid.length - square * 2; i++) {
      for (let j = square; j < grid[0].length - square; j++) {
        let sum = 0;
        let z = 0;

        // find sum of area
        while (z < square) {
          const top = grid[i + z][j + z];
          const right = grid[i + square + z][j + square - z];
          const bot = grid[i + square + square - z][j - z];
          const left = grid[i + square - z][j - square + z];

          sum += top + right + bot + left;
          z++;
        }

        set.add(sum);
      }
    }

    square--;
  }

  // add square with area of 0
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      set.add(grid[i][j]);
    }
  }

  // covert set to array, sort descending and return top 3 max values
  const output = Array.from(set)
    .sort((a, b) => b - a)
    .slice(0, 3);

  return output;
};
