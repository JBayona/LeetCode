// Complexity O(kn Log(kn)) where k is the number of arrays we have
function mergeKSortedArrays(arrays) {
  let result = [];
  // Flat the array in a single array
  for(let i = 0; i < arrays.length; i++) {
    result = result.concat(arrays[i]);
  }
  // Sort the array
  bubbleSort(result);
  return result;
}

function bubbleSort(array) {
  for(let i = 0; i < array.length - 1; i++) {
    for(let j = 0; j < array.length - i - 1; j++) {
      if(array[j] > array[j+1]) {
        let tmp = array[j];
        array[j] = array[j+1];
        array[j+1] = tmp;
      }
    }
  }
}

arrays = [[1,4,7], [2,5,8], [3,6,9]];
console.log(mergeKSortedArrays(arrays));