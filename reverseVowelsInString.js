/*
Given a string s, reverse only all the vowels in the string and return it.

The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and
upper cases, more than once.

Example 1:
Input: s = "hello"
Output: "holle"

Example 2:
Input: s = "leetcode"
Output: "leotcede"

https://leetcode.com/problems/reverse-vowels-of-a-string/description/
*/

var reverseVowels = function (s) {
  let vowels = ["a", "e", "i", "o", "u"];
  let start = 0;
  let end = s.length - 1;

  let tmp = s.split("");
  while (start < end) {
    // if both pointers are on vowels, swap them.
    if (
      vowels.includes(tmp[start].toLowerCase()) &&
      vowels.includes(tmp[end].toLowerCase())
    ) {
      // Swap
      let t = tmp[start];
      tmp[start++] = tmp[end];
      tmp[end--] = t;
    } else if (!vowels.includes(tmp[start].toLowerCase())) {
      start++;
    } else {
      end--;
    }
  }
  return tmp.join("");
};
