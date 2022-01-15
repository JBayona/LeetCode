/*
An image is represented by a 2-D array of integers, each integer representing
the pixel value of the image (from 0 to 65535).

Given a coordinate (sr, sc) representing the starting pixel (row and column) of
the flood fill, and a pixel value newColor, "flood fill" the image.

To perform a "flood fill", consider the starting pixel, plus any pixels
connected 4-directionally to the starting pixel of the same color as the
starting pixel, plus any pixels connected 4-directionally to those pixels
(also with the same color as the starting pixel), and so on. Replace the color of all of
the aforementioned pixels with the newColor.)

At the end, return the modified image.

Example 1:
Input: 
image = [[1,1,1],[1,1,0],[1,0,1]]
sr = 1, sc = 1, newColor = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]

Explanation: 
From the center of the image (with position (sr, sc) = (1, 1)), all pixels connected 
by a path of the same color as the starting pixel are colored with the new color.
Note the bottom corner is not colored 2, because it is not 4-directionally connected
to the starting pixel.

Note:
The length of image and image[0] will be in the range [1, 50].
The given starting pixel will satisfy 0 <= sr < image.length and 0 <= sc < image[0].length.
The value of each color in image[i][j] and newColor will be an integer in [0, 65535].

https://leetcode.com/problems/flood-fill/
https://www.youtube.com/watch?v=TClRuEZ-uDg
*/

// BFS
// Time O(N)
// Space O(N)
var floodFill = function(image, sr, sc, newColor) {
    let row = [0, -1, 0, 1];
    let col = [-1, 0, 1, 0];
    let queue = [];
    
    // If we are in the same color we don´t need to do
    // anything
    if(image[sr][sc] === newColor) {
        return image;
    }
    
    let startColor = image[sr][sc];
    queue.push([sr, sc]);
    while(queue.length) {
        // Get row and column
        let [x,y] = queue.shift();
        // Set new color
        image[x][y] = newColor;
        for(let i = 0; i < 4; i++) {
            let nextRow = x + row[i];
            let nextCol = y + col[i];
            if(isSafe(image, startColor, nextRow, nextCol)) {
                queue.push([nextRow, nextCol]);
            }
        }
    }
    return image;
};

function isSafe(grid, startColor, row, col) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
        row >= 0 && row < ROW &&
        col >= 0 && col < COL &&
        grid[row][col] === startColor
    );
}

// Option 1
// Time O(N)
// Space O(N)
var floodFill = function(image, sr, sc, newColor) {
    // Check if we need to change some color, if don't
    // we don't need to change any color
    if(image[sr][sc] === newColor) {
        return image;
    }
    // DFS
    fill(image, sr, sc, image[sr][sc], newColor);
    return image;
};

function fill(image, row, col, color, newColor) {
    // Base case
    if(row < 0 || row >= image.length || col < 0 || col >= image[row].length || image[row][col] !== color) {
        return;
    }
    
    let rowK = [0, -1, 0, 1];
    let colK = [-1, 0, 1, 0];
    
    // Mark new color
    image[row][col] = newColor;
    
    for(let i = 0; i < 4; i++) {
        let ROW = row + rowK[i];
        let COL = col + colK[i];
        fill(image, ROW, COL, color, newColor);
    }
    
}

// Option 2
// BFS
// Time O(N)
// Space O(N)
var floodFill = function(image, sr, sc, newColor) {
    // If we are in the same color we don´t need to do
    // anything
    if(image[sr][sc] === newColor) {
        return image;
    }
    
    let startColor = image[sr][sc];
    let queue = [];
    queue.push([sr, sc]);
    while(queue.length) {
        let [x, y] = queue.shift();
        image[x][y] = newColor;
        if (x + 1 >= 0 && x + 1 < image.length) {
            image[x+1][y] == startColor && queue.push([x + 1, y]);
        }
        if (x - 1 >= 0 && x - 1 < image.length) {
            image[x-1][y] == startColor && queue.push([x - 1, y]);
        }
        if (y - 1 >= 0 && y - 1 < image[0].length) {
            image[x][y-1] == startColor && queue.push([x, y - 1]);
        }
        if (y + 1 >= 0 && y + 1 < image[0].length) {
            image[x][y+1] == startColor && queue.push([x, y + 1])
        }
    }
    return image;
};

// Option 3 DFS

var floodFill = function(image, sr, sc, newColor) {
    // Check if we need to change some color, if don't
    // we don't need to change any color
    if(image[sr][sc] === newColor) {
        return image;
    }
    // DFS
    fill(image, sr, sc, image[sr][sc], newColor);
    return image;
};

function fill(image, row, col, color, newColor) {
    // Base case
    if(row < 0 || row >= image.length || col < 0 || col >= image[row].length || image[row][col] !== color) {
        return;
    }
    
    image[row][col] = newColor;
    fill(image, row + 1, col, color, newColor);
    fill(image, row - 1, col, color, newColor);
    fill(image, row, col + 1, color, newColor);
    fill(image, row, col - 1, color, newColor);
}
