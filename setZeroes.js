/*
Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in place.
click to show follow up.

https://leetcode.com/problems/set-matrix-zeroes/description/
*/
var setZeroes = function(matrix) {
    let row = new Array(matrix.length).fill(false);
    let col = new Array(matrix[0].length).fill(false);

    //Guarda los elementos con ceros
    for(let i = 0; i < matrix.length; i++){
      for(let j = 0; j < matrix[0].length; j++){
        if(matrix[i][j] === 0){
          row[i] = true;
          col[j] = true;
        }
      }
    }
    //Setea los ceros
    for(let i = 0; i < matrix.length; i++){
      for(let j = 0; j < matrix[0].length; j++){
        if(row[i] || col[j]){
          matrix[i][j] = 0;
        }
      }
    }
    return matrix;
};

matrix = [
  [1,2,3,4,5],
  [6,7,8,9,1],
  [5,4,3,0,1],
  [1,2,3,4,5] 
];
console.log(setZeroes(matrix));
