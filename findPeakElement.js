/*
A peak element is an element that is greater than its neighbors.

Given an input array where num[i] ≠ num[i+1], find a peak element and return its index.

The array may contain multiple peaks, in that case return the index to any one of the peaks is fine.

You may imagine that num[-1] = num[n] = -∞.

For example, in array [1, 2, 3, 1], 3 is a peak element and your function should return the index number 2.
https://leetcode.com/problems/find-peak-element/description/
*/

//Option 1 O(N) 
var peakFinding = function(array) {
  let minIdx = 0;
  let maxIdx = array.length;
  if(array.length === 0) return true;
  for(let i = 0; i < array.length; i++) {
    if(i === minIdx && array[minIdx] >= array[minIdx + 1]) return i;
    if(i === maxIdx && array[maxIdx] >= array[maxIdx - 1]) return i;
    if(array[i] >= array[i-1] && array[i] >= array[i+1]) return i;
  }
  return false;
}


//Option 2 O(LogN)
var checkPeak = function(left,right,array) {
  let middle = Math.floor(left + (right - left)/2); /* (Left + Right) / 2 */
  if(array[middle] < array[middle-1]){
    return checkPeak(left, middle-1, array);
  }else if (array[middle] < array[middle+1]){
    return checkPeak(middle+1,right,array);
  }else if((middle === 0 || array[middle] >= array[middle-1]) && 
    (middle === array.length-1 || array[middle] >= array[middle+1])){
    return middle;
  }
}

var peakFinding = function(array) {
  let left = 0;
  let right = array.length-1;
  return checkPeak(left,right,array);
}

// array = [1,2,3,4,2,4,6,1,6,8,7];
array = [1,2];
console.log(peakFinding(array));

/*Find Peak 2D version*/

var findMax = function(matrix, row, mid, max) {
  let max_index = 0;
  for(let i = 0; i < row; i++) {
    if(max.max < matrix[i][mid]) {
      max.max = matrix[i][mid];
      max_index = i; 
    }
  }
  return max_index;
}

var checkPeak2D = function(matrix, row, column, mid) {
  //Evaluating maximum of mid column. Max is passed by reference.
  let max = {max: 0};
  let max_index = findMax(matrix,row,mid,max);

  /*If we are on first of last column max is the peak*/
  if(mid === 0 || mid === column-1) return max.max;

  //If mid column maximum is also peak
  if(max.max >= matrix[max_index][mid-1] && max.max >= matrix[max_index][mid+1]) return max.max;

  //If max is less than its left
  if(max.max < matrix[max_index][mid-1]) return checkPeak2D(matrix,row,column,mid - Math.floor(mid/2));

  //If max is less than its right
  if(max.max < matrix[max_index][mid+1]) return checkPeak2D(matrix,row,column,mid + Math.floor(mid/2));
}

var peakFinding2D = function(matrix){
  let row = matrix.length;
  let col = matrix[0].length;
  let mid = Math.floor(col/2);
  return checkPeak2D(matrix,row,col,mid);
}

/*
var findPeakElement = function(nums) {
    let left = 0;
    let right = nums.length-1;
    while(left < right){
        let mid = Math.floor(left + (right - left)/2);
        if(nums[nums] < nums[nums+1]) {
            left = mid+1;
            //We are in the ascending range of the array so the peak element must lie in the right of the mid (i.e <= mid+1)
        }else{
            right = mid;
            //nums[mid] > nums[mid+1] (as 2 consecutive cant be equal)
            // we are in the decreasing range of the array peak element may equal to mid or lie in the left of the mid. 
        }
    }
    // when start == mid they will point the peak max ele of the array 
    return left;
};*/
*/

matrix = [
            [ 10, 8, 10, 10],
            [ 14, 13, 12, 11],
            [ 5, 9, 11, 21 ],
            [ 16, 17, 19, 20 ],
          ];
console.log(peakFinding2D(matrix));