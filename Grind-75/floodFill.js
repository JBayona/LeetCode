/*
An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.

You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting
from the pixel image[sr][sc].

To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to
the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with color.

Return the modified image after performing the flood fill.

https://leetcode.com/problems/flood-fill/description/
*/

// BFS
// Time O(N)
// Space O(N)
var floodFill = function (image, sr, sc, color) {
  // If we are in the same color we don´t need to do
  // anything
  if (image[sr][sc] === color) {
    return image;
  }

  let row = [0, -1, 0, 1];
  let col = [-1, 0, 1, 0];

  // Launch a BFS starting from the given location
  let queue = [];
  queue.push({ r: sr, c: sc });
  // Capture the current color
  let currentColor = image[sr][sc];

  while (queue.length) {
    // These are always valid as we don´t add them in the queue if
    // values are not valid
    let { r, c } = queue.shift();
    // Paint the current color
    image[r][c] = color;
    for (let i = 0; i < 4; i++) {
      let nextRow = row[i] + r;
      let nextCol = col[i] + c;
      // Check if the condition is met to add it to the queue
      if (isSafe(nextRow, nextCol, image, currentColor)) {
        queue.push({ r: nextRow, c: nextCol });
      }
    }
  }
  return image;
};

function isSafe(row, col, grid, currentColor) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return (
    row >= 0 &&
    row < ROW &&
    col >= 0 &&
    col < COL &&
    grid[row][col] === currentColor
  );
}
