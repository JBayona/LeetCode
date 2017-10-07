/*
Binary Search Algorithm
Time Complexity O(log(N))
*/

function binarySearch(array, target){
  let start = 0;
  let end = array.length-1;
  let middle;
  while(start <= end){
    middle = Math.floor((start + end)/2);
    if(array[middle] === target){
      return middle;
    }else if(target < array[middle]){
      end = middle - 1;
    }else{
      start = middle + 1;
    }
  }
  return -1;
}

array = [1,2,3,4,5,6,7,8,9];
target = 6;
console.log(binarySearch(array, target));