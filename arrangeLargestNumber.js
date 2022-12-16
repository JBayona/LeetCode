/*
Given an array of integers, find the largest number that can be made by
creating all possible permutations of these integers.

As the largest number formed can be very large, Return a string instead of an integer.

Sample input
[3, 30, 34, 5, 9]
Expected output
"9534330"

https://www.educative.io/courses/coderust-hacking-the-coding-interview/m7g5AWx3G6A
*/

let largestNumber = function (nums) {
  let numsStr = nums.map((n) => n.toString());
  numsStr.sort((a, b) => {
    return `${b}${a}` - `${a}${b}`;
  });

  // We are returning the concatenated string if the first character
  // of our concatenated string is not zero which can be in case we
  // have these kinds of strings e.g., "00", "000". In these cases, we
  // return "0".
  if (numsStr[0] === "0") {
    return "0";
  }
  return numsStr.join("");
};
