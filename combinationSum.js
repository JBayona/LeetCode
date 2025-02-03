/*
Given a set of candidate numbers (candidates) (without duplicates) and a target number (target)
find all unique combinations in candidates where the candidate numbers sums to target.
The same repeated number may be chosen from candidates unlimited number of times.
Note:

All numbers (including target) will be positive integers.
The solution set must not contain duplicate combinations.

Example 1:
Input: candidates = [2,3,6,7], target = 7,
A solution set is:
[
  [7],
  [2,2,3]
]

https://leetcode.com/problems/combination-sum/description/
*/
// Time O(2^N)
// Space O(N)
var combinationSum = function (candidates, target) {
  let result = [];
  let tmp = [];
  let start = 0;
  helper(candidates, target, tmp, result, start);
  return result;
};

function helper(array, target, tmp, result, start) {
  // If the number becomes negative
  if (target < 0) {
    return;
  }
  // We have reached our goal
  if (target === 0) {
    result.push(tmp);
    return;
  }
  // Recur for all remaining elements that have values
  // smaller than our targets
  for (let i = start; i < array.length; i++) {
    // Skip numbers that are greater than our target
    // For this problem it's continue and not return in the
    // if statement as the elements are not sorted, we
    // can sort the elements at the beginning and do "return" here
    if (target < array[i]) {
      continue;
    }
    tmp.push(array[i]);
    // Cambiandolo i por start, te da todas las posibles combinaciones, permutando el número
    // i.e [2,2,3], [3,2,2], [2,3,2], [7]
    // SENDING ONLY "I" IS MAKING US TO USE THE ELEMENT UNLIMITED TIMES.
    helper(array, target - array[i], tmp.concat(), result, i); // Cambiandolo a start, te da todas las posibles combinaciones (permutaciones)
    tmp.pop();
  }
}
