/*
Given a characters array letters that is sorted in non-decreasing order
and a character target, return the smallest
character in the array that is larger than target.

Note that the letters wrap around.
For example, if target == 'z' and letters == ['a', 'b'], the answer is 'a'.
 
Example 1:
Input: letters = ["c","f","j"], target = "a"
Output: "c"

Example 2:
Input: letters = ["c","f","j"], target = "c"
Output: "f"

Example 3:
Input: letters = ["c","f","j"], target = "d"
Output: "f"

https://leetcode.com/problems/find-smallest-letter-greater-than-target/
*/
// Binary Search
// Time O(LogN)
var nextGreatestLetter = function (letters, target) {
  let start = 0;
  let end = letters.length - 1;
  while (start < end) {
    let mid = Math.floor((start + end) / 2);
    if (letters[mid] <= target) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }
  return letters[start] > target ? letters[start] : letters[0];
};

// Time O(N)
/*
var nextGreatestLetter = function(letters, target) {
  for(let i = 0; i < letters.length; i++) {
      if(letters[i] > target) {
          return letters[i];
      }
  }
  return letters[0];
};
*/
