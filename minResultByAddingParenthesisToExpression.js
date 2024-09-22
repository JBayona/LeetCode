/*
You are given a 0-indexed string expression of the form "<num1>+<num2>" where <num1> and <num2> represent
positive integers.

Add a pair of parentheses to expression such that after the addition of parentheses, expression
is a valid mathematical expression and evaluates to the smallest possible value. The left parenthesis
must be added to the left of '+' and the right parenthesis must be added to the right of '+'.

Return expression after adding a pair of parentheses such that expression evaluates to
the smallest possible value. If there are multiple answers that yield the same result
return any of them.

The input has been generated such that the original value of expression, and the value
of expression after adding any pair of parentheses that meets the requirements
fits within a signed 32-bit integer.

Example 1:
Input: expression = "247+38"
Output: "2(47+38)"
Explanation: The expression evaluates to 2 * (47 + 38) = 2 * 85 = 170.
Note that "2(4)7+38" is invalid because the right parenthesis must be to the right of the '+'.
It can be shown that 170 is the smallest possible value.

Example 2:
Input: expression = "12+34"
Output: "1(2+3)4"
Explanation: The expression evaluates to 1 * (2 + 3) * 4 = 1 * 5 * 4 = 20.

Example 3:
Input: expression = "999+999"
Output: "(999+999)"
Explanation: The expression evaluates to 999 + 999 = 1998.

https://leetcode.com/problems/minimize-result-by-adding-parentheses-to-expression/description
*/
// Approach
// 1. Divide the string in two section, left and right from the "+"
// 2. Start expanding each side getting character to character until we
// find the minimal result, last number from the left side and first
// numbeer from the ride side are always sum up as the right side parenthesis
// should be after the "+"
var minimizeResult = function (expression) {
  let arr = expression.split("+");
  let leftSide = arr[0];
  let rightSide = arr[1];

  let min = Infinity;
  let tmp = [];
  for (let i = 0; i < leftSide.length; i++) {
    // Split the left string
    // Example = 247
    // a = 2, b = 47
    let a = leftSide.substring(0, i);
    let b = leftSide.substring(i);

    // First expand from the right side to try to
    // make the smallest number as we know that the "+"
    // is right before the first character of the right side
    // We need to get at least one character from right
    for (let j = 1; j <= rightSide.length; j++) {
      // Do the same for the right side
      let c = rightSide.substring(0, j);
      let d = rightSide.substring(j);

      let numB = Number(b);
      let numC = Number(c);
      // Add the last numbers before the parenthesis
      let val = numB + numC;
      if (a !== "") {
        val *= a;
      }
      if (d !== "") {
        val *= d;
      }
      if (val < min) {
        min = Math.min(min, val);
        tmp = [a, b, c, d];
      }
    }
  }
  let [a, b, c, d] = tmp;
  return "" + a + "(" + b + "+" + c + ")" + d;
};

let n = "12+34";
console.log(minimizeResult(n));
