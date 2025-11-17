/*
Given a n x n matrix where each of the rows and columns are sorted in ascending order,
find the kth smallest element in the matrix.

Note that it is the kth smallest element in the sorted order, not the kth distinct element.

Example:

matrix = [
   [ 1,  5,  9],
   [10, 11, 13],
   [12, 13, 15]
],
k = 8,

return 13.

https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/
*/

var kthSmallest = function(matrix, k) {
  let n = matrix.length;
  let start = matrix[0][0];
  let end = matrix[n-1][n-1];
  
  while(start <= end) {
    let middle = Math.floor((start + end) / 2);
    console.log('Middle');
    console.log(middle);
    // Get the total elements that are less or equal than mid
    let count = countNums(matrix, middle);
    console.log('Count');
    console.log(count);
    if(count < k) {
        start = middle + 1;
    } else {
        end = middle - 1;
    }
    console.log('start ', start);
    console.log('end ', end);
  }
  // Start hold the kth smallest element
  return start;
};

//Counts the numbers less than mid, using the sorted matrix search pattern.
function countNums(matrix, mid){
  let count = 0;
  let i = 0;
  let j = matrix[0].length-1;   // initialize start to top right corner
  
  while(i < matrix.length && j>= 0){
    if(matrix[i][j] <= mid){ 
      count = count + j +1;    // adds j+1 elements, as column indexes are before current element
      i++; // move to next row for bigger match
    } else{
      j--; // move to previous column for smaller match
    }
  }
  return count;
}
