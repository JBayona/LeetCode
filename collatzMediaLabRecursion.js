/*
Take a positive integer, like 9, and apply the following rule:

if it’s odd multiply it by 3 and add 1
if it’s even, divide it in half.
For example, applying this rule to 9 yields 28

Apply this rule repeatedly and you'll create a chain:

9 → 28 → 14 → 7 → 22 → 11 → 34 → 17 → 52 → 26 → 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1.
This particular chain requires 19 steps before it hits 1.

The Collatz conjecture says that all such chains will in fact hit 1 eventually.
Calling 1 the end of a chain, for what integer less than a million is the Collatz chain the longest?
*/

const collatz = function (limit) {
  if (limit === 0) {
    return 0;
  }
  let maxNumber = 0;
  let maxLength = 0;
  let memo = {};
  for (let i = 1; i <= limit; i++) {
    let len = helper(i, memo) - 1;
    if (len > maxLength) {
      maxLength = len;
      // maxNumber = i;
    }
  }
  return maxLength;
  // return `The longest chain from 1 to ${limit} is ${maxLength} coming from the number ${maxNumber}`;
};

function helper(n, memo) {
  // Base case: We reach the target 1
  if (n === 1) {
    return 1;
  }
  // Use previous results
  if (n in memo) {
    return memo[n];
  }
  // Apply logic
  let num;
  if (n % 2 === 0) {
    num = n / 2;
  } else {
    num = n * 3 + 1;
  }
  memo[n] = 1 + helper(num, memo);
  return memo[n];
}

// const limit = 1000000;
const limit = 9;
// const limit = 1000000;
console.log(collatz(limit));
