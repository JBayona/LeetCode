/*
Merge three arrays with no elements duplicated

https://leetcode.com/discuss/interview-question/568482/facebook-phone-merge-3-sorted-arrays
*/

var mergeThreeArraysNoDuplicate = function (arr1, arr2, arr3) {
  let indexA = 0;
  let indexB = 0;
  let indexC = 0;
  let result = [];
  while (indexA < arr1.length || indexB < arr2.length || indexC < arr3.length) {
    let a = arr1[indexA] || Infinity;
    let b = arr2[indexB] || Infinity;
    let c = arr3[indexC] || Infinity;
    // This will avoid duplicate elements as we are only inserting once
    // and we are moving all the indexes the matches the min so that way
    // we don't have duplicate elements
    let min = Math.min(a, b, c);
    result.push(min);

    if (a === min) {
      indexA++;
    }
    if (b === min) {
      indexB++;
    }
    if (c === min) {
      indexC++;
    }
  }
  return result;
};

arr1 = [-1, 2, 4, 5, 7, 9];
arr2 = [-4, -2, -1, 13, 20, 21];
arr3 = [4, 5, 6, 7, 8, 9];
console.log(mergeThreeArraysNoDuplicate(arr1, arr2, arr3));
