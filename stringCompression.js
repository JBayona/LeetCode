/*
Given an array of characters, compress it in-place.

The length after compression must always be smaller than or equal to the original array.

Every element of the array should be a character (not int) of length 1.

After you are done modifying the input array in-place, return the new length of the array.
 
Follow up:
Could you solve it using only O(1) extra space?
 
Example 1:

Input:
["a","a","b","b","c","c","c"]

Output:
Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]

Explanation:
"aa" is replaced by "a2". "bb" is replaced by "b2". "ccc" is replaced by "c3".

https://leetcode.com/problems/string-compression/
*/
var compress = function(chars) {
  if(chars.length <= 1) {
      return chars.length;
  }
  let count = 0;
  let index = 0;
  let current = 0;
  let tmp = 0;
  while(current < chars.length) {
      if(tmp < chars.length && chars[tmp] === chars[current]) {
          count++;
          tmp++;
      } else {
          chars[index++] = chars[current];
          if(count > 1) {
              let countChars = count.toString().split('');
              for(let i = 0; i < countChars.length; i++) {
                  chars[index++] = countChars[i];
              }
          }
          current = tmp;
          count = 0;
      }
  }
  return index;
};

