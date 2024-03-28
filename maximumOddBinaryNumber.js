/*
You are given a binary string s that contains at least one '1'.

You have to rearrange the bits in such a way that the resulting binary number is the
maximum odd binary number that can be created from this combination.

Return a string representing the maximum odd binary number that can be created from the given combination.
Note that the resulting string can have leading zeros.

Example 1:
Input: s = "010"
Output: "001"
Explanation: Because there is just one '1', it must be in the last position. So the answer is "001".

Example 2:
Input: s = "0101"
Output: "1001"
Explanation: One of the '1's must be in the last position. The maximum number that can be made with
the remaining digits is "100". So the answer is "1001".

https://leetcode.com/problems/maximum-odd-binary-number/description/?envType=daily-question&envId=2024-03-01
*/

// Time O(N)
// Space O(1)
var maximumOddBinaryNumber = function (s) {
  let countOne = 0;
  // Count the number of ones
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "1") {
      countOne++;
    }
  }

  let len = s.length;
  let index = 0;
  let result = "";
  while (index < len) {
    // The first condition will try to add all the numbers in the
    // left side to maximize the numbers and the last condition will
    // set the 1 to the right to make it odd
    // If we want to make it odd, we need to set the last 1 on the right
    if (countOne > 1 || (index === len - 1 && countOne === 1)) {
      result += "1";
      countOne--;
    } else {
      result += "0";
    }
    index++;
  }
  return result;
};
