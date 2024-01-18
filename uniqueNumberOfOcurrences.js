/*
Given an array of integers arr, return true if the number of occurrences of each
value in the array is unique or false otherwise.

Example 1:
Input: arr = [1,2,2,1,1,3]
Output: true
Explanation: The value 1 has 3 occurrences, 2 has 2 and 3 has 1. No two values have the same number of occurrences.

Example 2:
Input: arr = [1,2]
Output: false

Example 3:
Input: arr = [-3,0,1,-3,1,1,1,-3,10,0]
Output: true

https://leetcode.com/problems/unique-number-of-occurrences/description/
*/

// Option 1
// Time O(N)
// Space O(N)
var uniqueOccurrences = function (arr) {
  let hash = {};
  for (let n of arr) {
    if (!(n in hash)) {
      hash[n] = 0;
    }
    hash[n]++;
  }

  // Iterate the map to find occurrences
  let set = new Set();
  for (let prop in hash) {
    let frequency = hash[prop];
    // If we have seen it before, return false
    if (set.has(frequency)) {
      return false;
    }
    // Otherwise, mark it as seen
    set.add(frequency);
  }
  return true;
};
