/*
You are given a sorted unique integer array nums.

A range [a,b] is the set of all integers from a to b (inclusive).

Return the smallest sorted list of ranges that cover all the numbers in the array exactly.
That is, each element of nums is covered by exactly one of the ranges, and there is no integer x such that x is in one of the ranges but not in nums.

Each range [a,b] in the list should be output as:

"a->b" if a != b
"a" if a == b

https://leetcode.com/problems/summary-ranges/description/?envType=study-plan-v2&envId=top-interview-150
*/

// Option 1
var summaryRanges = function (nums) {
  let result = [];
  if (nums.length === 1) {
    return [nums[0].toString()];
  }

  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    // Check all the number that are consecutives to move on
    // This cycle will moe as long as the difference it's only 1
    while (i + 1 < nums.length && nums[i + 1] - nums[i] === 1) {
      i++;
    }
    // Verify if it's the same number
    // i was already incremented
    if (num !== nums[i]) {
      result.push(`${num}->${nums[i]}`);
    } else {
      // It's the same number
      result.push(num.toString());
    }
  }
  return result;
};
