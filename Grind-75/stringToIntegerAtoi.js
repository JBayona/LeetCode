/*
Implement atoi which converts a string to an integer.

The function first discards as many whitespace characters as necessary until the first
non-whitespace character is found. Then, starting from this character takes an optional
initial plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.

The string can contain additional characters after those that form the integral number, which are
ignored and have no effect on the behavior of this function.

If the first sequence of non-whitespace characters in str is not a valid integral number, or if no
such sequence exists because either str is empty or it contains only whitespace characters, no conversion is performed.

If no valid conversion could be performed, a zero value is returned.

Note:

Only the space character ' ' is considered a whitespace character.
Assume we are dealing with an environment that could only store integers within the 32-bit signed
integer range: [−231,  231 − 1]. If the numerical value is out of the range of representable values
INT_MAX (231 − 1) or INT_MIN (−231) is returned.

https://leetcode.com/problems/string-to-integer-atoi/
*/

// Time O(N)
var myAtoi = function (s) {
  const MAX = Math.pow(2, 31) - 1;

  let sign = 1;
  let result = 0;
  let index = 0;

  // Remove whitespaces, just move until we find a different character
  while (s[index] === " ") {
    index++;
  }

  // Check if we have a sign
  if (s[index] === "+") {
    sign = 1;
    index++;
  } else if (s[index] === "-") {
    sign = -1;
    index++;
  }

  // Try to convert the number
  while (index < s.length) {
    // Get the number if found, ignore other and break
    // 0 - 48
    let tmp = s.charCodeAt(index) - 48;
    // If we get a number between 0 and 9 means we are under the boundaries so it's
    // a number and we should consider it, otherwise we need to break the while and return
    // the result
    if (tmp > 9 || tmp < 0) {
      // Break the loop is the number is not valid
      break;
    }
    result = result * 10 + tmp;
    index++;
  }

  if (result > MAX) {
    result = MAX;
    if (sign === -1) {
      result++;
    }
  }
  return result * sign;
};

var myAtoi = function (s) {
  const MAX = Math.pow(2, 31) - 1;

  let sign = 1;
  let result = 0;
  let index = 0;

  // Remove whitespaces, just move until we find a different character
  while (s[index] === " ") {
    index++;
  }

  // Check if we have a sign
  if (s[index] === "+") {
    sign = 1;
    index++;
  } else if (s[index] === "-") {
    sign = -1;
    index++;
  }

  // Try to convert the number
  while (index < s.length) {
    // Get the number if found, ignore other and break
    // 0 - 48
    let tmp = s.charCodeAt(index) - 48;
    // If we get a number between 0 and 9 means we are under the boundaries so it's
    // a number and we should consider it, otherwise we need to break the while and return
    // the result
    if (tmp > 9 || tmp < 0) {
      // Break the loop is the number is not valid
      break;
    }
    result = result * 10 + tmp;
    index++;
  }

  if (result > MAX) {
    result = MAX;
    if (sign === -1) {
      result++;
    }
  }
  return result * sign;
};
