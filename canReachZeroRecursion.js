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
    return false;
  }
  let seen = new Set();
  return helper(array, 0, seen);
}

function helper(array, index, seen) {
  // Base case
  if(array[index] === 0) {
    return true;
  }
  if(index < 0 || index >= array.length) {
    return false;
  }

  if(seen.has(index)) {
    return false;
  }

  seen.add(index);

  return  helper(array, index - array[index], seen) || helper(array, index + array[index], seen);
}

// const testArray = [3, 7, 0, 2, 8, 3, 7, 6];
// const testArray = [3, 7, 4, 2, 8, 3, 7, 6];
// const testArray = [3, 7, 4, 0, 8, 3, 7, 0];
// const testArray = [];
const testArray = [1,1,1,1,1,1,1,1,1];
console.log(canFindZero(testArray));