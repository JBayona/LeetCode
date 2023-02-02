/*
For two strings s and t, we say "t divides s" if and only if s = t + ... + t
(i.e., t is concatenated with itself one or more times).

Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.

Example 1:
Input: str1 = "ABCABC", str2 = "ABC"
Output: "ABC"

Example 2:
Input: str1 = "ABABAB", str2 = "ABAB"
Output: "AB"

Example 3:
Input: str1 = "LEET", str2 = "CODE"
Output: ""

https://leetcode.com/problems/greatest-common-divisor-of-strings/description/
*/

// Time Complexity O(LogN)
var gcdOfStrings = function (str1, str2) {
  if (str1 + str2 !== str2 + str1) {
    return "";
  }
  let gcdLength = gcd(str1.length, str2.length);
  return str1.substring(0, gcdLength);
};

function gcd(x, y) {
  if (y === 0) {
    return x;
  } else {
    return gcd(y, x % y);
  }
}

/*
class Solution {

  public String gcdOfStrings(String str1, String str2) {
      int length = str1.length(), length2 = str2.length();
      int min = Math.min(length, length2);
      for (int i = min; i >= 1; --i) {
          if (valid(str1, str2, i)) {
              return str1.substring(0, i);
          }
      }
      return "";
  }
  
  public boolean valid(String str1, String str2, int size) {
      int len = str1.length(), len2 = str2.length();
      if (len % size > 0 || len2 % size > 0) {
          return false;
      } else {
          String base = str1.substring(0, size);
          return str1.replace(base, "").isEmpty() && str2.replace(base, "").isEmpty();
      }
  }
}
*/
