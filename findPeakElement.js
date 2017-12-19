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