/*
Given a string S, return the number of substrings of length K with no repeated characters.

Example 1:
Input: S = "havefunonleetcode", K = 5
Output: 6

Explanation: 
There are 6 substrings they are : 'havef','avefu','vefun','efuno','etcod','tcode'.

Example 2:
Input: S = "home", K = 5
Output: 0

Explanation: 
Notice K can be larger than the length of S. In this case is not possible to find any substring.
*/

var numKLenSubstrNoRepeats = function(s, k) {
  if(k > s.length) {
    return 0;
  }
  let left = 0;
  let right = 0;
  let map = {};
  let result = 0;

  // doing left < s.length - k + 1 will work faster as we limit using the k window
  // By doing just right < s.length
  while(left < s.length - k + 1 && right < s.length) {
    let c = s[right];
    if(!(c in map)) {
      map[c] = 1;
    } else {
      map[c]++;
    }

    // If we already saw the element we need to move the left
    // pointer until we found no repeated chars
    if(map[c] > 1) {
      while(map[c] > 1) {
        let c = s[left];
        map[c]--;
        if(map[c] === 0) {
          delete map[c];
        }
        left++;
      }
    }

    // Check if we have k unique elements
    if(Object.keys(map).length === k) {
      result++;
      let c = s[left];
      delete map[c];
      left++;
    }
    right++;
  }
  return result;
}

s = "abab";
k = 2;
console.log(numKLenSubstrNoRepeats(s, k));
