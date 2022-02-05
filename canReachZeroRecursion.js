/*
 * Given an array of integers, e.g. [3, 7, 0, 2, 8, 3, 7, 6]
 * Traversal starts at index 0, and can happen by jumping left
 * or right at any particular index by the value at that index.
 * 
 *  * Sample traversal:
 * [3, 7, 0, 2, 8, 3, 7, 6]
 *  ^
 * [3, 7, 0, 2, 8, 3, 7, 6]
 *    -----> ^
 * [3, 7, 0, 2, 8, 3, 7, 6]
 *            ---> ^
 * [3, 7, 0, 2, 8, 3, 7, 6]
 *        ^ <------         [Returns true here]
*/

function canFindZero(array) {
  if(!array.length) {
    return [];
  }
  return helper(array, 0);
}

function helper(array, index) {
  // Base case
  if(array[index] === 0) {
    return true;
  }
  if(index < 0 || index >= array.length) {
    return false;
  }
  return helper(array, index - array[index]) || helper(array, index + array[index]);
}

//const testArray = [3, 7, 0, 2, 8, 3, 7, 6];
// const testArray = [3, 7, 4, 2, 8, 3, 7, 6];
// const testArray = [3, 7, 4, 0, 8, 3, 7, 0];
// const testArray = [];
console.log(canFindZero(testArray));