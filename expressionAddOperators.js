/*
Given a string that contains only digits 0-9 and a target value, return all possibilities to add binary operators (not unary) +, -, or *
between the digits so they evaluate to the target value.

Example 1:
Input: num = "123", target = 6
Output: ["1+2+3", "1*2*3"] 

Example 2:
Input: num = "232", target = 8
Output: ["2*3+2", "2+3*2"]

Example 3:
Input: num = "105", target = 5
Output: ["1*0+5","10-5"]

Example 4:
Input: num = "00", target = 0
Output: ["0+0", "0-0", "0*0"]

Example 5:
Input: num = "3456237490", target = 9191
Output: []

https://leetcode.com/problems/expression-add-operators/description/
*/

// Time O(2 ^ N)
var addOperators = function (num, target) {
  let result = [];
  let index = 0;
  let str = "";
  // Get the expressions for each call or variation
  let eval = 0;
  // We need it due to operators precedence
  let mult = 0;
  // We need to carry a separate for mult as we need to take into account
  // operator precedence
  dfs(result, str, num, target, index, eval, mult);
  return result;
};

function dfs(result, str, num, target, index, eval, mult) {
  // Base case
  if (index === num.length) {
    // Check if the current result is a result
    if (eval === target) {
      result.push(str);
    }
    return;
  }
  // Exhaust all options
  for (let i = index; i < num.length; i++) {
    // Can we have trailing zeroes? "001"
    // Can not be leading 0s, so let's break the recursion
    if (num[index] === "0" && i !== index) {
      break;
    }
    // 123 = 1, 12, 123, this is the value of current, + 1 to be inclusive
    let current = parseInt(num.substring(index, i + 1));
    // For the case we just need to add in the string the number
    if (index === 0) {
      dfs(result, str + current, num, target, i + 1, eval + current, current);
    } else {
      // Get all combinations
      dfs(result, str + "+" + current, num, target, i + 1, eval + current, current);
      dfs(result, str + "-" + current, num, target, i + 1, eval - current, -current);
      // Assume you have a sequence of 1234, you have proceeded to do 1 + 2 + 3 and eval is 6
      // now assume we insert a * between 3 and 4, this will be 1 + 2 + 3 * 4, it will be
      // equivalent to do (1 + 2 + 3) - 3 + (3 * 4)
      dfs(result, str + "*" + current, num, target, i + 1, eval - mult + mult * current, mult * current);
    }
  }
}

num = "123";
target = 6;
console.log(addOperators(num, target));
