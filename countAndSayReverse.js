/*
 Given an input string which is the output of a count and say method
 return the original number.

For example: If the number if "21", then the count and say method would return
"1211" (one two, one one). In this problem, the input provided to us is "1211" and our goal is to return "21".
*/

function reversecount(s) {
    if (!s) {
      return "";
    }
    if (s === "0") {
      return "";
    }
    if (s.length === 2) {
      return s[1].repeat(s[0]);
    }
    if (s.length === 3) {
      return s[2].repeat(s.substrinng(0, 2));
    }
    let n = s.length;
    for (let i = 2; i < n - 1; i++) {
      left = reversecount(s.substring(0, i));    // check if the left substring could produce a valid number
      right = reversecount(s.substring(i)); // check if the right substring could produce a valid number
      // if both substrings produce a valid number, then we found the original number
      if (left && right) {
        return left + right;
      }
    }
  }
  
console.log(reversecount("1211"));