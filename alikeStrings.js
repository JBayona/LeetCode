/*
You are given a string s of even length. Split this string into two halves of equal lengths, and let a
be the first half and b be the second half.

Two strings are alike if they have the same number of vowels ('a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U').
Notice that s contains uppercase and lowercase letters.
Return true if a and b are alike. Otherwise, return false.

Example 1:
Input: s = "book"
Output: true
Explanation: a = "bo" and b = "ok". a has 1 vowel and b has 1 vowel. Therefore, they are alike.

Example 2:
Input: s = "textbook"
Output: false
Explanation: a = "text" and b = "book". a has 1 vowel whereas b has 2. Therefore, they are not alike.
Notice that the vowel o is counted twice.

https://leetcode.com/problems/determine-if-string-halves-are-alike/description/
*/
/**
 * @param {string} s
 * @return {boolean}
 */
var halvesAreAlike = function (s) {
  let n = s.length;
  let a = s.substring(0, n / 2).toLowerCase();
  let b = s.substring(n / 2).toLowerCase();
  return countVowels(a) === countVowels(b);
};

const countVowels = (s) => {
  let count = 0;
  let set = new Set(["a", "e", "i", "o", "u"]);
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (set.has(c)) {
      count++;
    }
  }
  return count;
};
