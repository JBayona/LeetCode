/*
Write an efficient algorithm that searches for a value in an m x n matrix.
This matrix has the following properties:

Integers in each row are sorted from left to right.
The first integer of each row is greater than the last integer of the previous row.
 
Example 1:
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true

Example 2:
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false

https://leetcode.com/problems/search-a-2d-matrix/
*/

var searchMatrix = function(matrix, target) {
  let index = -1;
  let start;
  let end;
  let len;
  if(matrix.length === 0) return false;
  for(let i = 0; i < matrix.length; i++){
    len = matrix[i].length;
    start = matrix[i][0];
    end = matrix[i][len-1];
    /*Verifica si el elemento se encuentra dentro del rango, si
    si entonces es posible buscar el elemento con binary search*/
    if(target >= start && target <= end){
      index = binarySearch(matrix[i], target);
      if(index >= 0){
        return true;
      }
    }
  }
  return false;
};

function binarySearch(array, target){
  let start = 0;
  let end = array.length - 1;
  let mid;
  while(start <= end){
    mid = Math.floor((start + end)/2);
    if(array[mid] === target){
      return mid;
      /*Si target es menor significa que
      está el valor del lado izquierdo del arreglo*/
    }else if(target < array[mid]){
      end = mid - 1;
    }else{
      /*Si no está del lado izquierdo, el elemento
      debe de estar en el lado derecho en caso de
      estar presente en el array*/
      start = mid + 1
    }
  }
}

// Op2 

/*
//First find which row should target be
    for(int i=0;i<row;i++)
    {

        if(target >= matrix[i][0])
        {
            which_row = i;
        }

    }

    for(int i =0;i<col;i++)
    {

        if(target == matrix[which_row][i])
            return true;
    }

    return false;
*/