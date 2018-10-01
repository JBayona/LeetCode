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

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    // We should remove duplicates in case of found
    candidates.sort((a,b) => a - b);
    
    let result = [];
    let tmp = [];
    let start = 0;
    helper(candidates, target, tmp, result, start);
    
    return result;
    
};

function helper(array, target, tmp, result, start) {
    
    // If the number becomes negative
    if(target < 0) {
        return;
    }
    
    // We have reached our goal
    if(target === 0) {
        result.push(tmp);
        return;
    }
    
    // Recur for all remaining elements that have values
    // smaller than our targets
    for(let i = start; i < array.length; i++) {
        // Skip numbers that are greater than our target
        if(target < array[i]) {
            return;
        }
        tmp.push(array[i]);
        // Cambiandolo i por start, te da todas las posibles combinaciones, permutando el número
        // i.e [2,2,3], [3,2,2], [2,3,2], [7]
        helper(array, target - array[i], tmp.concat(), result, i);
        tmp.pop();
    }
}