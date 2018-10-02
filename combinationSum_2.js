/*
Given a collection of candidate numbers (candidates) and a target number (target)
Find all unique combinations in candidates where the candidate numbers sums to target.

Each number in candidates may only be used once in the combination.

Note:

All numbers (including target) will be positive integers.
The solution set must not contain duplicate combinations.
Example 1:

Input: candidates = [10,1,2,7,6,1,5], target = 8,
A solution set is:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
Example 2:

Input: candidates = [2,5,2,1,2], target = 5,
A solution set is:
[
  [1,2,2],
  [5]
]

https://leetcode.com/problems/combination-sum-ii/description/
*/

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
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
    let prev = -1;
    for(let i = start; i < array.length; i++) {
        if(prev !== array[i]) {
            // Skip numbers that are greater than our target
            if(target < array[i]) {
                return;
            }
            tmp.push(array[i]);
            // Cambiandolo i por start, te da todas las posibles combinaciones, permutando el número
            // i.e [2,2,3], [3,2,2], [2,3,2], [7]
            helper(array, target - array[i], tmp.concat(), result, i+1);
            tmp.pop();
            prev= array[i];
        }
        
    }
}