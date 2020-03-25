/*
Given an image of NxN matrix, write a method to rotate the
image by 90 degrees. Can you do it in place?
We can do this moving the top edge to the righ edge, the 
right edge to the bottom edge, the bottom edge to the left
edge and the left edge to the top edge.
Swap index by index - Complex O(N^2)
*/

function rotate(matrix, n){
  for(var i = 0; i < n/2; i++){
    var first = i;
    var last = n - 1 - i;
    for(var j = first; j < last; j++){
      var offset = j - first;
      //Save top
      var top = matrix[first][j];

      //left to top (left -> top)
      matrix[first][j] = matrix[last - offset][first];

      //bottom to left (bottom -> left)
      matrix[last - offset][first] = matrix[last][last - offset];

      //right top to bottom (right -> bottom)
      matrix[last][last - offset] = matrix[j][last];

      //top to right (top -> right)
      matrix[j][last] = top;
    }
  }
  return matrix;
}

matrix =[ [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]];
n = 3;
console.log(rotate(matrix,n));

// https://www.youtube.com/watch?v=SA867FvqHrM

var rotate = function(matrix) {
    let n = matrix.length;
    
    // Transponse a matrix
    for(let i = 0; i < n; i++) {
        for(let j = i; j < n; j++) {
            let tmp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = tmp;
        }
    }
    
    //Swap columns
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n/2; j++) {
            let tmp = matrix[i][j];
            matrix[i][j] = matrix[i][n-1-j];
            matrix[i][n-1-j] = tmp;
        }
    }
    
    console.log(matrix);
};
